import {
  AfterViewChecked,
  Component,
  ElementRef,
  HostListener,
  Inject,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd';
import { BehaviorSubject, Subscription } from 'rxjs';
import {debounceTime, filter, finalize} from 'rxjs/operators';
import { ImagePreviewComponent } from 'src/components/messages/image-preview/image-preview.component';
import { MeManager } from 'src/managers/me.manager';
import { ScrollManager } from 'src/managers/scroll.manager';
import { MessageAddedEvent, MessageCard } from 'src/models/message';
import { IMessagesService, messages_service } from 'src/services/messages/interface';
import { MessagesSocketService } from 'src/services/messages/socket';
import {SignalsService} from "junte-angular";
import {CollapsedSignal} from "../../../models/signal";

const DEFAULT_PAGE = 1;
const DEFAULT_PAGE_SIZE = 10;
const SCROLL_DELAY = 1000;

@Component({
  selector: 'moo-messages-list',
  templateUrl: './messages-list.component.html',
  styleUrls: ['./messages-list.component.scss']
})
export class MessagesListComponent implements OnInit, AfterViewChecked, OnDestroy {

  private _topic: number;
  private height: number;
  private subscriptions = new Subscription();
  private scroll$ = new BehaviorSubject(false);

  messages: MessageCard[] = [];
  page: number = DEFAULT_PAGE;
  pageSize: number = DEFAULT_PAGE_SIZE;
  loading = false;
  colors = [];
  show = false;
  collapsed = false;

  @ViewChild('container') container: ElementRef;

  set topic(topic: number) {
    if (!!topic && topic !== this._topic) {
      this._topic = topic;
      this.load();
    }
  }

  get topic() {
    return this._topic;
  }

  constructor(@Inject(messages_service) private messagesService: IMessagesService,
              private route: ActivatedRoute,
              private messagesSocket: MessagesSocketService,
              private host: ElementRef,
              private modalService: NzModalService,
              private signal: SignalsService,
              public scroll: ScrollManager,
              public me: MeManager) {
  }

  ngOnInit() {
    this.route.params.subscribe(({topic, page, 'page_size': pageSize}) => {
      this.topic = +topic || null;
      this.page = +page || DEFAULT_PAGE;
      this.pageSize = +pageSize || DEFAULT_PAGE_SIZE;
    });

    this.signal.signals$.pipe(filter(signal => signal instanceof CollapsedSignal))
      .subscribe((signal: CollapsedSignal) => this.collapsed = signal.collapsed);

    this.scroll$.pipe(debounceTime(SCROLL_DELAY)).subscribe(() => this.scrollToBottom());

    this.subscriptions.add(this.messagesSocket.event$.subscribe(event => {
      if (event instanceof MessageAddedEvent) {
        this.setColor(event.message.user.id);
        this.messages.push(new MessageCard(event.message));
        if (this.me.logged) {
          this.messagesService.read(this.topic, event.message.id).subscribe();
        }
        this.scroll$.next(true);
      }
    }));
  }

  ngAfterViewChecked() {
    this.scroll$.next(true);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
    this.messagesSocket.close();
  }

  scrollToBottom() {
    if (!!this.container) {
      const height = this.container.nativeElement.scrollHeight;
      if (height !== this.height) {
        this.container.nativeElement.scrollIntoView(false);
        this.height = height;
        this.show = true;
      }
    }
  }

  setColor(id: number) {
    if (!this.colors[id]) {
      this.colors[id] = '#' + (Math.random() * 0xFFFFFF << 0).toString(16);
    }
  }

  load() {
    this.show = false;
    this.loading = true;
    this.messagesSocket.topic = this.topic;
    this.messagesService.list(this.topic, this.page, this.pageSize)
      .pipe(finalize(() => this.loading = false))
      .subscribe(paging => {
        this.messages = paging.results;

        this.messages.forEach(message => this.setColor(message.user.id));
        if (!!this.messages.length && this.me.logged) {
          this.messagesService.read(this.topic, this.messages[this.messages.length - 1].id).subscribe();
        }
      });
  }

  preview(url: string) {
    this.modalService.closeAll();
    this.modalService.create({
      nzTitle: '',
      nzContent: ImagePreviewComponent,
      nzComponentParams: {image: url},
      nzFooter: null,
      nzWidth: 'fit-content'
    });
  }
}
