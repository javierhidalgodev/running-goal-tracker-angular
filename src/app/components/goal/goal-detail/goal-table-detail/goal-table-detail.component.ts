import { Component, Input, OnInit } from '@angular/core';
import { GoalWithExtraDetails } from '@models/goals.model';

@Component({
  selector: 'app-goal-table-detail',
  templateUrl: './goal-table-detail.component.html',
  styleUrl: './goal-table-detail.component.scss'
})
export class GoalTableDetailComponent implements OnInit {
  @Input() selectedGoal?: GoalWithExtraDetails;

  errorMessage?: string;

  ngOnInit(): void {
    if(!this.selectedGoal) {
      console.error('Not valid goal!')
      this.errorMessage = 'Something went wrong. Please, try again later.'
    }
  }
}
