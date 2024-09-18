import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { InputValidators, NotificationService } from '../../../services/notification.service';
import { getValidationErrors } from '../../../utils/forms.utils';
import { Router } from '@angular/router';

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

  constructor(
    private _formBuilder: FormBuilder,
    private _authService: AuthService,
    private _notificationService: NotificationService,
    private _router: Router
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
      this.updateValidationErrors()
    })
  }

  get email() {
    return this.registerForm.get('email')
  }
  get password() {
    return this.registerForm.get('password')
  }

  updateValidationErrors(): void {
    this.validationErrors = getValidationErrors(this.registerForm)

    if (this.validationErrors) {
      this._notificationService.validation(this.validationErrors)
    }
  }

  register() {
    if (this.registerForm.valid) {
      this._authService.registerDBJSON(this.registerForm.value).subscribe({
        next: value => {
          this._notificationService.success('User registered!')
          setTimeout(() => this._router.navigate(['/auth/login']), 5500)
        },
        error: error => {
          this._notificationService.error(error)
        },
        complete: () => console.log('Register attempt completed!')
      })
    }
  }
}
