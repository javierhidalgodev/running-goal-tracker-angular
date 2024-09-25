import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, from, Observable, of, switchMap, throwError } from 'rxjs';
import { DEFAULT_PROFILE_USER_IMG, Login, NewUser, User } from '../models/user.model';
import { DbService } from './db.service';
import bcrypt from 'bcryptjs'
import { FormGroup } from '@angular/forms';

const API_URL = 'https://reqres.in/api';
const API_DBJSON_URL = 'http://localhost:3000';

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
    private _dbService: DbService
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
        }

        // * El error se controla en la función principal
        observer.next(res)
        observer.complete()
      })
    })
  }

  private hashPassword(password: string): Observable<string> {
    return new Observable<string>(observer => {
      bcrypt.hash(password, 12, (err, res) => {
        if(err) observer.error(err)

        observer.next(res)
        observer.complete()
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

  uploadImage(selectedFile: File | null): Observable<{ filePath: string } | null> {
    if (selectedFile) {
      const formData = new FormData()
      formData.append('image', selectedFile as File)
      return this._http.post<{ filePath: string }>('http://localhost:5000/upload', formData)
    }
    
    return of(null)
  }

  registerDBJSON(userData: NewUser, selectedFile?: File) {
    // 1. Comprobar si existe el usuario
    return this._dbService.getUserByEmail(userData.email).pipe(
      switchMap(user => {
        if (!user) {
          return this.hashPassword(userData.password).pipe(
            switchMap(hash => {
              const newUser: User = {
                ...userData,
                password: hash,
                registrationDate: new Date(),
              }

              return this._http.post<User>(`${API_DBJSON_URL}/users`, newUser)
            }),
            catchError(error => {
              return throwError(() => new Error('Algo va mal al grabar el usuario o hashear el password', error.message))
            })
          )
        }

        return throwError(() => new Error('usuario ya registrado!'))
      }),
      catchError(error => {
        return throwError(() => new Error('Algo va mal al recuperar el usuario', error.message))
      })
    )
  }
}
