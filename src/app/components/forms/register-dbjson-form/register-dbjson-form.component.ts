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
  errorMessage: string | null = null;

  constructor(private _formBuilder: FormBuilder, private _authService: AuthService) { }

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

  getControl (controlName: string) {
    return this.registerForm.get(controlName)
  }

  register() {
    if (this.registerForm.valid) {
      // this._authService.registerDBJSON({
      //   email: this.getControl('email')?.value,
      //   password: this.getControl('password')?.value
      // }
      // ).subscribe({
      //   next: value => console.log(value),
      //   error: error => {
      //     console.log(`Registration failed: `, error);
      //     this.errorMessage = `Something went wrong during registration process. Please, try again later.`
      //   },
      //   complete: () => console.log('Registration attempt completed!')
      // })
    }
  }
}
