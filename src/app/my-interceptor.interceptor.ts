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
    console.log(url,"urllllllllllll");

    // if (url.includes('/designer')) {
    //   console.log("inside designer block");

    //   const designerToken = localStorage.getItem('designerToken');
    //   console.log(designerToken, "designer token");

    //   authReq = request.clone({
    //     setHeaders: {
    //       Authorization: `Bearer ${designerToken}`,
    //     },
    //   });
    // } else if (url.startsWith('/admin')) {
    //   const adminToken = localStorage.getItem('admin');
    //   authReq = request.clone({
    //     setHeaders: {
    //       Authorization: `Bearer ${adminToken}`,
    //     },
    //   });
    // } else {
      const userToken = localStorage.getItem('token');
      authReq = request.clone({
        setHeaders: {
          Authorization: `Bearer ${userToken}`,
        },
      });
      
    // }

    return next.handle(authReq);
  }
}
