import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { dateValidatorFn } from '@utils/goals.utils';
import { Goal, GoalWithExtraDetails } from '@models/goals.model';
import { GoalService } from '@services/goal.service';
import { InputValidators, NotificationService } from '@services/notification.service';
import { getValidationErrors } from '@utils/forms.utils';
import { Observable, Subscription } from 'rxjs';
import { FirestoreService } from '@services/firestore.service';
import { Activity } from '@models/activity.model';

@Component({
  selector: 'app-activity-form',
  templateUrl: './activity-form.component.html',
  styleUrl: './activity-form.component.scss'
})
export class ActivityFormComponent implements OnInit, OnDestroy {
  @Input() selectedGoal: GoalWithExtraDetails | Goal;
  @Input() goalId: string;
  @Output() emitAddActivity = new EventEmitter()

  activityForm: FormGroup = new FormGroup([])
  validationErrors: InputValidators[] | null = null;
  isAdding: boolean = false;
  errorNotification: string | null;

  private _subscriptions$: Subscription = new Subscription();

  constructor(
    private _formBuilder: FormBuilder,
    private _goalService: GoalService,
    private _notificationService: NotificationService,
    private _firestoreService: FirestoreService,
  ) { }

  ngOnInit(): void {
    this.activityForm = this._formBuilder.group({
      km: ['', Validators.compose([
        Validators.required,
        Validators.min(1)
      ])],
      date: ['', Validators.compose([
        Validators.required,
        dateValidatorFn()
      ])]
    })

    this._subscriptions$.add(this.activityForm.statusChanges.subscribe(() => this.updateValidationErrors()))
  }

  updateValidationErrors(): void {
    this.validationErrors = getValidationErrors(this.activityForm)

    if (this.validationErrors) {
      this._notificationService.validation(this.validationErrors)
    }
  }

  async addActivity() {
    this.isAdding = true

    const newActivity = {
      ...this.activityForm.value,
      added: new Date(),
      goalId: this.goalId
    }

    try {
      const res = await this._firestoreService.addActivity(newActivity)
      console.log(res)
      this.emitAddActivity.emit()
    } catch (error) {
      console.log(error)
      this._notificationService.error('todo mal tú')
    }

    this.isAdding = false
    // if (this.selectedGoal) {
    // this.isAdding = true
    // const activityToAdd = this.activityForm.value

    // this._subscriptions$.add(
    // this._goalService.addActivityToGoalDBJSON(this.selectedGoal.id, this.activityForm).subscribe({
    // next: goal => {
    // console.log(goal)
    // this.emitAddActivity.emit(goal)
    // },
    // error: error => {
    // console.error(error)
    // this.isAdding = false
    // this._notificationService.error('Something went wrong')
    // },
    // complete: () => {
    // this.isAdding = false
    // this.activityForm.reset()
    // }
    // }))
    // }
  }

  ngOnDestroy(): void {
    this._subscriptions$.unsubscribe()
  }
}
