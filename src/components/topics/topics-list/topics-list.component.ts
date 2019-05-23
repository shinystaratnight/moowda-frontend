import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { TopicCard } from 'src/models/topic';
import { ITopicsService, topics_service } from 'src/services/topics/interface';

@Component({
  selector: 'moo-topics-list',
  templateUrl: './topics-list.component.html',
  styleUrls: ['./topics-list.component.scss']
})
export class TopicsListComponent implements OnInit {

  private _topics: TopicCard[] = [];
  private _topic: number;
  loading = false;

  set topics(topics: TopicCard[]) {
    this._topics = topics;
    this.selected.emit(this.topic || topics[0].id);
  }

  get topics() {
    return this._topics;
  }

  set topic(topic: number) {
    this._topic = topic;
    this.load();
  }

  get topic() {
    return this._topic;
  }

  @Output() selected = new EventEmitter<number>();

  constructor(@Inject(topics_service) private topicsService: ITopicsService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params.subscribe(({topic}) => this.topic = +topic || null);
  }

  load() {
    this.loading = true;
    this.topicsService.list()
      .pipe(finalize(() => this.loading = false))
      .subscribe(topics => this.topics = topics);
  }

}
