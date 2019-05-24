import { Component, EventEmitter, HostListener, Inject, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IMessagesService, messages_service } from 'src/services/messages/interface';

@Component({
  selector: 'moo-create-message',
  templateUrl: './create-message.component.html',
  styleUrls: ['./create-message.component.scss']
})
export class CreateMessageComponent implements OnInit {

  content: string;
  images: number[] = [];
  id: number;

  @Output() sent = new EventEmitter<any>();

  @HostListener('keydown.enter') onEnter() {
    this.send();
  }

  constructor(@Inject(messages_service) private messagesService: IMessagesService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params.subscribe(({topic}) => this.id = +topic || null);
  }

  send() {
    console.log('send', this.content);
    this.messagesService.create(this.id, this.content, this.images)
      .subscribe();
  }
}
