import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class MyInterceptorInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let authReq = request;
    let url = request.url;
      const userToken = localStorage.getItem('token');
      authReq = request.clone({
        setHeaders: {
          Authorization: `Bearer ${userToken}`,
        },
      });
    return next.handle(authReq);
  }
}
