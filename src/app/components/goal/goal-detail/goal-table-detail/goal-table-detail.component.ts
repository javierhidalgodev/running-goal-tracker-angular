import { Component, Input, OnInit } from '@angular/core';
import { Activity } from '@models/activity.model';

@Component({
  selector: 'app-goal-table-detail',
  templateUrl: './goal-table-detail.component.html',
  styleUrl: './goal-table-detail.component.scss'
})
export class GoalTableDetailComponent implements OnInit {
  @Input() activities: Activity[];

  errorMessage: string | null = null;

  ngOnInit(): void {
    if(!this.activities) {
      console.error('Not valid goal!')
      this.errorMessage = 'Something went wrong. Please, try again later.'
    }
  }
}
