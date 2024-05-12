import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, firstValueFrom, map, Observable, of, Subject, takeUntil, tap } from 'rxjs';
import { Auth, Token, User } from '../../shared/interfaces';
import { environments } from '../../../environments/environments';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = environments.baseUrl;

  private unsubscribe$ = new Subject<void>();

  constructor(private http: HttpClient, private router: Router) {}

  private get userToken(): string {
    if (!localStorage.getItem('auth_token')) return '';
    const token: Token = JSON.parse(localStorage.getItem('auth_token')!);
    return token.accessToken;
  }

  currentUser(): User | null {
    if (!localStorage.getItem('auth_token')) return null;
    if (!localStorage.getItem('current_user')) return null;
    const currentUser: User = JSON.parse(localStorage.getItem('current_user')!);
    return currentUser;
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
    return this.http.post<Auth>(`${this.baseUrl}/authenticate`, user).pipe(
      tap((resp: Auth) => {
        localStorage.setItem('auth_token', JSON.stringify(resp.accessToken));
        localStorage.setItem('current_user', JSON.stringify(resp.user));
      }),
      map((resp) => true),
      catchError((err) => of(false))
    );
  }

  isAdminAuthenticated(): boolean {
    const user: User | null = this.currentUser();
    if (!user) return false;
    if (user.role != 1) return false;
    return true;
    // try {
    //   const responseUser: User | undefined = await firstValueFrom(
    //     this.http.get<User>(`${this.baseUrl}/api/users/${user.id}`)
    //   );

    //   if (responseUser && responseUser.role === 1) return true  // 1 is the admin role
    //   return false;
    // } catch (error) {
    //   return false;
    // }
  }

  logOut() {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('current_user');

    this.unsubscribe$.next();
    this.unsubscribe$.complete();

    this.router.navigateByUrl('/');
  }
}
