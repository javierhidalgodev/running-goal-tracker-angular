import { Component } from '@angular/core';
import { NewGoal } from '../../models/goals.model';
import { GoalService } from '../../services/goal.service';

@Component({
  selector: 'app-new-goal-page',
  templateUrl: './new-goal-page.component.html',
  styleUrl: './new-goal-page.component.scss'
})
export class NewGoalPageComponent {
  successMessage: string | null = null;

  constructor(private _http: GoalService) { }

  goalAdded() {
    this.successMessage = 'Goal added';
    setTimeout(() => { this.successMessage = null }, 5000)
  }
  // addGoal(newGoal: NewGoal) {
  //   this._http.createGoal(newGoal).subscribe({
  //     next: goal => {
  //       console.log('Goal created: ', goal),

  //       this.successMessage = 'Goal added';
  //       // setTimeout(() => { this.successMessage = null }, 5000)
  //     },
  //     error: error => console.log('Error: ', error),
  //     complete: () => console.log('Create goal attempt finished')
  //   })
  // }
}
