import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {
  @Output() emitCloseEvent = new EventEmitter()
  // @Output() emitActivityAddedEvent = new EventEmitter<GoalActivity>()

  closeModal() {
    this.emitCloseEvent.emit()
  }
  
  // activityAdded(event: GoalActivity) {
  //   this.emitActivityAddedEvent.emit(event)
  // }
}
