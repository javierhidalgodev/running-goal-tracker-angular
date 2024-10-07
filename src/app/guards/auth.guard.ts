import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '@services/auth.service';
import { catchError, map, of } from 'rxjs';

export type Token = {
  userId: string,
  email: string,
  token: string
}

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const _http = inject(HttpClient)
  const _authService = inject(AuthService)

  return _authService.checkToken()
}

// ? ¿Por Qué No Suscribirse Directamente en el Guard?

// ? Control del Flujo Asíncrono: Los Guard necesitan devolver inmediatamente un valor sincrónico (true o false) o un observable/promesa que se resuelva en un valor booleano. Al suscribirse directamente, pierdes el control sobre cuándo se completará la suscripción y, por lo tanto, el Guard no puede esperar correctamente.

// ? Potenciales Problemas de Memoria: Suscribirse directamente dentro de un Guard puede llevar a fugas de memoria si no se gestionan adecuadamente las suscripciones, especialmente si la navegación falla o se intenta redirigir repetidamente.

// ? Gestión de Errores y Navegación: Devolver el observable permite capturar errores de manera elegante con catchError y gestionar la navegación de manera adecuada sin que el Guard termine antes de tiempo.