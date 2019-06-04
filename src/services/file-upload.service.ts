import { HttpClient, HttpEvent, HttpEventType, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { Authorization } from 'junte-angular';
import { Subscription } from 'rxjs';
import { AppConfig } from 'src/app-config';

@Injectable({providedIn: 'root'})
export class FileUploadService implements OnDestroy {

  private authorization: Authorization;
  private subscriptions: Subscription[] = [];

  constructor(private http: HttpClient,
              private config: AppConfig) {
    this.subscriptions.push(config.authorization$.subscribe(accessToken => this.authorization = accessToken));
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  private addAccessTokenIfNeed(req: HttpRequest<FormData>) {
    if (this.authorization) {
      req.headers.append('Authorization', `${this.authorization.type} ${this.authorization.token}`);
    }
  }

  uploadFile(path: string, file: any, onProgress: Function, onSuccess: Function, onError: Function): Subscription {
    const url = `${this.config.backendEndpoint}/${path}`;
    const formData = new FormData();
    const options = {reportProgress: true, withCredentials: true};

    formData.append('file', file);
    const req = new HttpRequest('POST', url, formData, options);
    this.addAccessTokenIfNeed(req);

    return this.http.request(req).subscribe(
      (event: HttpEvent<{}>) => {
        if (event.type === HttpEventType.UploadProgress) {
          if (event.total > 0) {
            (event as any).percent = (event.loaded / event.total) * 100;
            console.log(event);
          }
          onProgress(event, file);
        } else if (event instanceof HttpResponse) {
          onSuccess(event.body, file, event);
        }
      }, err => onError(err, file));
  }
}
