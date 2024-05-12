import { Injectable } from '@angular/core';
import { environments } from '../../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { Token, User } from '../../shared/interfaces';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private baseUrl = environments.baseUrl;

  constructor( private http: HttpClient) { }

  // The http interceptor will add the token to the headers

  // # Dashboard req



  // # Users req
  getUsers(): Observable<User[]>{
    return this.http.get<User[]>(`${this.baseUrl}/api/users`);
  }

  getUserById( id: string ): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/api/users/${id}`)
  }

  createUser( user: User ): Observable<boolean> {
    return this.http.post<User>(`${this.baseUrl}/api/users`, user).pipe(
      map( resp => true ),
      catchError( err => of(false) ),
    );
  }

  updateUser( user: User ): Observable<boolean> {
    return this.http.put<User>(`${this.baseUrl}/api/users/${user.id}`, user).pipe(
      map( resp => true ),
      catchError( err => of(false) ),
    );
  }

  deleteUserById( id: string): Observable<boolean> {
    return this.http.delete(`${this.baseUrl}/api/users/${id}`)
      .pipe(
        map( resp => true ),
        catchError( err => of(false) ),
      );
  }




  // # Parking req

}
