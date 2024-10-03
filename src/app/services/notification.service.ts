import { Injectable } from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  // * Un Subject actúa como observable y observer => puede emitir y suscribirse
  private _notification$ = new Subject<NotificationMessage | null>()
  private _validation$ = new Subject<ValidationMessagesWithExtras | null>()

  // * Esto impide que el acceso de los componentes emita valores, solo permite la suscripción
  get notification$() {
    return this._notification$.asObservable()
  }

  get validation$() {
    return this._validation$.asObservable()
  }

  // * Cada uno de las funciones aquí emite valores de un tipo y con un mensaje
  success(message: string, autoremove?: boolean) {
    if (message) {
      this._notification$.next({ type: 'success', message, autoremove: autoremove || true })
    } else {
      this._notification$.next(null)
    }
  }
  
  error(message: string, autoremove: boolean) {
    // if (message) {
      this._notification$.next({ type: 'error', message, autoremove })
    // } else {
      // this._notification$.next(null)
    // }
  }

  validation(messages: InputValidators[]) {
    if (messages.length > 0) {
      this._validation$.next({ type: 'validation', messages })
    } else {
      this._validation$.next(null)
    }
  }

  clear() {
    this._notification$.next(null)
  }
}

// * Una interfaz propia para la notificaciones de éxito/error
export interface NotificationMessage {
  type: 'success' | 'error' | null,
  message: string | null,
  autoremove?: boolean
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