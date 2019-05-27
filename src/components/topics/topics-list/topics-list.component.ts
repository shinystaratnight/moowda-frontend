import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { TopicCreatedEvent, TopicItem, TopicMessageAddedEvent } from 'src/models/topic';
import { ITopicsService, topics_service } from 'src/services/topics/interface';
import { TopicsSocketService } from 'src/services/topics/socket';

@Component({
  selector: 'moo-topics-list',
  templateUrl: './topics-list.component.html',
  styleUrls: ['./topics-list.component.scss']
})
export class TopicsListComponent implements OnInit {

  private _current: number;
  topics: TopicItem[] = [];
  loading = false;

  @Output() haveMessages = new EventEmitter<boolean>();

  set current(current: number) {
    this._current = current;
    const found = this.topics.find(topic => topic.card.id === current);

    if (!!found) {
      found.newMessages = 0;
      this.haveMessages.emit(!!this.topics.find(topic => !!topic.newMessages));
    }
  }

  get current() {
    return this._current;
  }


  constructor(@Inject(topics_service) private topicsService: ITopicsService,
              private topicsSocket: TopicsSocketService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params.subscribe(({topic}) => this.current = +topic || null);

    this.topicsSocket.event$.subscribe(event => {
      if (event instanceof TopicMessageAddedEvent) {
        if (this.current !== event.topic.id) {
          const found = this.topics.find(topic => topic.card.id === event.topic.id);
          if (found.card.messagesCount < event.topic.messagesCount) {
            found.newMessages = found.card.messagesCount - event.topic.messagesCount;
            this.haveMessages.emit(true);
          }
        }
      } else if (event instanceof TopicCreatedEvent) {
        this.topics.unshift(new TopicItem(event.topic, 0));
      }
    });

    this.load();
  }

  load() {
    this.loading = true;
    this.topicsService.list()
      .pipe(finalize(() => this.loading = false))
      .subscribe(topics => {
        this.topics = topics.map(card => new TopicItem(card, 0));
        this.haveMessages.emit(!!this.topics.find(topic => !!topic.newMessages));
        if (!this.current) {
          this.router.navigate(['/topics', topics[0].id], {relativeTo: this.route});
        }
      });
  }

}
