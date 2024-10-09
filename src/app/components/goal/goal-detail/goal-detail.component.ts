import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ModalYeahComponent } from '@components/modal-yeah/modal-yeah.component';
import { Activity } from '@models/activity.model';
import { ActiveModal, Goal } from '@models/goals.model';
import { FirestoreService } from '@services/firestore.service';
import { GoalService } from '@services/goal.service';
import { ModalService } from '@services/modal.service';
import { NotificationService } from '@services/notification.service';

@Component({
  selector: 'app-goal-detail',
  templateUrl: './goal-detail.component.html',
  styleUrl: './goal-detail.component.scss'
})
export class GoalDetailComponent {
  @Input() selectedGoal: Goal;
  @Input() activities: Activity[];
  @Output() emitOpenModal = new EventEmitter()
  @Output() emitOpenDeleteModal = new EventEmitter()

  inProcess: boolean = false;

  constructor(
    // private _goalService: GoalService,
    // private _router: Router,
    // ! Quitar este servicio una vez esté externalizado el manejo del error
    // private _notificationService: NotificationService,
    private readonly _modalService: ModalService,
    private _firestoreService: FirestoreService,
  ) { }


  openModal(modalType: ActiveModal) {
    this.emitOpenModal.emit(modalType)
  }

  openDeleteModal() {
    this._modalService.openDialog(ModalYeahComponent, {
      cancelButtonLabel: 'No',
      confirmAction: () => this.delete(this.selectedGoal),
      confirmButtonLabel: 'Delete',
      title: 'Delete Goal',
      content: 'Are you sure to delete this goal?'
    })
  }

  async delete(goal: Goal) {
    this.inProcess = true

    // try {
    //   const res = await this._firestoreService.deleteGoal(goal)
    //   console.log(res)
    //   this.inProcess = false
    // } catch (error) {
    //   console.error(error)
    //   this.inProcess = false
    // }
  }

  // delete() {
  //   if (this.selectedGoal) {
  //     this.inProcess = true
  //     this._goalService.deleteGoal(this.selectedGoal.id)
  //       .subscribe({
  //         next: () => {
  //           this._router.navigate(['/goals'])
  //         },
  //         error: error => {
  //           this.inProcess = false
  //           this._notificationService.error('Something went wrong deleting goal. Please, try again later')
  //         },
  //         complete: () => {
  //           this.inProcess = false
  //         },
  //       })
  //   }
  // }

}