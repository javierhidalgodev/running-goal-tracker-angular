import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';


export const authGuard: CanActivateFn = () => {

  /**
   * Traemos el Router de Angular para hacer la redirección
   */
  const router = inject(Router);
  const http = inject(HttpClient)

  const token = localStorage.getItem('token');

  if(token) {
    http.get('http://localhost:5000/login', {
      headers: {
        "Authorization": `Bearer ${token}` 
      }
    }).subscribe({
      next: (value: any) => {
        localStorage.setItem('userId', value.decoded.userId)
      },
      error: error => {
        localStorage.removeItem('token')
        router.navigate(['auth/login']);
      },
      complete: () => console.log('Token verification attempt completed!')
    })

    return true
  }

  router.navigate(['auth/login']);
  return false;
};
