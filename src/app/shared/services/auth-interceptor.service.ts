import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

/**
 * `AuthInterceptor` intercepts all outgoing HTTP requests.
 * It adds an Authorization header with the user's token to each request,
 * unless the request has a 'No-Auth' header. e.g.:
 *
 * getPublicData(): Observable<Data> {
 *   const headers = new HttpHeaders({ 'No-Auth': 'True' });
 *   return this.http.get<Data>(`${this.baseUrl}/public_data`, { headers });
 * }
 *
 * If a request returns a 403 status code, it redirects the user to the login page.
 */

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}

  private get userToken(): string {
    return JSON.parse(localStorage.getItem('auth_token') || '{}');
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let authReq = req;

    // Don't add the Authorization header if the 'No-Auth' header is present
    if (!req.headers.has('No-Auth')) {
      authReq = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${this.userToken}`),
      });
    }

    return next.handle(authReq).pipe(
      catchError((err: HttpErrorResponse) => {
        let errorData = { status: err.status, message: '' };
        if (err.error instanceof ErrorEvent) {
          // client-side error
          errorData.message = `Error: ${err.error.message}`;
        } else {
          // server-side error
          switch (err.status) {
            case 403:
              this.router.navigateByUrl('/auth/login');
              break;
            case 404:
              errorData.message = 'Not Found';
              break;
            case 500:
              errorData.message = 'Internal Server Error';
              break;
            default:
              errorData.message = `Error Code: ${err.status}\nMessage: ${err.message}`;
          }
        }
        return throwError(errorData);
      })
    );
  }
}
