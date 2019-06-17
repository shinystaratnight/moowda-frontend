import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'junte-angular';
import { NzModalService } from 'ng-zorro-antd';
import { filter } from 'rxjs/operators';
import { AppConfig } from 'src/app-config';

@Component({
  selector: 'moo-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private modalService: NzModalService,
              private config: AppConfig,
              private route: ActivatedRoute,
              private router: Router,
              private http: HttpService) {
  }

  ngOnInit() {
    this.http.error$.pipe(filter(error => !!error))
      .subscribe(error => {
        const messages = error.reasons.map(reason => reason.message);
        const real = messages.filter(message => message.length > 1);
        const content = !!real.length ? messages[messages.length - 1] : messages.join('');

        this.modalService.error({
          nzTitle: 'Error',
          nzContent: content
        });
      });
  }
}
