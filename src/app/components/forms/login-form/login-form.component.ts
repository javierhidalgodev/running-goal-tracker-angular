import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { AuthService } from '@services/auth.service';
import { Router } from '@angular/router';
import { NotificationService } from '@services/notification.service';
import { updateValidationErrors } from '@utils/goals.utils'
import { Subscription } from 'rxjs';
import { FirestoreService } from '@services/firestore.service';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss'
})
export class LoginFormComponent implements OnInit, OnDestroy {
  loginForm: FormGroup = new FormGroup({});
  isLogin: boolean = false;

  private subscriptions$: Subscription = new Subscription();

  constructor(
    private _formBuilder: FormBuilder,
    private _authService: AuthService,
    private _notificationService: NotificationService,
    private _router: Router,
    private _firestoreService: FirestoreService,
    private _auth: Auth,
  ) { }

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

    this.subscriptions$.add(
      this.loginForm.statusChanges.subscribe(status => {
        this.checkValidators()
      })
    )
  }

  get email() {
    return this.loginForm.get('email')
  }
  get password() {
    return this.loginForm.get('password')
  }

  checkValidators() {
    const errors = updateValidationErrors(this.loginForm)

    errors && this._notificationService.validation(errors)
  }

  async loginFirestore() {
    if (this.loginForm.valid) {
      try {
        const loginRes = await this._firestoreService.login(this.loginForm.value)
        console.log(loginRes)
        this._router.navigate(['/home'])
      } catch (error: any) {
        console.log(error)
        this._notificationService.error('Invalid login')
      }
    }
  }

  login() {
    this.isLogin = true

    if (this.loginForm.valid) {
      // this._firestoreService.login(this.loginForm.value)
      // this.subscriptions$.add(
      //   this._authService.loginDBJSON(this.loginForm.value).subscribe({
      //     next: token => {
      //       console.log(token)
      //       localStorage.setItem('token', JSON.stringify(token))
      //       this._router.navigate(['/home'])
      //     },
      //     error: error => {
      //       this._notificationService.error(error)
      //       this.isLogin = false
      //     },
      //     complete: () => {
      //       // console.log('Login attempt completed!')
      //       this.isLogin = false
      //     }
      //   })
      // )
    }
  }

  ngOnDestroy(): void {
    this.subscriptions$.unsubscribe()
  }
}
