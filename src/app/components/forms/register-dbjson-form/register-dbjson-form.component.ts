import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { InputValidators, NotificationService } from '../../../services/notification.service';
import { getValidationErrors } from '../../../utils/forms.utils';
import { Router } from '@angular/router';
import { isEqualFn } from '../../../utils/goals.utils';
import { HttpClient } from '@angular/common/http';
import { Observable, switchMap } from 'rxjs';
import { NewUser, User } from '../../../models/user.model';

@Component({
  selector: 'app-register-dbjson-form',
  templateUrl: './register-dbjson-form.component.html',
  styleUrl: './register-dbjson-form.component.scss'
})
export class RegisterDbjsonFormComponent implements OnInit {
  registerForm: FormGroup = new FormGroup({});
  validationErrors: InputValidators[] | null = null;
  isRegistering: boolean = false;

  selectedFile: File | null = null;
  imgURL: string | null = null

  constructor(
    private _formBuilder: FormBuilder,
    private _authService: AuthService,
    private _notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    this.registerForm = this._formBuilder.group({
      username: ['', Validators.compose([
        Validators.required,
        Validators.minLength(5),
        Validators.pattern('[a-zA-Z ]{1,}')
      ])],
      email: ['', Validators.compose([
        Validators.required,
        Validators.email
      ])],
      password: ['', Validators.compose([
        Validators.required,
        Validators.minLength(5),
        Validators.pattern('[a-zA-Z0-9]{1,}')
      ])],
      confirmPassword: ['', Validators.required,]
    }, { validators: isEqualFn() })

    this.registerForm.statusChanges.subscribe(status => {
      this.updateValidationErrors()
    })
  }

  get email() {
    return this.registerForm.get('email')
  }
  get password() {
    return this.registerForm.get('password')
  }
  get confirmPassword() {
    return this.registerForm.get('confirmPassword')
  }

  updateValidationErrors(): void {
    this.validationErrors = getValidationErrors(this.registerForm)

    if (this.registerForm.errors) {
      const formErrors = Object.keys(this.registerForm.errors).map(error => {
        return {
          key: 'form',
          validators: this.registerForm.errors
        }
      }) as InputValidators[]

      this.validationErrors = [
        ...this.validationErrors,
        ...formErrors
      ] as InputValidators[]
    }

    if (this.validationErrors) {
      this._notificationService.validation(this.validationErrors)
    }
  }

  register() {
    this.isRegistering = true

    if (this.registerForm.valid) {
      const { confirmPassword, ...userData } = this.registerForm.value

      // TODO: Deberíamos pasar la imagen más adelante
      this._authService.registerDBJSON(userData).subscribe({
        next: value => {
          console.log(value)
        },
        error: error => {
          this.isRegistering = false
          this._notificationService.error(error.message)
        },
        complete: () => {
          this.isRegistering = false
          this._notificationService.success('User registered!')
          console.log('Registration complete')
          this.registerForm.reset()
          Object.keys(this.registerForm.controls).forEach(control => this.registerForm.get(control)?.setErrors(null))
        }
      })
    }
  }

  onFileSelected(event: Event) {
    const file = event.target as HTMLInputElement

    if (file && file.files) {
      console.log(file.files[0])
      this.selectedFile = file.files[0]
    }
  }
}
