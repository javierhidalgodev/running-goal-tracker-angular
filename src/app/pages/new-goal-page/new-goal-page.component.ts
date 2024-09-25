import { Component } from '@angular/core';

export type Notification = {
  type: 'success' | 'error',
  message: string
}

@Component({
  selector: 'app-new-goal-page',
  templateUrl: './new-goal-page.component.html',
  styleUrl: './new-goal-page.component.scss'
})
export class NewGoalPageComponent {
  successMessage: string | null = null;
  errorMessage: string | null = null;

  /**
   * Esta función se llama desde el hijo, cuando el objetivo
   * ha sido grabado y emite el evento para poder mostrar
   * el mensaje de éxito.
   */
  goalAdded(event: Notification) {
    if (event.type === 'success') {
      this.successMessage = event.message;
      setTimeout(() => { this.successMessage = null }, 5000)
    }

    if (event.type === 'error') {
      this.errorMessage = event.message;
      setTimeout(() => { this.errorMessage = null }, 5000)
    }
  }
}
