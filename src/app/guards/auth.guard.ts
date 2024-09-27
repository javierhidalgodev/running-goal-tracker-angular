import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export type Token = {
  userId: string,
  email: string,
  token: string
}

export const authGuard: CanActivateFn = () => {

  const router = inject(Router);
  const http = inject(HttpClient)

  const token = localStorage.getItem('token');
  if(token) {
    let decodedToken: Token = JSON.parse(token)

    http.get('http://localhost:5000/login/check-token', {
      headers: {
        "Authorization": `Bearer ${decodedToken.token}` 
      }
    }).subscribe({
      error: error => {
        localStorage.removeItem('token')
        router.navigate(['auth/login']);
      },
      // complete: () => console.log('Token verification attempt completed!')
    })

    return true
  }

  router.navigate(['auth/login']);
  return false;
};
