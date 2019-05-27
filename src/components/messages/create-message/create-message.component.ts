import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UploadXHRArgs } from 'ng-zorro-antd';
import { MessagesManager } from 'src/managers/messages.manager';
import { FileUploadService } from 'src/services/file-upload.service';

@Component({
  selector: 'moo-create-message',
  templateUrl: './create-message.component.html',
  styleUrls: ['./create-message.component.scss']
})
export class CreateMessageComponent implements OnInit {

  content: string;
  images: any[] = [];
  id: number;
  defaultFileList = [
    {
      uid: -1,
      name: 'xxx.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
    },
    {
      uid: -2,
      name: 'yyy.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
    }
  ];

  @HostListener('keydown.enter') onEnter() {
    this.send();
  }

  constructor(private messages: MessagesManager,
              private route: ActivatedRoute,
              private upload: FileUploadService) {
  }

  ngOnInit() {
    this.route.params.subscribe(({topic}) => this.id = +topic || null);
    this.images = this.defaultFileList;
  }

  send() {
    console.log(this.images);
    this.messages.send(this.id, this.content, this.images.map(image => image['id']));
    this.content = '';
  }

  request = (item: UploadXHRArgs) => {
    return this.upload.uploadFile('images', item.file, item.onProgress, item.onSuccess, item.onError);
  };
}
