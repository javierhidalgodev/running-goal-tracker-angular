import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@services/auth.service';
import { FirestoreService } from '@services/firestore.service';
import { InputValidators, NotificationService } from '@services/notification.service';
import { getValidationErrors } from '@utils/forms.utils';
import { isEqualFn } from '@utils/goals.utils';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.scss'
})
export class RegisterFormComponent implements OnInit, OnDestroy {
  registerForm: FormGroup = new FormGroup({});
  validationErrors: InputValidators[] | null = null;
  isRegistering: boolean = false;

  selectedFile: File | null = null;
  imgURL: string | null = null

  private subscriptions$: Subscription = new Subscription()

  constructor(
    private _formBuilder: FormBuilder,
    private _authService: AuthService,
    private _notificationService: NotificationService,
    private _firestoreService: FirestoreService,
    private _router: Router,
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

    this.subscriptions$.add(
      this.registerForm.statusChanges.subscribe(status => {
        this.updateValidationErrors()
      })
    )
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

  async registerFirestore() {
    this.isRegistering = true

    if (this.registerForm.valid) {
      const { confirmPassword, ...userData } = this.registerForm.value

      try {
        const res = await this._firestoreService.register(userData)
        this._notificationService.success('Use registered successfully!')
        setTimeout(() => {
          this._router.navigate(['/auth/login'])
        }, 5000)
      } catch (error) {
        console.log(error)
      }
    }
  }

  register() {
    this.isRegistering = true

    if (this.registerForm.valid) {
      const { confirmPassword, ...userData } = this.registerForm.value

      // TODO: Deberíamos pasar la imagen más adelante
      this.subscriptions$.add(
        this._authService.registerDBJSON(userData).subscribe({
          // next: value => console.log(value),
          error: error => {
            this.isRegistering = false
            this._notificationService.error(error.message)
          },
          complete: () => {
            this.isRegistering = false
            this._notificationService.success('User registered!')
            this.registerForm.reset()
            Object.keys(this.registerForm.controls).forEach(control => this.registerForm.get(control)?.setErrors(null))
          }
        })
      )
    }
  }

  onFileSelected(event: Event) {
    const file = event.target as HTMLInputElement

    if (file && file.files) {
      console.log(file.files[0])
      this.selectedFile = file.files[0]
    }
  }

  ngOnDestroy(): void {
    this.subscriptions$.unsubscribe()
  }
}
