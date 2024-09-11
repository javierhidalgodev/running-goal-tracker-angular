import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, filter, find, from, map, Observable, of, switchMap, throwError } from 'rxjs';
import { DEFAULT_PROFILE_USER_IMG, Login, NewUser, User } from '../models/user.model';
import { DbServiceService } from './db-service.service';
import bcrypt from 'bcryptjs'

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
  constructor(
    private _http: HttpClient,
    private _dbService: DbServiceService
  ) { }

  login(email: string, password: string): Observable<AuthResponse> {
    const body = { email, password };

    return this._http.post<AuthResponse>(`${API_URL}/login`, body).pipe(
      catchError(error => {
        console.log('Login error: ', error);

        let errorMessage = 'Failed to login. Please, try again.'

        if (error.status === 400) {
          errorMessage = 'Wrong credentials'
        }

        return throwError(() => new Error(errorMessage));
      })
    )
  }

  loginDBJSON(loginData: Login): Observable<string> {
    return this._dbService.getUserByEmail(loginData.email).pipe(
      switchMap(user => {
        if (!user) {
          return throwError(() => new Error('User not found'))
        }

        return this.comparePassword(loginData.password, user.password).pipe(
          switchMap(isPasswordCorrect => {
            if (!isPasswordCorrect) {
              return throwError(() => new Error('Invalid login'))
            }

            return this.generateToken(user.id!, user.email)
          }))
      })
    )
  }

  private comparePassword(password: string, hash: string): Observable<boolean> {
    return new Observable<boolean>(observer => {
      bcrypt.compare(password, hash, (err, res) => {
        if (err) {
          observer.error(err)
        } else {
          if (!res) {
            observer.error('Invalid login')
          }
          observer.next(res)
          observer.complete()
        }
      })
    })
  }

  private generateToken(userId: string, email: string): Observable<string> {
    return this._http.post<string>('http://localhost:5000/login', {
      userId,
      email
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

  // registerDBJSON(user: NewUser): Observable<User> {
  //   return from(bcrypt.hash(user.password, 10)).pipe(
  //     switchMap(hash => {
  //       user.password = hash

  //       const body: User = {
  //         ...user,
  //         registrationDate: new Date(),
  //         profileIMG: user.profileIMG || DEFAULT_PROFILE_USER_IMG
  //       }

  //       return this._http.post<User>(`${API_DBJSON_URL}/users`, body)
  //     }),

  //     catchError(error => {
  //       console.log('Something went wrong');
  //       return throwError(() => new Error('Please try again later'))
  //     })
  //   )


  //   // 1. Creación del objeto
  //   const body: User = {
  //     ...user,
  //     registrationDate: new Date(),
  //     profileIMG: user.profileIMG || DEFAULT_PROFILE_USER_IMG
  //   }

  //   // 2. Llamada http a la BBDD
  //   return this._http.post<User>(`${API_DBJSON_URL}/users`, body).pipe(
  //     // 3. Con un pipe controlamos el error
  //     catchError(error => {
  //       console.log('Registration error:', error)
  //       return throwError(() => new Error('Failed to registration. Please, try again later.'))
  //     })
  //   )
  // }
}
