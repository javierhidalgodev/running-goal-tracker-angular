import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, filter, find, from, Observable, of, switchMap, throwError } from 'rxjs';
import { DEFAULT_PROFILE_USER_IMG, Login, NewUser, User } from '../models/user.model';
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const API_URL = 'https://reqres.in/api';
const API_DBJSON_URL = 'http://localhost:3000';
const JWT_SECRET = 'pikachu'

interface AuthResponse {
  token: string
}

interface RegistrationResponse {
  token: string,
  id: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private _http: HttpClient) { }

  login(email: string, password: string): Observable<AuthResponse> {
    const body = { email, password };

    return this._http.post<AuthResponse>(`${API_URL}/login`, body).pipe(
      catchError(error => {
        console.log('Login error: ', error);

        let errorMessage = 'Failed to login. Please, try again.'

        if(error.status === 400) {
          errorMessage = 'Wrong credentials'
        }

        return throwError(() => new Error(errorMessage));
      })
    )
  }

  loginDBJSON(loginData: Login) {
    return this._http.get<User[]>(`${API_DBJSON_URL}/users?email=${loginData.email}`).pipe(
      switchMap(users => {
        if(users.length === 0) {
          return throwError(() => new Error('User not found'))
        }

        const user = users[0]

        return this.comparePassword(loginData.password, user.password).pipe(
          switchMap(passwordMatch => {
            if (!passwordMatch) {
              return throwError(() => new Error('Invalid loading'))
            }

            const token = this.generateToken(user.id!, user.email)

            localStorage.setItem('token', token)

            return of({token, userId: user.id})
          })
        )
      }),
      catchError(error => {
        console.log(error)
        return throwError(() => new Error('Login failed'))
      })
    )
  }

  private comparePassword(password: string, hash: string): Observable<boolean> {
    return new Observable<boolean>(observer => {
      bcrypt.compare(password, hash, (err, res) => {
        if (err) {
          observer.error(err)
        } else {
          observer.next(res)
          observer.complete()
        }
      })
    })
  }

  private generateToken(userId: string, email: string): string {
    return jwt.sign({userId, email}, JWT_SECRET, {
      expiresIn: '3m'
    })
  }

  /**
   * ? Esto no está bien hecho, ya que la constraseña debería de ir con un hash
   */
  register(email: string, password: string): Observable<RegistrationResponse> {
    const body = { email, password }

    return this._http.post<RegistrationResponse>(`${API_URL}/register`, body).pipe(
      catchError(error => {
        console.log('Registration error: ', error);
        return throwError(() => new Error('Failed to registration. Please, try again.'))
      })
    )
  }

  registerDBJSON(user: NewUser): Observable<User> {
    return from(bcrypt.hash(user.password, 10)).pipe(
      switchMap(hash => {
        user.password = hash

        const body: User = {
          ...user,
          registrationDate: new Date(),
          profileIMG: user.profileIMG || DEFAULT_PROFILE_USER_IMG
        }

        return this._http.post<User>(`${API_DBJSON_URL}/users`, body)
      }),

      catchError(error => {
        console.log('Something went wrong');
        return throwError(() => new Error('Please try again later'))
      })
    )


    // 1. Creación del objeto
    const body: User = {
      ...user,
      registrationDate: new Date(),
      profileIMG: user.profileIMG || DEFAULT_PROFILE_USER_IMG
    }

    // 2. Llamada http a la BBDD
    return this._http.post<User>(`${API_DBJSON_URL}/users`, body).pipe(
      // 3. Con un pipe controlamos el error
      catchError(error => {
        console.log('Registration error:', error)
        return throwError(() => new Error('Failed to registration. Please, try again later.'))
      })
    )
  }
}
