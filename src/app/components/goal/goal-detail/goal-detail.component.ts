import { Component, EventEmitter, Input, Output, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivityFormComponent } from '@components/forms/activity-form/activity-form.component';
import { ModalYeahComponent } from '@components/modal-yeah/modal-yeah.component';
import { Activity } from '@models/activity.model';
import { ActiveModal, Goal, GoalWithExtraDetails } from '@models/goals.model';
import { GoalService } from '@services/goal.service';
import { ModalService } from '@services/modal.service';
import { NotificationService } from '@services/notification.service';
import { dateValidatorFn } from '@utils/goals.utils';

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
    private _goalService: GoalService,
    private _router: Router,
    // ! Quitar este servicio una vez esté externalizado el manejo del error
    private _notificationService: NotificationService,
    private readonly _modalService: ModalService,
  ) { }


  openModal(modalType: ActiveModal) {
    this.emitOpenModal.emit(modalType)
  }

  openDeleteModal() {
    this._modalService.openDialog(ModalYeahComponent, {
      cancelButtonLabel: 'No',
      confirmAction: () => this.delete(),
      confirmButtonLabel: 'Delete',
      title: 'Delete Goal',
      content: 'Are you sure to delete this goal?'
    })
  }

  delete() {
    if (this.selectedGoal) {
      this.inProcess = true
      this._goalService.deleteGoal(this.selectedGoal.id)
        .subscribe({
          next: () => {
            this._router.navigate(['/goals'])
          },
          error: error => {
            this.inProcess = false
            this._notificationService.error('Something went wrong deleting goal. Please, try again later')
          },
          complete: () => {
            this.inProcess = false
          },
        })
    }
  }
}
