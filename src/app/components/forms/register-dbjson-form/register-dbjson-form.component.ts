import { ChangeDetectorRef, Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { InputValidators, NotificationService } from '../../../services/notification.service';

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
    private _cdRef: ChangeDetectorRef
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
  }

  get email() {
    return this.registerForm.get('email')
  }
  get password() {
    return this.registerForm.get('password')
  }

  getValidationErrors () {
    const errors = Object
      .keys(this.registerForm.controls)
      .filter(key => {
        return this.registerForm.get(key)?.errors && this.registerForm.get(key)?.touched
      })
      .map(control => {
        return {
          key: control,
          validators: this.registerForm.get(control)?.errors
        }
      }) as InputValidators[]

    this.validationErrors = errors
    console.log(errors)
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
}
