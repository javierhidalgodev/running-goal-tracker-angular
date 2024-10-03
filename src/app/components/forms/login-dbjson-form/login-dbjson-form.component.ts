import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { AuthService } from '@services/auth.service';
import { Router } from '@angular/router';
import { NotificationService } from '@services/notification.service';
import { updateValidationErrors } from '@utils/goals.utils'
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login-dbjson-form',
  templateUrl: './login-dbjson-form.component.html',
  styleUrl: './login-dbjson-form.component.scss'
})
export class LoginDbjsonFormComponent implements OnInit, OnDestroy {
  loginForm: FormGroup = new FormGroup({});
  isLogin: boolean = false;

  private subscriptions$: Subscription = new Subscription();

  constructor(
    private _formBuilder: FormBuilder,
    private _authService: AuthService,
    private _notificationService: NotificationService,
    private _router: Router) { }

  ngOnInit(): void {
    this.loginForm = this._formBuilder.group({
      email: ['', Validators.compose([
        Validators.required,
        Validators.email
      ])],
      password: ['', Validators.compose([
        Validators.required,
      ])]
    })

    this.subscriptions$.add(
      this.loginForm.statusChanges.subscribe(status => {
        this.checkValidators()
      })
    )
  }

  get email() {
    return this.loginForm.get('email')
  }
  get password() {
    return this.loginForm.get('password')
  }

  checkValidators() {
    const errors = updateValidationErrors(this.loginForm)

    errors && this._notificationService.validation(errors)
  }

  login() {
    this.isLogin = true

    if (this.loginForm.valid) {
      this.subscriptions$.add(
        this._authService.loginDBJSON(this.loginForm.value).subscribe({
          next: token => {
            localStorage.setItem('token', JSON.stringify(token))
            this._router.navigate(['/home'])
          },
          error: error => {
            this._notificationService.error(error, true)
            this.isLogin = false
          },
          complete: () => {
            // console.log('Login attempt completed!')
            this.isLogin = false
          }
        })
      )
    }
  }

  ngOnDestroy(): void {
    this.subscriptions$.unsubscribe()
  }
}
