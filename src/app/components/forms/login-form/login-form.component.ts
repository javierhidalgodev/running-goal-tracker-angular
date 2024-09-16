import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss'
})
export class LoginFormComponent implements OnInit {

  loginForm: FormGroup = new FormGroup({})
  errorMessage: string | null = null

  constructor(
    private _formBuilder: FormBuilder,
    private _authService: AuthService,
    private _router: Router) { }

  ngOnInit(): void {
    this.loginForm = this._formBuilder.group({
      username: ['', Validators.compose([
        Validators.required,
        Validators.email
      ])],
      password: ['', Validators.compose([
        Validators.required,
        Validators.minLength(5)
      ])]
    })

    this.loginForm.valueChanges.subscribe(status => {
      console.log(status);
    })
  }

  get username() {
    return this.loginForm.get('username')
  }
  get password() {
    return this.loginForm.get('password')
  }

  login() {
    if (this.loginForm.valid) {
      this._authService.login(this.username?.value, this.password?.value).subscribe({
        next: value => {
          console.log('Login successful. Welcome', this.username?.value)
          localStorage.setItem('token', value.token)
          this._router.navigate([''])
        },
        error: error => {
          console.log('Login failed: ', error);
          if(error) {
            this.errorMessage = 'Wrong credentials.'
          } else {
            this.errorMessage = 'Something went wrong during login process. Please, try again later.'
          }

          setTimeout(() => {
            this.errorMessage = null;
          }, 5000)
        },
        complete: () => console.log('Login attempt completed!')
      })
    }
  }
}
