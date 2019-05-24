import { AfterViewChecked, Component, ElementRef, Inject, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filter, finalize } from 'rxjs/operators';
import { MeManager } from 'src/managers/me.manager';
import { MessagesManager } from 'src/managers/messages.manager';
import { MessageCard } from 'src/models/message';
import { IMessagesService, messages_service } from 'src/services/messages/interface';

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
              private messagesManager: MessagesManager,
              private host: ElementRef,
              public me: MeManager) {
  }

  ngOnInit() {
    this.route.params.subscribe(({topic, page, 'page_size': pageSize}) => {
      this.id = +topic || null;
      this.page = +page || DEFAULT_PAGE;
      this.pageSize = +pageSize || DEFAULT_PAGE_SIZE;
    });

    this.messagesManager.message$
      .pipe(filter(message => !!message))
      .subscribe(message => {
        this.messages.push(new MessageCard(message));
        this.scrollToBottom();
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
    this.loading = true;
    this.messagesService.list(this.id, this.page, this.pageSize)
      .pipe(finalize(() => this.loading = false))
      .subscribe(paging => this.messages = paging.results);
  }
}
