import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpResponse
} from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor(private commonService: CommonService,
    private router: Router) {
    }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request = request.clone({
      headers: request.headers
        .set('Content-Type', 'application/json')
        .set('Authorization', 'Bearer ' + (localStorage.getItem(btoa('AuthorizationToken')) || ''))
        // .set('anonymoustoken', this.Constants.token['anonymoustoken'] || '')
        // .set('usertoken', this.Constants.token['usertoken'] || '')
    });

    return next.handle(request).pipe(tap((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        this.SetTokenFromLoginResponse(event);
        // console.log('response', event);

      }
    }, (err: any) => {
      if (err instanceof HttpErrorResponse) {
        this.commonService.spinner.hide();
        if (err.status === 0) {
          setTimeout(() => {
            this.commonService.toaster.show('Server not reachable, Try Again', false);
            // this.router.navigateByUrl('login');
          });
        } else {
          if (err.status === 401) {
            // redirect to the login route
            // or show a modal
            // un-authorized
            setTimeout(() => {
              this.commonService.toaster.show('Unauthorized access, redirecting to Login page', false);
              this.router.navigateByUrl('login');
            });
          } else if (err.status === 400) {
            setTimeout(() => {
              this.commonService.toaster.show((typeof(err.error) === 'string' ? err.error : err.error.message), false);
            });
          } else {
            setTimeout(() => {
              this.commonService.toaster.show('Server not reachable, Try Again', false);
            });
          }
        }
      }
    }));
  }
  private SetTokenFromLoginResponse(event) {
    if (event.url.endsWith('config.json')) {
      // fetching app settings from local config.json
      return;
    }
    if (this.isLoginResponse(event) && (event.body !== null && event.body.Token)) {
      localStorage.setItem(btoa('AuthorizationToken'), event.body.Token);
    }
  }
  private isLoginResponse(event: any): boolean {
    return (event.url.toLowerCase().indexOf('login') > -1);
  }
}
