import { AfterViewChecked, Component, ElementRef, Inject, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { MeManager } from 'src/managers/me.manager';
import { MessageAddedEvent, MessageCard } from 'src/models/message';
import { IMessagesService, messages_service } from 'src/services/messages/interface';
import { MessagesSocketService } from 'src/services/messages/socket';

const DEFAULT_PAGE = 1;
const DEFAULT_PAGE_SIZE = 10;

@Component({
  selector: 'moo-messages-list',
  templateUrl: './messages-list.component.html',
  styleUrls: ['./messages-list.component.scss']
})
export class MessagesListComponent implements OnInit, AfterViewChecked {

  private _id: number;
  private height: number;

  messages: MessageCard[] = [];
  page: number = DEFAULT_PAGE;
  pageSize: number = DEFAULT_PAGE_SIZE;
  loading = false;

  @Input() set id(id: number) {
    if (!!id && id !== this._id) {
      this._id = id;
      this.load();
    }
  }

  get id() {
    return this._id;
  }

  constructor(@Inject(messages_service) private messagesService: IMessagesService,
              private route: ActivatedRoute,
              private messagesSocket: MessagesSocketService,
              private host: ElementRef,
              public me: MeManager) {
  }

  ngOnInit() {
    this.route.params.subscribe(({topic, page, 'page_size': pageSize}) => {
      this.id = +topic || null;
      this.page = +page || DEFAULT_PAGE;
      this.pageSize = +pageSize || DEFAULT_PAGE_SIZE;
    });

    this.messagesSocket.event$.subscribe(event => {
      if (event instanceof MessageAddedEvent) {
        this.messages.push(new MessageCard(event.message));
        this.scrollToBottom();
      }
    });
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    const height = this.host.nativeElement.parentElement.scrollHeight;
    if (height !== this.height) {
      this.host.nativeElement.parentElement.scrollIntoView(false);
      this.height = height;
    }
  }

  load() {
    this.messagesSocket.topic = this.id;
    this.loading = true;
    this.messagesService.list(this.id, this.page, this.pageSize)
      .pipe(finalize(() => this.loading = false))
      .subscribe(paging => this.messages = paging.results);
  }
}
