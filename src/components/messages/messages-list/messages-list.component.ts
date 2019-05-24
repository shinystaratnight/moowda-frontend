import { Component, Inject, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NzModalRef, NzModalService } from 'ng-zorro-antd';
import { forkJoin } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { ShareTopicComponent } from 'src/components/topics/share-topic/share-topic.component';
import { MeManager } from 'src/managers/me.manager';
import { MessageCard } from 'src/models/message';
import { Topic } from 'src/models/topic';
import { IMessagesService, messages_service } from 'src/services/messages/interface';
import { ITopicsService, topics_service } from 'src/services/topics/interface';

const DEFAULT_PAGE = 1;
const DEFAULT_PAGE_SIZE = 10;

@Component({
  selector: 'moo-messages-list',
  templateUrl: './messages-list.component.html',
  styleUrls: ['./messages-list.component.scss']
})
export class MessagesListComponent implements OnInit {

  private _id: number;
  private _modal: NzModalRef;

  messages: MessageCard[] = [];
  page: number = DEFAULT_PAGE;
  pageSize: number = DEFAULT_PAGE_SIZE;
  loading = false;
  topic: Topic;

  @Input() set id(id: number) {
    if (!!id && id !== this._id) {
      this._id = id;
      this.load();
    }
  }

  get id() {
    return this._id;
  }

  set modal(modal: NzModalRef) {
    this._modal = modal;

    modal.afterOpen.subscribe(() => {
      const component = modal.getContentComponent() as ShareTopicComponent;
      component.topic = this.topic;
      component.shared.subscribe(() => this.modal.close());
    });
  }

  get modal() {
    return this._modal;
  }

  constructor(@Inject(messages_service) private messagesService: IMessagesService,
              @Inject(topics_service) private topicsService: ITopicsService,
              private route: ActivatedRoute,
              private modalService: NzModalService,
              public me: MeManager) {
  }

  ngOnInit() {
    this.route.params.subscribe(({topic, page, 'page_size': pageSize}) => {
      this.id = +topic || null;
      this.page = +page || DEFAULT_PAGE;
      this.pageSize = +pageSize || DEFAULT_PAGE_SIZE;
    });
  }

  load() {
    forkJoin(this.topicsService.get(this.id), this.messagesService.list(this.id, this.page, this.pageSize))
      .pipe(finalize(() => this.loading = false))
      .subscribe(([topic, paging]) => {
        this.topic = topic;
        this.messages = paging.results;
      });
  }

  share() {
    this.modal = this.modalService.create({
      nzTitle: 'Share with friends',
      nzContent: ShareTopicComponent,
      nzFooter: null,
      nzWidth: 'fit-content'
    });
  }
}
