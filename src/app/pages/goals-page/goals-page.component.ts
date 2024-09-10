import { Component, OnInit } from '@angular/core';
import { GoalService } from '../../services/goal.service';
import { delay } from 'rxjs';
import { Goal } from '../../models/goals';

@Component({
  selector: 'app-goals-page',
  templateUrl: './goals-page.component.html',
  styleUrl: './goals-page.component.scss'
})
export class GoalsPageComponent implements OnInit {
  isLoading: boolean = true;
  errorMessage: string | null = null; 
  goals: Goal[] = [];

  constructor(private _goalsService: GoalService) { }

  ngOnInit(): void {
    // ! Hay que proveerle un ID, aquí damos uno de prueba
    this._goalsService.getGoals(101).pipe(
      delay(2000)
    ).subscribe({
      next: res => {
        // TODO Eliminar la simulación de retraso
          this.goals = res
          this.isLoading = false;
      },
      error: error => console.log(error),
      complete: () => console.log('Get goals attempt completed!')
    })
  }
}
