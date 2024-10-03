import { Component, OnDestroy, OnInit } from '@angular/core';
import { NotificationMessage, NotificationService } from '@services/notification.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.scss'
})
export class NotificationComponent implements OnInit, OnDestroy {
  suscription$: Subscription;
  notificationMessage: NotificationMessage | null = null

  constructor (private _notificationService: NotificationService) { }

  ngOnInit(): void {
    this.suscription$ = this._notificationService.notification$.subscribe({
      next: notification => {
        if(notification) {
          this.notificationMessage = notification
          console.log(notification)
          if(notification.autoremove === true) {
            setTimeout(() => this._notificationService.clear(), 5000)
          }
        } else {
          this.notificationMessage = null
        }
      }
    })
  }

  ngOnDestroy(): void {
    this.suscription$.unsubscribe()
  }
}
