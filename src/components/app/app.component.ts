import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'junte-angular';
import { NzModalRef, NzModalService } from 'ng-zorro-antd';
import { filter } from 'rxjs/operators';
import { AppConfig } from 'src/app-config';
import { LoginComponent } from 'src/components/login/login.component';

@Component({
  selector: 'moo-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  private _modal: NzModalRef;

  set modal(modal: NzModalRef) {
    this._modal = modal;

    modal.afterOpen.subscribe(() => {
      const component = modal.getContentComponent();
      if (component instanceof LoginComponent) {
        component.logged.subscribe(() => this.modal.close());
      }
    });
  }

  get modal() {
    return this._modal;
  }

  constructor(private modalService: NzModalService,
              private config: AppConfig,
              private route: ActivatedRoute,
              private router: Router,
              private http: HttpService) {
  }

  ngOnInit() {
    if (!this.config.authorization) {
      // setTimeout needed for avoid error from modal service
      setTimeout(() => {
        this.modal = this.modalService.create({
          nzTitle: '',
          nzContent: LoginComponent,
          nzFooter: null,
          nzWidth: 'fit-content'
        });
      });
    }

    this.http.error$.pipe(filter(error => !!error))
      .subscribe(error => {
        const content = !!error.reasons.length ? error.reasons[error.reasons.length - 1].message : null;
        this.modalService.error({
          nzTitle: 'Error',
          nzContent: content
        });
      });
  }
}
