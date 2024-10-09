import { Component, inject, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { ModalService } from '@services/modal.service';
import { ModalYeahComponent } from '@components/modal-yeah/modal-yeah.component';
import { ModalInterface } from '@models/modal.model';
import { FirestoreService } from '@services/firestore.service';
import { AuthService } from '@services/auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss'
})
export class NavigationComponent implements OnInit {
  readonly dialog = inject(MatDialog)
  private breakpointObserver = inject(BreakpointObserver);
  user: string | null = null;

  constructor(
    private readonly _router: Router,
    private readonly _modalService: ModalService,
    private _fireStoreService: FirestoreService,
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
    const token = localStorage.getItem('token')

    if (token) {
      const { email } = JSON.parse(token)
      this.user = email
    }
  }

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.HandsetPortrait)
    .pipe(
      map(result => {
        return result.matches
      }
      ),
      shareReplay()
    );


  openLogoutDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this._modalService.openDialog<ModalYeahComponent, ModalInterface>(ModalYeahComponent, {
      cancelButtonLabel: 'No',
      confirmAction: () => this.logoutFirestore(),
      confirmButtonLabel: 'Yes',
      title: 'Logout',
      content: 'Are you sure to logout?',
    })
    // this.dialog.open(DialogComponent, {
    //   width: '250px',
    //   enterAnimationDuration,
    //   exitAnimationDuration
    // }).afterClosed().subscribe(value => {
    //   if (value) {
    //     this.logout()
    //   }
    // })
  }

  logout() {
    localStorage.removeItem('token')
    this._router.navigate(['auth/login'])
  }

  async logoutFirestore() {
    try {
      await this._fireStoreService.logout()
      this._router.navigate(['/auth/login'])
    } catch (error) {
      console.error(error)
    }

  }
}