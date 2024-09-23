import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { dateValidatorFn } from '../../../utils/utils';
import { ActivatedRoute } from '@angular/router';
import { GoalActivity, GoalWithExtraDetails } from '../../../models/goals.model';
import { GoalService } from '../../../services/goal.service';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrl: './activity.component.scss'
})
export class ActivityComponent implements OnInit {
  @Input() selectedGoal?: GoalWithExtraDetails;
  @Output() emitAddActivity = new EventEmitter<GoalActivity>()
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

      this._goalService.addActivityToGoalDBJSON(this.selectedGoal.id, activityToAdd)
      // this._goalService.addActivityToGoal(this.selectedGoal.id, this.activityForm.value).subscribe({
      //   next: value => {
      //     this.emitAddActivity.emit(this.activityForm.value)
      //   },
      //   error: error => console.log('Something went wrong!'),
      //   complete: () => console.log('Add activity to goal attempt completed!')
      // })
    }

    this.activityForm.reset()
  }
}
