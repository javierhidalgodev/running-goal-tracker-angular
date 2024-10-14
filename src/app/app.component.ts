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
    console.log(this._authService.currentUserSignal())
  }
}
