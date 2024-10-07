import { Injectable } from '@angular/core';
import { catchError, Observable, of, switchMap, throwError } from 'rxjs';
// import { mockGoals } from '@mocks/goals.mock';
import { Goal, GoalActivity, NewGoal } from '@models/goals.model';
import { DbService } from './db.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Activity, NewActivity } from '@models/activity.model';
import { AuthService } from './auth.service';

const DEFAULT_IMAGE = 'https://www.kieferusa.com/wp-content/uploads/2015/08/winner_products-200x200.jpg'

@Injectable({
  providedIn: 'root'
})
export class GoalService {

  // private goals = mockGoals;

  constructor(
    private _dbService: DbService,
    private _http: HttpClient,
    private _router: Router,
    private _authService: AuthService,
  ) { }

  /**
   * Método del servicio de objetivos que crea el nuevo objetivo y lo envía a la base de datos para que sea guardado.
   * 
   * 1. Verifica la existencia y validez del token.
   * 2. Crea, a partir del objeto que viene por parámetro, el nuevo objetivo. La imagen se inicializa con el valor que viene en el objeto, y de ser 'null', se usa una por defecto. Las actividades se inicializan como array vacío, el estado de completo como falso, y se añade el 'userId' que viene de la verificación del token, para poder grabar la actividad en relación al usuario que hace la petición.
   * 
   * @param goal Formulario con los datos del nuevo objetivo.
   * @returns Retornamos un observable a partir del objetivo recibido, para poder visualizarlo en la interfaz.
   */
  createGoal(goalFormData: FormGroup): Observable<void> {
    return this._authService.checkToken()
      .pipe(
        switchMap(token => {
          const newGoal: NewGoal = {
            ...goalFormData.value,
            image: goalFormData.get('image') || DEFAULT_IMAGE,
            completed: false,
            userId: token.userId // ! DESCOMENTAR
          }
          return this._dbService.addNewGoal(newGoal)
        }),
        catchError(error => {
          return throwError(() => new Error('Token has been expired or revoked'))
        })
      )
  }

  /**
   * Método del servicio de objetivos que envía al servicio de base de datos un 'userId' para obtener todos sus objetivos.
   * 
   * @param userId ID del usuario para poder filtrar los goals correspondientes.
   * @returns Un observable de Goals del usuario, o 'null' en caso de que este no tenga.
   */
  getGoals(userId: string): Observable<Goal[] | null> {
    return this._dbService.getGoals(userId)
  }

  /**
   * Método del servicio de objetivos envía el ID de un objetivo al servicio de base de datos, el cual devuelve el objetivo requerido con toda su información referente, o 'null' si no encuentra nada.
   * 
   * @param goalId ID del objetivo a recuperar.
   * @returns Un observable con el objetivo específico o vacío.
   */
  getGoalById(goalId: string): Observable<Goal | null> {
    return this._dbService.getGoalById(goalId)
  }

  /**
   * Método del servicio de objetivos que envía una petición al servicio de base de datos con el ID del objetivo donde se guardará la nueva actividad, además del formulario que contiene los datos de la nueva actividad.
   * 
   * @param goalId 
   * @param activityFormData 
   * @returns 
   */
  addActivityToGoalDBJSON(goalId: string, activityFormData: FormGroup): Observable<Goal> {
    const tok = localStorage.getItem('token')

    if (tok) {
      const { userId, token } = JSON.parse(tok)
      return this._http.get('http://localhost:5000/login/check-token', {
        headers: new HttpHeaders({
          'Authorization': `Bearer ${token}`
        })
      }).pipe(
        switchMap(() => {
          const newActivity: NewActivity = {
            ...activityFormData.value
          }

          return this._dbService.addActivityToGoal(goalId, newActivity)
        }),
        catchError(error => {
          return throwError(() => new Error(`Something went wrong: ${error.message}`))
        })
      )
    } else {
      return throwError(() => new Error('Something went wrong during token verification'))
    }
  }

  /**
   * @deprecated
   * 
   * Primera versión del método encargado de añadir actividades a un objetivo. Usaba un mock personalizado para poder hacer las primeras pruebas.
   */
  // addActivityToGoal(goalId: string, activity: GoalActivity): Observable<GoalActivity | null> {
  //   const goal = this.goals.find(g => g.id === goalId)

  //   if (goal) {
  //     return of(activity)
  //   }

  //   return of(null)
  // }

  getActivitiesByGoalId(goalId: string): Observable<Activity[]> {
    return this._dbService.getUserActivities(goalId)
  }

  deleteGoal(goalId: string) {
    const tok = localStorage.getItem('token')

    if (tok) {
      const { token } = JSON.parse(tok)
      return this._http.get('http://localhost:5000/login/check-token', {
        headers: new HttpHeaders({
          'Authorization': `Bearer ${token}`
        })
      }).pipe(
        switchMap(() => {
          return this._dbService.deleteGoal(goalId)
        }),
        catchError(error => {
          return throwError(() => new Error(error))
        })
      )
    } else {
      return throwError(() => new Error('Something went wrong during token verification'))
    }
  }
}
