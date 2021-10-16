import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable, Injector, Type } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthorizationService } from './authorization.service';

@Injectable({
  providedIn: 'root',
})
export class AuthorizationInterceptor implements HttpInterceptor {
  constructor(private injector: Injector) {
  }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let requestResult: HttpRequest<any>;
    if (this.isUrlNeedsProAuth(request.url)) {
      requestResult = this.appendTokenToRequest(request);
    } else {
      requestResult = request.clone();
    }
    return next.handle(requestResult);
  }

  appendTokenToRequest(request: HttpRequest<any>): HttpRequest<any> {
    const authService: AuthorizationService = this.injector.get<AuthorizationService>(AuthorizationService as Type<AuthorizationService>);
    const token = authService.getAuthenticatedUser().token;
    return request.clone({
      headers: request.headers.set('x-access-token', token),
    });
  }

  isUrlNeedsProAuth(url: string): boolean {
    let needProAuth = true;
    const whiteList = [/login/, /assets/];

    for (const whiteUrl of whiteList) {
      if (url.search(whiteUrl) >= 0) {
        needProAuth = false;
        break;
      }
    }
    return needProAuth;
  }
}
