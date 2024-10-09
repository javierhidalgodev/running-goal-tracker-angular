import { Component } from '@angular/core';
import { AuthService } from '@services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'running-goals';

  constructor(
    private _authService: AuthService
  ) { }

  ngOnInit(): void {
    this._authService.user$.subscribe(authInstance => {
      if(authInstance.currentUser) {
        this._authService.currentUserSignal.set({
          email: authInstance.currentUser.email!
        })
      } else {
        this._authService.currentUserSignal.set(null)
      }

      console.log(this._authService.currentUserSignal())
    })
  }
}
