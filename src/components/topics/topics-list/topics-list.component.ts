import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd';
import { filter, finalize } from 'rxjs/operators';
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
  topics: TopicCard[] = [];
  loading = false;

  @Output() haveMessages = new EventEmitter<boolean>();

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
    this.route.params.subscribe(({topic}) => {
      this.current = +topic || null;
      this.load();
    });

    this.topicsSocket.event$.subscribe(event => {
      if (event instanceof TopicMessageAddedEvent) {
        if (this.current !== event.topic.id) {
          const found = this.topics.findIndex(topic => topic.id === event.topic.id);
          this.topics[found] = event.topic;
        }
      } else if (event instanceof TopicCreatedEvent) {
        this.topics.unshift(event.topic);
      }
    });
  }

  load() {
    this.loading = true;
    this.topicsService.list()
      .pipe(finalize(() => this.loading = false), filter(topics => !!topics.length))
      .subscribe(topics => {
        this.topics = topics;
        this.haveMessages.emit(!!this.topics.find(topic => !!topic.unreadMessagesCount));
      });
  }
}
