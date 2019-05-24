import { Component, Inject, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NzModalRef, NzModalService } from 'ng-zorro-antd';
import { ShareTopicComponent } from 'src/components/topics/share-topic/share-topic.component';
import { MeManager } from 'src/managers/me.manager';
import { Topic } from 'src/models/topic';
import { ITopicsService, topics_service } from 'src/services/topics/interface';

@Component({
  selector: 'moo-topic-title',
  templateUrl: './topic-title.component.html',
  styleUrls: ['./topic-title.component.scss']
})
export class TopicTitleComponent implements OnInit {

  private _id: number;
  private _modal: NzModalRef;

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

  constructor(@Inject(topics_service) private topicsService: ITopicsService,
              private modalService: NzModalService,
              private route: ActivatedRoute,
              public me: MeManager) {
  }

  ngOnInit() {
    this.route.params.subscribe(({topic}) => this.id = +topic || null);
  }

  load() {
    this.topicsService.get(this.id).subscribe(topic => this.topic = topic);
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
