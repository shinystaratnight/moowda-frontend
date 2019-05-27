import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, finalize } from 'rxjs/operators';
import { TopicsManager } from 'src/managers/topics.manager';
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
  }

  get topics() {
    return this._topics;
  }

  set topic(topic: number) {
    this._topic = topic;
    this.router.navigate(['/topics', topic], {relativeTo: this.route});
  }

  get topic() {
    return this._topic;
  }

  constructor(@Inject(topics_service) private topicsService: ITopicsService,
              private topicsManager: TopicsManager,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params.subscribe(({topic}) => this.topic = +topic || null);
    this.topicsManager.topic$.pipe(filter(topic => !!topic))
      .subscribe(topic => this.topics.unshift(topic));
    this.load();
  }

  load() {
    this.loading = true;
    this.topicsService.list()
      .pipe(finalize(() => this.loading = false))
      .subscribe(topics => {
        this.topics = topics;
        if (!this.topic) {
          this.topic = topics[0].id;
        }
      });
  }

}
