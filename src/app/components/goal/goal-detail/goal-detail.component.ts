import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Goal } from '../../../services/goal.service';
import { calculateGoalTotal, calculateProgress } from '../../../utils/utils';
import { GoalWithExtraDetails } from '../../../models/goals';

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
