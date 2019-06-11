import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NzModalRef, NzModalService, UploadXHRArgs } from 'ng-zorro-antd';
import { debounceTime } from 'rxjs/operators';
import { LoginComponent } from 'src/components/login/login.component';
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

  private _modal: NzModalRef;

  content: string;
  images: any[] = [];
  id: number;

  set modal(modal: NzModalRef) {
    this._modal = modal;

    modal.afterOpen.subscribe(() => {
      const component = modal.getContentComponent();
      if (component instanceof LoginComponent) {
        component.logged.pipe(debounceTime(PLATFORM_DELAY))
          .subscribe(() => {
            this.modal.close();
            this.send();
          });
      }
    });
  }

  get modal() {
    return this._modal;
  }

  @HostListener('keydown.enter') onEnter() {
    this.send();
  }

  constructor(@Inject(messages_service) private messagesService: IMessagesService,
              private route: ActivatedRoute,
              private me: MeManager,
              private modalService: NzModalService,
              private upload: FileUploadService) {
  }

  ngOnInit() {
    this.route.params.subscribe(({topic}) => this.id = +topic || null);
  }

  send() {
    if (this.me.logged) {
      this.messagesService.create(this.id, new MessageCreate({
        content: this.content,
        images: this.images.map(image => image['response'].id)
      })).subscribe(() => {
        this.content = '';
        this.images = [];
      });
    } else {
      // setTimeout needed for avoid error from modal service
      setTimeout(() => {
        this.modalService.closeAll();
        this.modal = this.modalService.create({
          nzTitle: '',
          nzContent: LoginComponent,
          nzFooter: null,
          nzWidth: 'fit-content'
        });
      });
    }
  }

  request = (item: UploadXHRArgs) => {
    return this.upload.uploadFile('images', item.file, item.onProgress, item.onSuccess, item.onError);
  };
}
