import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { dateValidatorFn } from '@utils/goals.utils';
import { ActivatedRoute } from '@angular/router';
import { Goal, GoalActivity, GoalWithExtraDetails } from '@models/goals.model';
import { GoalService } from '@services/goal.service';
import { InputValidators, NotificationService } from '@services/notification.service';
import { getValidationErrors } from '@utils/forms.utils';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrl: './activity.component.scss'
})
export class ActivityComponent implements OnInit {
  @Input() selectedGoal?: GoalWithExtraDetails;
  @Output() emitAddActivity = new EventEmitter<Goal>()
  activityForm: FormGroup = new FormGroup([])
  validationErrors: InputValidators[] | null = null;
  isAdding: boolean = false;
  errorNotification?: string;

  constructor(
    private _formBuilder: FormBuilder,
    private _route: ActivatedRoute,
    private _goalService: GoalService,
    private _notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    // this.goalId = Number(this._route.snapshot.paramMap.get('id'))
    // this.goalId = this.selectedGoal.id

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

    this.activityForm.statusChanges.subscribe(status => this.updateValidationErrors())
  }

  updateValidationErrors(): void {
    this.validationErrors = getValidationErrors(this.activityForm)

    if (this.validationErrors) {
      this._notificationService.validation(this.validationErrors)
    }
  }

  addActivity() {
    if (this.selectedGoal) {
      this.isAdding = true
      const activityToAdd = this.activityForm.value

      this._goalService.addActivityToGoalDBJSON(this.selectedGoal.id, activityToAdd).subscribe({
        next: goal => {
          this.emitAddActivity.emit(goal)
        },
        error: error => {
          console.error(error)
          this.isAdding = false
          this._notificationService.error(error.message)
        },
        complete: () => {
          console.log('Activity addition process completed!')
          this.isAdding = false
          this.activityForm.reset()
        }
      })
    }
  }
}
