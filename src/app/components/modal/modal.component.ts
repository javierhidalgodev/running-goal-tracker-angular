import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {
  @Output() emitCloseEvent = new EventEmitter()

  closeModal() {
    this.emitCloseEvent.emit()
  }
}
