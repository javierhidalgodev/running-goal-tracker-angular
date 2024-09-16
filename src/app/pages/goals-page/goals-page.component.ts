import { Component, OnInit } from '@angular/core';
import { GoalService } from '../../services/goal.service';
import { delay } from 'rxjs';
import { Goal } from '../../models/goals.model';

@Component({
  selector: 'app-goals-page',
  templateUrl: './goals-page.component.html',
  styleUrl: './goals-page.component.scss'
})
export class GoalsPageComponent implements OnInit {
  isLoading: boolean = true;
  errorMessage: string | null = null; 
  goals: Goal[] | null = null;

  constructor(private _goalsService: GoalService) { }

  ngOnInit(): void {
    const userId = localStorage.getItem('userId')
    console.log(userId)
    if (userId) {
      this._goalsService.getGoals(userId).subscribe({
        next: res => {
            this.goals = res
            this.isLoading = false;
        },
        error: error => {
          this.isLoading = false
          this.errorMessage = error
        },
        complete: () => console.log('Get goals attempt completed!')
      })
    } else {
      this.isLoading = false
      this.errorMessage = 'Connection error'
    }
  }
}
