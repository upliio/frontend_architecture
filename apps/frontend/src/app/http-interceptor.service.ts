import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {environment} from '../environments/environment';
import {catchError} from 'rxjs/operators';
import {UserService} from './services/user.service';
import {NzNotificationService} from 'ng-zorro-antd/notification';

@Injectable()
export class ApiHttpInterceptor implements HttpInterceptor {

  constructor(private notificationService: NzNotificationService,
              private userService: UserService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let apiReq = req.clone({
      url: `${environment.api}${req.url}`
    });

    if (this.userService.getToken()) {
      apiReq = apiReq.clone({
        setHeaders: {
          'Authorization': this.userService.getToken()
        }
      });
    }

    return next.handle(apiReq).pipe(
      catchError((err) => {
        if (err?.status == 403) {
          // delete token
          this.userService.logout();
        }
        if (err?.error?.error?.message) {
          err.error.error.message.forEach(msg => {
            this.notificationService.error('Error', msg);
          });
        }
        return throwError(err);
      })
    );
  }

}

