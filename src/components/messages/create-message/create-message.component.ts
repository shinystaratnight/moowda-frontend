import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessagesManager } from 'src/managers/messages.manager';

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

  constructor(private messages: MessagesManager,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params.subscribe(({topic}) => this.id = +topic || null);
  }

  send() {
    this.messages.send(this.id, this.content, this.images);
  }
}
