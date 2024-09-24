import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { mockGoals } from '../mocks/goals.mock';
import { Goal, GoalActivity } from '../models/goals.model';
import { DbService } from './db.service';
import { HttpClient } from '@angular/common/http';
import { FormGroup } from '@angular/forms';

const DEFAULT_IMAGE = 'https://www.kieferusa.com/wp-content/uploads/2015/08/winner_products-200x200.jpg'

@Injectable({
  providedIn: 'root'
})
export class GoalService {

  private goals = mockGoals;

  constructor(
    private _dbService: DbService,
    private _http: HttpClient
  ) { }

  /**
   * 
   * @param goal Objetivo recibido del formulario
   * @returns Retornamos un observable a partir del objetivo recibido, para poder visualizarlo en la interfaz
   */
  createGoal(goalFormData: FormGroup): Observable<Goal> {
    const token = localStorage.getItem('token')

    if(token) {
      const { userId } = JSON.parse(token)
      const newGoal: Goal = {
        ...goalFormData.value,
        image: goalFormData.get('image') || DEFAULT_IMAGE,
        activities: [],
        completed: false,
        userId
      }
      return this._dbService.addNewGoal(newGoal)
    }

    return throwError(() => new Error('Something went wrong during token verification'))
  }

  /**
   * 
   * @param userId ID del usuario para poder filtrar los goals correspondientes
   * @returns Un observable de Goals
   */
  getGoals(userId: string): Observable<Goal[] | null> {
    return this._dbService.getGoals(userId)
  }

  // getGoalById(goalId: string): Observable<Goal | null> {
  //   const selectedGoal = this.goals.find(goal => goal.id === goalId)

  //   if(selectedGoal) {
  //     return of(selectedGoal)
  //   //   return of(selectedGoal)
  //   }

  //   return throwError(() => new Error('Goal not found!'))
  // }

  getGoalById(goalId: string): Observable<Goal | null> {
    return this._dbService.getGoalById(goalId)
  }

  addActivityToGoalDBJSON(goalId: string, activity: GoalActivity) {
    return this._dbService.addActivityToGoal(goalId, activity)
  }

  addActivityToGoal(goalId: string, activity: GoalActivity): Observable<GoalActivity | null> {
    const goal = this.goals.find(g => g.id === goalId)

    if (goal) {
      return of(activity)
    }

    return of(null)
  }
}
