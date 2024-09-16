import { Injectable } from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  // * Un Subject actúa como observable y observer => puede emitir y suscribirse
  private _notification$ = new Subject<NotificationMessage>()
  private _validation$ = new Subject<ValidationMessagesWithExtras>()

  // * Esto impide que el acceso de los componentes emita valores, solo permite la suscripción
  get notification$() {
    return this._notification$.asObservable()
  }

  get validation$() {
    return this._validation$.asObservable()
  }

  // * Cada uno de las funciones aquí emite valores de un tipo y con un mensaje
  success(message: string) {
    this._notification$.next({ type: 'success', message })
  }

  error(message: string) {
    this._notification$.next({ type: 'error', message })
  }

  validation(messages: InputValidators[]) {
    this._validation$.next({ type: 'validation', messages})
  }

  clear() {
    this._notification$.next({ type: null, message: null })
  }
}

// * Una interfaz propia para la notificaciones de éxito/error
export interface NotificationMessage {
  type: 'success' | 'error' | null,
  message: string | null
}

export interface ValidationMessages {
  type: 'validation' | null,
  messages: string[] | null
}

export interface InputValidators {
  key: string,
  validators: ValidationErrors | null
}

export interface ValidationMessagesWithExtras {
  type: 'validation' | null,
  messages: InputValidators[] | null
}