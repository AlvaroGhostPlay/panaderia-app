import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class CsrfInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('INTERCEPTOR:', req.method, req.url);

    const csrfToken = this.getCookie('XSRF-TOKEN');

    let request = req.clone({
      withCredentials: true,
    });

    if (csrfToken) {
      const token = decodeURIComponent(csrfToken);

      request = request.clone({
        setHeaders: {
          'X-XSRF-TOKEN': token,
        },
      });
    }

    console.log('FINAL HEADERS:', request.headers);
    console.log('FINAL XSRF:', request.headers.get('X-XSRF-TOKEN'));

    return next.handle(request);
  }

  private getCookie(name: string): string | null {
    const cookies = document.cookie.split(';');

    for (const cookie of cookies) {
      const [key, ...valueParts] = cookie.trim().split('=');

      if (key === name) {
        return valueParts.join('=');
      }
    }

    return null;
  }
}
