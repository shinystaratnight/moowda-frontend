import { Component, Inject, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
    this.router.navigate(['/topics', this.topic || topics[0].id], {relativeTo: this.route});
  }

  get topics() {
    return this._topics;
  }

  @Input() set topic(topic: number) {
    this._topic = topic;
    this.load();
  }

  get topic() {
    return this._topic;
  }

  constructor(@Inject(topics_service) private topicsService: ITopicsService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {

  }

  load() {
    this.loading = true;
    this.topicsService.list()
      .pipe(finalize(() => this.loading = false))
      .subscribe(topics => this.topics = topics);
  }

}
