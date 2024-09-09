import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = () => {

  /**
   * Traemos el Router de Angular para hacer la redirección
   */
  const router = inject(Router);

  const token = localStorage.getItem('token');

  if(token) return true;

  router.navigate(['auth/login']);
  return false;
};
