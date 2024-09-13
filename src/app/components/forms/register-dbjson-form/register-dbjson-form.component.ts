import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { NotificationService } from '../../../services/notification.service';

@Component({
  selector: 'app-register-dbjson-form',
  templateUrl: './register-dbjson-form.component.html',
  styleUrl: './register-dbjson-form.component.scss'
})
export class RegisterDbjsonFormComponent implements OnInit {
  registerForm: FormGroup = new FormGroup({});
  successMessage: string | null = null;
  errorMessage: string | null = null;
  hasFormErrors: boolean = false;

  constructor(
    private _formBuilder: FormBuilder,
    private _authService: AuthService,
    private _notificationService: NotificationService,
  ) { }

  ngOnInit(): void {
    this.registerForm = this._formBuilder.group({
      email: ['', Validators.compose([
        Validators.required,
        Validators.email
      ])],
      password: ['', Validators.compose([
        Validators.required,
        Validators.minLength(5),
        Validators.pattern('[a-zA-Z0-9]{1,}')
      ])]
    })

    this.registerForm.statusChanges.subscribe(status => {
      this.hasFormErrors = this.registerForm.invalid
    })
  }

  // get email() {
  //   return this.registerForm.get('email')
  // }
  // get password() {
  //   return this.registerForm.get('password')
  // }

  getControl(controlName: string) {
    return this.registerForm.get(controlName)
  }

  register() {
    if (this.registerForm.valid) {
      this._authService.registerDBJSON(this.registerForm.value).subscribe({
        next: value => {
          this._notificationService.success('User registered!')
        },
        error: error => {
          this._notificationService.error(error)
        },
        complete: () => console.log('Register attempt completed!')
      })
    }
  }

  getValidationErrors() {
    console.log('me ejecuto')
    // * Si entra aquí es porque el formulario ha sido tocado y es inválido (tiene errores)
    const errors = Object.keys(this.registerForm.controls)
      .filter(key => this.registerForm.get(key)?.errors && this.registerForm.get(key)?.touched)
      .map(key => {
        return {
          key,
          validators: this.registerForm.get(key)?.errors
        }
      })

    if (errors.length > 0) {
      console.log(errors)
      this._notificationService.validation(errors)
    }
  }

  hasErrors(): boolean {
    if (this.registerForm.invalid && this.registerForm.touched) {
      this.getValidationErrors()
      return true
    }
    
    return false
  }
}
