import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Goal } from '../../../services/goal.service';
import { calculateGoalTotal, calculateProgress } from '../../../utils/utils';

@Component({
  selector: 'app-goal-detail',
  templateUrl: './goal-detail.component.html',
  styleUrl: './goal-detail.component.scss'
})
export class GoalDetailComponent implements OnInit, OnChanges {
  @Input() selectedGoal?: Goal;
  @Output() emitComplete = new EventEmitter()
  @Output() emitOpenModal = new EventEmitter()

  goalTotal: number = 0;
  goalProgress: number = 0;

  ngOnInit(): void {
    this.updateProgressAndTotal()
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedGoal'] && this.selectedGoal) {
      this.updateProgressAndTotal()
    }
  }

  openModal() {
    this.emitOpenModal.emit()
  }

  private updateProgressAndTotal() {
    if (this.selectedGoal) {
      this.goalTotal = calculateGoalTotal(this.selectedGoal)
      this.goalProgress = calculateProgress(this.goalTotal, this.selectedGoal)

      if(this.goalTotal >= this.selectedGoal.km) {
        console.log('COMPLETADO BRO!');
        // this.emitComplete.emit()
      }
    }
  }
}
