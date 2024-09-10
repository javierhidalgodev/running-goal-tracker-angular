import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { mockGoals } from '../mocks/goals.mock';
import { Goal, GoalActivity, NewGoal } from '../models/goals';

@Injectable({
  providedIn: 'root'
})
export class GoalService {

  private goals = mockGoals;

  constructor() { }

  /**
   * 
   * @param goal Objetivo recibido del formulario
   * @returns Retornamos un observable a partir del objetivo recibido, para poder visualizarlo en la interfaz
   */
  createGoal(newGoal: NewGoal): Observable<any> {
    console.log('Goal created');

    return of(newGoal)
  }

  /**
   * 
   * @param userId ID del usuario para poder filtrar los goals correspondientes
   * @returns Un observable de Goals
   */
  getGoals(userId: number): Observable<Goal[]> {
    const filteredGoals = this.goals.filter((g: Goal) => g.userId === userId)
    return of(filteredGoals)
  }

  getGoalById(goalId: number): Observable<Goal | null> {
    const selectedGoal = this.goals.find(g => g.id === goalId)

    if(selectedGoal) {
      return of(selectedGoal)
    }

    return throwError(() => new Error('Goal not found!'))
  }

  addActivityToGoal(goalId: number, activity: GoalActivity): Observable<GoalActivity | null> {
    const goal = this.goals.find(g => g.id === goalId)

    if(goal) {
      return of(activity)
    }

    return of(null)
  }
}
