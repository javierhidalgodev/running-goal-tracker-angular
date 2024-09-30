import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ActiveModal, GoalWithExtraDetails } from '@models/goals.model';
import { GoalService } from '@services/goal.service';
import { NotificationService } from '@services/notification.service';

@Component({
  selector: 'app-goal-detail',
  templateUrl: './goal-detail.component.html',
  styleUrl: './goal-detail.component.scss'
})
export class GoalDetailComponent {
  @Input() selectedGoal?: GoalWithExtraDetails;
  @Output() emitOpenModal = new EventEmitter()
  @Output() emitOpenDeleteModal = new EventEmitter()

  isDeleting: boolean = false;

  constructor (
    private _goalService: GoalService,
    private _router: Router,
    // ! Quitar este servicio una vez esté externalizado el manejo del error
    private _notificationService: NotificationService,
  ) { }

  openModal(modalType: ActiveModal) {
    this.emitOpenModal.emit(modalType)
  }

  onClickConfirmModal() {
    this.emitOpenDeleteModal.emit()
  }

  // ! Sacar de aquí y hacerlo con el modal. Esto es solo una prueba
  // delete() {
  //   if(this.selectedGoal) {
  //     const confirmation = confirm('Are you sure to delete this goal?')

  //     if(confirmation) {
  //       this.isDeleting = true
  //       this._goalService.deleteGoal(this.selectedGoal.id).subscribe({
  //         next: value => {
  //           console.log(value)
  //           this._router.navigate(['/goals'])
  //         },
  //         error: error => {
  //           console.error(error)
  //           this.isDeleting = false
  //           this._notificationService.error('Something went wrong deleting goal. Please, try again later.')
  //         },
  //         complete: () => {
  //           this.isDeleting = false
  //         }
  //       })
  //     }
  //   }
  // }
}
