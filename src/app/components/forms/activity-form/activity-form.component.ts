import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { dateValidatorFn } from '@utils/goals.utils';
import { Goal, GoalWithExtraDetails } from '@models/goals.model';
import { GoalService } from '@services/goal.service';
import { InputValidators, NotificationService } from '@services/notification.service';
import { getValidationErrors } from '@utils/forms.utils';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-activity-form',
  templateUrl: './activity-form.component.html',
  styleUrl: './activity-form.component.scss'
})
export class ActivityFormComponent implements OnInit, OnDestroy {
  @Input() selectedGoal: GoalWithExtraDetails | Goal;
  @Output() emitAddActivity = new EventEmitter<Goal>()

  activityForm: FormGroup = new FormGroup([])
  validationErrors: InputValidators[] | null = null;
  isAdding: boolean = false;
  errorNotification: string | null;

  private _subscriptions$: Subscription = new Subscription();

  constructor(
    private _formBuilder: FormBuilder,
    private _goalService: GoalService,
    private _notificationService: NotificationService
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

  addActivity() {
    // if (this.selectedGoal) {
    this.isAdding = true
    // const activityToAdd = this.activityForm.value

    this._subscriptions$.add(
      this._goalService.addActivityToGoalDBJSON(this.selectedGoal.id, this.activityForm).subscribe({
        next: goal => {
          // console.log(goal)
          this.emitAddActivity.emit(goal)
        },
        error: error => {
          // console.error(error)
          this.isAdding = false
          this._notificationService.error('Something went wrong', true)
        },
        complete: () => {
          this.isAdding = false
          this.activityForm.reset()
        }
      }))
    // }
  }

  ngOnDestroy(): void {
    this._subscriptions$.unsubscribe()
  }
}
