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

  delete(goal: Goal) {
    this.emitOpenDeleteModal.emit()
  }
}