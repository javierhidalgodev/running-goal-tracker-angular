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
  // ? Si no compruebas la validez del token desde el BACKEND, cualquiera puede falsear el token introduciéndolo manualmente. El contenido no se mostraría, pero la ruta sí estaría activa
  if(token) {
    // ? Si el token no puede ser parseado da error, y la aplicación se queda frita...
    let decodedToken: Token = JSON.parse(token)

    http.get('http://localhost:5000/login', {
      headers: {
        "Authorization": `Bearer ${decodedToken.token}` 
      }
    }).subscribe({
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
