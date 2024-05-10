import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, of, Subject, takeUntil, tap } from 'rxjs';
import { Token, User } from '../../shared/interfaces';
import { environments } from '../../../environments/environments';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = environments.baseUrl;

  private unsubscribe$ = new Subject<void>();

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  private get userToken(): string {
    if (!localStorage.getItem('auth_token')) return '';
    const token: Token = JSON.parse(localStorage.getItem('auth_token')!);
    return token.accessToken;
  }

  private get authHeader(): HttpHeaders {
    return new HttpHeaders({ Authorization: `Bearer ${this.userToken}` });
  }

  registerUser(user: Partial<User>): Observable<boolean> {
    return this.http.post(`${this.baseUrl}/register`, user).pipe(
      tap((resp) => console.log(resp)),
      map((resp) => true),
      catchError((err) => of(false))
    );
  }

  loginUser(user: Partial<User>): Observable<boolean> {
    return this.http.post<boolean>(`${this.baseUrl}/authenticate`, user).pipe(
      tap((token) => {
        localStorage.setItem('auth_token', JSON.stringify(token));
        if (user.email) {
          localStorage.setItem('current_user', JSON.stringify(user));
        }
      }),
      map((resp) => true),
      catchError((err) => of(false))
    );
  }

  get currentUser(): User | null {
    if (!localStorage.getItem('auth_token')) return null;
    const currentUser: User = JSON.parse(localStorage.getItem('current_user')!);
    return currentUser;
  }

  authStatus(): boolean {
    if (!localStorage.getItem('auth_token')) return false;
    return true;
  }

  logOut() {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('current_user');

    this.unsubscribe$.next();
    this.unsubscribe$.complete();

    this.router.navigateByUrl('/');
  }
}
