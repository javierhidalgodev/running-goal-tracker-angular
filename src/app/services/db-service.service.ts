import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class DbServiceService {
  private _DB_URL = 'http://localhost:3000'

  constructor(private _http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this._http.get<User[]>(`${this._DB_URL}/users`).pipe(
      catchError(error => {
        console.log(error)
        return throwError(() => new Error('Something went wrong getting user list'))
      })
    )
  }

  getUserByEmail(email: string): Observable<User | null> {
    return this._http.get<User[]>(`${this._DB_URL}/users?email=${email}`).pipe(
      map(users => users.length > 0 ? users[0] : null),
      catchError(error => {
        console.log(error)
        return throwError(() => new Error('Something went wrong getting user by email'))
      })
    )
  }
}
