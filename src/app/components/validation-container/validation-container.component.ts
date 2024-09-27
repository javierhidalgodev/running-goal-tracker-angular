import { Component, OnDestroy, OnInit } from '@angular/core';
import { NotificationService, ValidationMessages, ValidationMessagesWithExtras } from '@services/notification.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-validation-container',
  templateUrl: './validation-container.component.html',
  styleUrl: './validation-container.component.scss'
})
export class ValidationContainerComponent implements OnInit, OnDestroy {
  validationMessages: ValidationMessagesWithExtras | null = null
  private _notificationSubscription$: Subscription = new Subscription()

  constructor(
    private _notificationService: NotificationService) { }

  ngOnInit(): void {
    this._notificationSubscription$ =
    this._notificationService.validation$.subscribe({
      next: messages => {
        if (messages) {
          this.validationMessages = messages
        } else {
          this.validationMessages = null
        }
      }
    })
  }

  ngOnDestroy(): void {
    this._notificationSubscription$.unsubscribe()
  }
}
