import { Component, Inject, OnInit } from '@angular/core';
import { TopicCard } from "src/models/topic";
import { ITopicsService, topics_service } from "src/services/topics/interface";

@Component({
  selector: 'moo-topics-list',
  templateUrl: './topics-list.component.html',
  styleUrls: ['./topics-list.component.scss']
})
export class TopicsListComponent implements OnInit {

  topics: TopicCard[] = [];

  constructor(@Inject(topics_service) private topicsService: ITopicsService) {
  }

  ngOnInit() {
    this.topicsService.list()
      .subscribe(topics => this.topics = topics);
  }

}
