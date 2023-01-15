import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class Interceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const accessToken: any = localStorage.getItem('user');
    const decodedItem = JSON.parse(accessToken);
    if (req.url.startsWith('https://api.tomtom.com/')) {
      return next.handle(req);
    }

    if (accessToken) {
      const cloned = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + decodedItem.accessToken),
      });

      return next.handle(cloned);
    } else {
      return next.handle(req);
    }
  }
}
