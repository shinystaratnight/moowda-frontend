import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  ApplicationError,
  Error,
  FatalError,
  ForbiddenError,
  HttpService,
  InvalidField,
  InvalidGrantError,
  NetworkError,
  NotFoundError
} from 'junte-angular';
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
        console.log(error);
        this.modalService.error({
          nzTitle: 'Error',
          nzContent: this.getMessage(error)
        });
      });
  }

  getMessage(error: Error) {
    if (error instanceof NetworkError) {
      return 'Please, check your internet connection';
    } else if (error instanceof FatalError) {
      return 'Error, please refresh page';
    } else if (error instanceof InvalidGrantError) {
      return 'Authentication failed.';
    } else if (error instanceof ForbiddenError || error instanceof NotFoundError || error instanceof ApplicationError) {
      return error.reasons
        .filter(reason => !(reason instanceof InvalidField))
        .map(reason => reason.message)
        .join(', ');
    }
  }
}
