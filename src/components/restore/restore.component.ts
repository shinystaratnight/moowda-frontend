import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NzModalRef, NzModalService } from 'ng-zorro-antd';
import { filter } from 'rxjs/operators';
import { AppConfig } from 'src/app-config';
import { RestorePasswordComponent } from 'src/components/restore/restore-password/restore-password.component';

@Component({
  selector: 'moo-restore',
  template: ''
})
export class RestoreComponent implements OnInit {

  private _modal: NzModalRef;

  set modal(modal: NzModalRef) {
    this._modal = modal;

    modal.afterOpen.subscribe(() => {
      const component = modal.getContentComponent();
      if (component instanceof RestorePasswordComponent) {
        component.restored.subscribe(() => {
          this.modal.close();
          this.router.navigate(['/']);
        });
      }
    });
  }

  get modal() {
    return this._modal;
  }

  constructor(private modalService: NzModalService,
              private config: AppConfig,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.route.params.pipe(filter(({hash}) => !!hash && !this.config.authorization))
      .subscribe(({hash}) => {
        // setTimeout needed for avoid error from modal service
        setTimeout(() => {
          this.modalService.closeAll();
          this.modal = this.modalService.create({
            nzTitle: '',
            nzContent: RestorePasswordComponent,
            nzComponentParams: {hash: hash},
            nzFooter: null,
            nzWidth: 'fit-content'
          });
        });
      });
  }
}
