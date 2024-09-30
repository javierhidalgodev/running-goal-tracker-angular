import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActiveModal, GoalWithExtraDetails } from '@models/goals.model';
import { GoalService } from '@services/goal.service';

@Component({
  selector: 'app-goal-detail',
  templateUrl: './goal-detail.component.html',
  styleUrl: './goal-detail.component.scss'
})
export class GoalDetailComponent {
  @Input() selectedGoal?: GoalWithExtraDetails;
  @Output() emitOpenModal = new EventEmitter()

  constructor (
    private _goalService: GoalService
  ) { }

  openModal(modalType: ActiveModal) {
    this.emitOpenModal.emit(modalType)
  }

  // ! Sacar de aquí y hacerlo con el modal. Esto es solo una prueba
  delete() {
    if(this.selectedGoal) {
      const confirmation = confirm('Hola amigos')

      if(confirmation) {
        console.log('holo')
        this._goalService.deleteGoal(this.selectedGoal.id).subscribe({
          next: value => console.log(value),
          error: error => console.error(error)
        })
      }
    }
  }
}
