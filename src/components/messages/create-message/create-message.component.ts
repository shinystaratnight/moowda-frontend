import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NzModalRef, NzModalService, UploadXHRArgs } from 'ng-zorro-antd';
import { debounceTime } from 'rxjs/operators';
import { AppConfig } from 'src/app-config';
import { LoginComponent } from 'src/components/login/login.component';
import { ImagePreviewComponent } from 'src/components/messages/image-preview/image-preview.component';
import { PLATFORM_DELAY } from 'src/consts';
import { MeManager } from 'src/managers/me.manager';
import { MessageCreate } from 'src/models/message';
import { FileUploadService } from 'src/services/file-upload.service';
import { IMessagesService, messages_service } from 'src/services/messages/interface';

@Component({
  selector: 'moo-create-message',
  templateUrl: './create-message.component.html',
  styleUrls: ['./create-message.component.scss']
})
export class CreateMessageComponent implements OnInit {

  private modal: NzModalRef;
  content: string;
  images: any[] = [];
  image: UploadXHRArgs;
  id: number;

  @HostListener('keydown.enter') onEnter() {
    this.send();
  }

  constructor(@Inject(messages_service) private messagesService: IMessagesService,
              private route: ActivatedRoute,
              private me: MeManager,
              private config: AppConfig,
              private modalService: NzModalService,
              private upload: FileUploadService) {
  }

  ngOnInit() {
    this.route.params.subscribe(({topic}) => this.id = +topic || null);
  }

  private openModal(component: any, params: any = {}) {
    this.modalService.closeAll();
    this.modal = this.modalService.create({
      nzTitle: '',
      nzContent: component,
      nzComponentParams: params,
      nzFooter: null,
      nzWidth: 'fit-content'
    });
  }

  login(send: boolean = false) {
    this.openModal(LoginComponent);

    this.modal.afterOpen.subscribe(() => {
      const component = this.modal.getContentComponent();
      component.logged.pipe(debounceTime(PLATFORM_DELAY))
        .subscribe(() => {
          this.modal.close();
          send ? this.send() : this.request(this.image);
        });
    });
  }

  clear() {
    this.content = '';
    this.images = [];
  }

  send() {
    if (this.me.logged) {
      const message = new MessageCreate({
        content: this.content,
        images: this.images.map(image => image['response'].id)
      });
      this.messagesService.create(this.id, message).subscribe(() => this.clear());
    } else {
      // setTimeout needed for avoid error from modal service
      setTimeout(() => this.login(true));
    }
  }

  request = item => {
    this.image = item;
    if (!this.me.logged) {
      return null;
    }

    return this.upload.uploadFile('images', item.file, item.onProgress, item.onSuccess, item.onError);
  };

  checkAuth = () => {
    if (!this.me.logged) {
      this.login(false);
    }

    return () => this.me.logged;
  };

  preview = file => this.openModal(ImagePreviewComponent, {image: file['response'].url});
}
