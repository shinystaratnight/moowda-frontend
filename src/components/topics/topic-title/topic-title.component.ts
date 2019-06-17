import { Component, EventEmitter, HostBinding, Inject, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd';
import { debounceTime } from 'rxjs/operators';
import { AppConfig } from 'src/app-config';
import { LoginComponent } from 'src/components/login/login.component';
import { CreateTopicComponent } from 'src/components/topics/create-topic/create-topic.component';
import { ShareTopicComponent } from 'src/components/topics/share-topic/share-topic.component';
import { PLATFORM_DELAY } from 'src/consts';
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
  private _topic: Topic;

  @HostBinding('style.display') display = 'none';
  @Output() collapsedChange = new EventEmitter<boolean>();
  @Input() collapsed: boolean;

  @Input() set id(id: number) {
    if (!!id && id !== this._id) {
      this._id = id;
      this.load();
    }
  }

  get id() {
    return this._id;
  }

  set topic(topic: Topic) {
    if (!!topic) {
      this._topic = topic;
      this.display = 'flex';
    }
  }

  get topic() {
    return this._topic;
  }

  constructor(@Inject(topics_service) private topicsService: ITopicsService,
              private modalService: NzModalService,
              private route: ActivatedRoute,
              public config: AppConfig,
              public me: MeManager) {
  }

  ngOnInit() {
    this.route.params.subscribe(({topic}) => this.id = +topic || null);
  }

  private openModal(component: any, title: string = '') {
    this.modalService.closeAll();
    const modal = this.modalService.create({
      nzTitle: title,
      nzContent: component,
      nzFooter: null,
      nzWidth: 'fit-content'
    });

    modal.afterOpen.subscribe(() => {
      const component = modal.getContentComponent();
      if (component instanceof ShareTopicComponent) {
        component.topic = this.topic;
        component.shared.subscribe(() => modal.close());
      }
    });
  }

  load() {
    this.topicsService.get(this.id).subscribe(topic => this.topic = topic);
  }

  share() {
    this.openModal(ShareTopicComponent, 'Share with friends');
  }
}
