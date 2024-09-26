import { Component, OnInit } from '@angular/core';
import { NotificationService, ValidationMessages, ValidationMessagesWithExtras } from '@services/notification.service';

@Component({
  selector: 'app-validation-container',
  templateUrl: './validation-container.component.html',
  styleUrl: './validation-container.component.scss'
})
export class ValidationContainerComponent implements OnInit {
  validationMessages: ValidationMessagesWithExtras | null = null

  constructor(
    private _notificationService: NotificationService) { }

  ngOnInit(): void {
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
}
