import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { dateValidatorFn } from '../../../utils/utils';
import { ActivatedRoute } from '@angular/router';
import { Goal, GoalActivity, GoalWithExtraDetails } from '../../../models/goals.model';
import { GoalService } from '../../../services/goal.service';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrl: './activity.component.scss'
})
export class ActivityComponent implements OnInit {
  @Input() selectedGoal?: GoalWithExtraDetails;
  @Output() emitAddActivity = new EventEmitter<Goal>()
  activityForm: FormGroup = new FormGroup([])

  constructor(
    private _formBuilder: FormBuilder,
    private _route: ActivatedRoute,
    private _goalService: GoalService) { }

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
  }

  addActivity() {
    if(this.selectedGoal) {
      const activityToAdd = this.activityForm.value

      this._goalService.addActivityToGoalDBJSON(this.selectedGoal.id, activityToAdd).subscribe({
        next: goal => {
          this.emitAddActivity.emit(goal)
        },
        error: error => console.log('Something went wrong!'),
        complete: () => console.log('Add activity to goal attempt completed!')
      })
    }

    this.activityForm.reset()
  }
}
