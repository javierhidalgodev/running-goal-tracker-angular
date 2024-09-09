import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrl: './auth-page.component.scss'
})
export class AuthPageComponent implements OnInit {
  currentAuthAction: 'login' | 'register' = 'login';

  constructor(private _router: Router, private _route: ActivatedRoute) { }

  ngOnInit(): void {

    this._route.params.subscribe(params => {
      const action = params['action']

      if(action === 'login' || action === 'register') {
        this.currentAuthAction = action
      } else {
        // Opción 1. Navegas a una URL nueva, y con las extra evitas que la URL errónea se quede registrada, pudiendo volver a la anterior funcional
        // this._router.navigate(['/error'], {replaceUrl: true})
        // Opción 2. Directamente vuelves a una ruta concreta. En este caso intentará cargar la home, pero por el authGuard, al no tener token, regresará al login
        this._router.navigate([''])
      }

    })

    const token = localStorage.getItem('token')

    if (token) {
      this._router.navigate([''])
    }
  }

  navigateTo(action: 'login' | 'register') {
    this._router.navigate(['/auth/', action])
  }
}
