import { Component, Inject, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { MeManager } from 'src/managers/me.manager';
import { MessageCard } from 'src/models/message';
import { IMessagesService, messages_service } from 'src/services/messages/interface';

const DEFAULT_PAGE = 1;
const DEFAULT_PAGE_SIZE = 10;

@Component({
  selector: 'moo-messages-list',
  templateUrl: './messages-list.component.html',
  styleUrls: ['./messages-list.component.scss']
})
export class MessagesListComponent implements OnInit {

  private _topic: number;
  messages: MessageCard[] = [];
  page: number = DEFAULT_PAGE;
  pageSize: number = DEFAULT_PAGE_SIZE;
  loading = false;

  @Input() set topic(topic: number) {
    if (!!topic && topic !== this._topic) {
      this._topic = topic;
      this.load();
    }
  }

  get topic() {
    return this._topic;
  }

  constructor(@Inject(messages_service) private messagesService: IMessagesService,
              private route: ActivatedRoute,
              public me: MeManager) {
  }

  ngOnInit() {
    this.route.params.subscribe(({topic, page, 'page_size': pageSize}) => {
      this.topic = +topic || null;
      this.page = +page || DEFAULT_PAGE;
      this.pageSize = +pageSize || DEFAULT_PAGE_SIZE;
    });
  }

  load() {
    this.loading = true;
    this.messagesService.list(this.topic, this.page, this.pageSize)
      .pipe(finalize(() => this.loading = false))
      .subscribe(paging => this.messages = paging.results);
  }
}
