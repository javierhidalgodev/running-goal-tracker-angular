import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { InputValidators, NotificationService } from '../../../services/notification.service';
import { getValidationErrors } from '../../../utils/forms.utils';

@Component({
  selector: 'app-login-dbjson-form',
  templateUrl: './login-dbjson-form.component.html',
  styleUrl: './login-dbjson-form.component.scss'
})
export class LoginDbjsonFormComponent implements OnInit {

  loginForm: FormGroup = new FormGroup({})
  errorMessage: string | null = null
  successMessage: string | null = null
  validationErrors: InputValidators[] | null = null;

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

    this.loginForm.statusChanges.subscribe(status => {
      this.updateValidationErrors()
    })
  }

  get email() {
    return this.loginForm.get('email')
  }
  get password() {
    return this.loginForm.get('password')
  }

  updateValidationErrors(): void {
    this.validationErrors = getValidationErrors(this.loginForm)

    if (this.validationErrors) {
      this._notificationService.validation(this.validationErrors)
    }
  }

  login() {
    if (this.loginForm.valid) {
      this._authService.loginDBJSON(this.loginForm.value).subscribe({
        next: token => {
          localStorage.setItem('token', JSON.stringify(token))
          this._router.navigate(['/home'])
        },
        error: error => {
          this._notificationService.error(error)
        },
        complete: () => console.log('Login attempt completed!')
      })
    }
  }
}
