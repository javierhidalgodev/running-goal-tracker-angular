import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { mockGoals } from '../mocks/goals.mock';
import { Goal, GoalActivity, NewGoal } from '../models/goals.model';
import { DbService } from './db.service';
import { HttpClient } from '@angular/common/http';

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
  createGoal(newGoal: NewGoal): Observable<any> {
    console.log('Goal created');

    return of(newGoal)
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

  addActivityToGoal(goalId: string, activity: GoalActivity): Observable<GoalActivity | null> {
    const goal = this.goals.find(g => g.id === goalId)

    if(goal) {
      return of(activity)
    }

    return of(null)
  }

  // addActivityToGoal() {
  //   // ? Aquí debería de ir una llamada al BACKEND, cómo recuperamos directamente de JSONSERVER los datos, y no pasamos por el BACK, vamos a simular al menos la verificación del token, para poder realizar la operación que debería realizarse: comprobación del token/validez => recuperar la entrada => operar sobre la entrada => devolver resultado/error

  //   const token = localStorage.getItem('token')

  //   if(!token) {
  //     console.log('tus putas ganas')
  //   }

  //   const decodedToken = JSON.parse(token!)

  //   let res = this._http.get('http://localhost:3000/check_token', {
  //     headers: {
  //       "Authorization": `Bearer ${decodedToken.token}`
  //     }
  //   })

  //   console.log(res)
  // }
}
