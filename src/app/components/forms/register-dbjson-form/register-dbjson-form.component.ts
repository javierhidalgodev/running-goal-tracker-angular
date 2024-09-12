import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-register-dbjson-form',
  templateUrl: './register-dbjson-form.component.html',
  styleUrl: './register-dbjson-form.component.scss'
})
export class RegisterDbjsonFormComponent implements OnInit {
  registerForm: FormGroup = new FormGroup({});
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(
    private _formBuilder: FormBuilder,
    private _authService: AuthService
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
          this.successMessage = 'User registered!'
  
          setTimeout(() => {
            this.successMessage = null
          }, 5000)
        },
        error: error => {
          console.log(error)
          this.errorMessage = error

          setTimeout(() => {
            this.errorMessage = null
          }, 5000)
        },
        complete: () => console.log('Register attempt completed!')
      })
    }
  }

  hasErrors() {
    return Object.keys(this.registerForm.controls).some(key => {
      const control = this.registerForm.get(key)
      return control?.invalid && control?.touched
    })
  }
}
