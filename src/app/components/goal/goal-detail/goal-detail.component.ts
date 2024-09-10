import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GoalWithExtraDetails } from '../../../models/goals.model';

@Component({
  selector: 'app-goal-detail',
  templateUrl: './goal-detail.component.html',
  styleUrl: './goal-detail.component.scss'
})
export class GoalDetailComponent {
  @Input() selectedGoal?: GoalWithExtraDetails;
  @Output() emitOpenModal = new EventEmitter()

  openModal() {
    this.emitOpenModal.emit()
  }
}
