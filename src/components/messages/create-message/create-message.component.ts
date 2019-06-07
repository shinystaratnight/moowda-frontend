import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UploadXHRArgs } from 'ng-zorro-antd';
import { MessageCreate } from 'src/models/message';
import { FileUploadService } from 'src/services/file-upload.service';
import { IMessagesService, messages_service } from 'src/services/messages/interface';

@Component({
  selector: 'moo-create-message',
  templateUrl: './create-message.component.html',
  styleUrls: ['./create-message.component.scss']
})
export class CreateMessageComponent implements OnInit {

  content: string;
  images: any[] = [];
  id: number;

  @HostListener('keydown.enter') onEnter() {
    this.send();
  }

  constructor(@Inject(messages_service) private messagesService: IMessagesService,
              private route: ActivatedRoute,
              private upload: FileUploadService) {
  }

  ngOnInit() {
    this.route.params.subscribe(({topic}) => this.id = +topic || null);
  }

  send() {
    this.messagesService.create(this.id, new MessageCreate({
      content: this.content,
      images: this.images.map(image => image['response'].id)
    })).subscribe(() => {
      this.content = '';
      this.images = [];
    });
  }

  request = (item: UploadXHRArgs) => {
    return this.upload.uploadFile('images', item.file, item.onProgress, item.onSuccess, item.onError);
  };
}
