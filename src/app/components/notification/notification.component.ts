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
      next: message => {
        if(message) {
          console.log(message)
          
          this.notificationMessage = message
  
          setTimeout(() => this.notificationMessage = null, 5000)
        }
      }
    })
  }

  ngOnDestroy(): void {
    this.suscription$.unsubscribe()
  }
}
