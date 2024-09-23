import { Component, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MatDialog, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss'
})
export class NavigationComponent {
  readonly dialog = inject(MatDialog)
  private breakpointObserver = inject(BreakpointObserver);

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.HandsetPortrait)
    .pipe(
      map(result => {
        console.log(result.breakpoints)
        return result.matches
      } 
    ),
      shareReplay()
    );

  constructor(private _router: Router) { }

  openLogoutDialog (enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(DialogComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration
    }).afterClosed().subscribe(value => {
      if (value) {
        this.logout()
      }
    })
  }

  logout () {
    localStorage.removeItem('token')
    this._router.navigate(['auth/login'])
  }
}