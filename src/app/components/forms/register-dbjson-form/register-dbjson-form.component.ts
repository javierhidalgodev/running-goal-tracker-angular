import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { InputValidators, NotificationService } from '../../../services/notification.service';
import { getValidationErrors } from '../../../utils/forms.utils';
import { Router } from '@angular/router';
import { isEqualFn } from '../../../utils/utils';
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
  successMessage: string | null = null;
  errorMessage: string | null = null;
  validationErrors: InputValidators[] | null = null;
  isRegistering: boolean = false;

  selectedFile: File | null = null;
  imgURL: string | null = null

  constructor(
    private _formBuilder: FormBuilder,
    private _authService: AuthService,
    private _notificationService: NotificationService,
    private _router: Router,
    private _http: HttpClient
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
      const newUserData: NewUser = {
        email: this.registerForm.get('email')?.value,
        password: this.registerForm.get('password')?.value,
        username: this.registerForm.get('username')?.value,
      }

      this._authService.registerDBJSON(newUserData, this.selectedFile).subscribe(value => console.log(value))

      this.isRegistering = false
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
