import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NzModalRef, NzModalService } from 'ng-zorro-antd';
import { debounceTime, filter, finalize } from 'rxjs/operators';
import { LoginComponent } from 'src/components/login/login.component';
import { CreateTopicComponent } from 'src/components/topics/create-topic/create-topic.component';
import { PLATFORM_DELAY } from 'src/consts';
import { MeManager } from 'src/managers/me.manager';
import { TopicCard, TopicCreatedEvent, TopicMessageAddedEvent } from 'src/models/topic';
import { ITopicsService, topics_service } from 'src/services/topics/interface';
import { TopicsSocketService } from 'src/services/topics/socket';

@Component({
  selector: 'moo-topics-list',
  templateUrl: './topics-list.component.html',
  styleUrls: ['./topics-list.component.scss']
})
export class TopicsListComponent implements OnInit {

  private _current: number;
  private _modal: NzModalRef;
  topics: TopicCard[] = [];
  loading = false;

  @Output() haveMessages = new EventEmitter<boolean>();

  set modal(modal: NzModalRef) {
    this._modal = modal;

    modal.afterOpen.subscribe(() => {
      const component = modal.getContentComponent();
      if (component instanceof CreateTopicComponent) {
        component.created.subscribe(topic => {
          this.modal.close();
          this.router.navigate(['..', topic.id], {relativeTo: this.route});
        });
      } else if (component instanceof LoginComponent) {
        component.logged.pipe(debounceTime(PLATFORM_DELAY))
          .subscribe(() => {
            this.modal.close();
            this.create();
          });
      }
    });
  }

  get modal() {
    return this._modal;
  }

  set current(current: number) {
    this._current = current;
    const found = this.topics.findIndex(topic => topic.id === current);

    if (found > -1) {
      this.topics[found].unreadMessagesCount = 0;
      this.haveMessages.emit(!!this.topics.find(topic => !!topic.unreadMessagesCount));
    }
  }

  get current() {
    return this._current;
  }

  constructor(@Inject(topics_service) private topicsService: ITopicsService,
              private topicsSocket: TopicsSocketService,
              private modalService: NzModalService,
              private router: Router,
              private route: ActivatedRoute,
              public me: MeManager) {
  }

  ngOnInit() {
    this.route.params.subscribe(({topic}) => this.current = +topic || null);

    this.topicsSocket.event$.subscribe(event => {
      if (event instanceof TopicMessageAddedEvent) {
        if (this.current !== event.topic.id) {
          const found = this.topics.findIndex(topic => topic.id === event.topic.id);
          this.topics[found] = event.topic;
        }
      } else if (event instanceof TopicCreatedEvent) {
        this.topics.push(event.topic);
      }
    });

    this.load();
  }

  private openModal(content: any) {
    this.modal = this.modalService.create({
      nzTitle: '',
      nzContent: content,
      nzFooter: null,
      nzWidth: 'fit-content'
    });
  }

  load() {
    this.loading = true;
    this.topicsService.list()
      .pipe(finalize(() => this.loading = false), filter(topics => !!topics.length))
      .subscribe(topics => {
        this.topics = topics;
        this.haveMessages.emit(!!this.topics.find(topic => !!topic.unreadMessagesCount));
        if (!this.current) {
          this.router.navigate([topics[0].id], {relativeTo: this.route});
        }
      });
  }

  create() {
    this.modalService.closeAll();
    this.openModal(this.me.logged ? CreateTopicComponent : LoginComponent);
  }

}
