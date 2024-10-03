import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, forkJoin, map, Observable, of, switchMap, throwError } from 'rxjs';
import { User, UserDBJSON } from '@models/user.model';
import { Goal, GoalActivity, NewGoal } from '@models/goals.model';
import { environment } from '../../environments/environment'
import { Activity, ActivityFromDBJSON, NewActivity } from '@models/activity.model';

@Injectable({
  providedIn: 'root'
})
export class DbService {
  private _DB_URL = environment.DB_URL

  constructor(private _http: HttpClient) { }

  /**
   * Método del servicio de base de datos encargado de devolver un array de los usuario registrados.
   * 
   * @returns Lista de usuario registrados como observable.
   */
  getUsers(): Observable<User[]> {
    return this._http.get<User[]>(`${this._DB_URL}/users`).pipe(
      catchError(error => {
        console.log(error)
        return throwError(() => new Error('Something went wrong getting user list'))
      })
    )
  }

  /**
   * Método del servicio de base de datos encargado de devolver un observable de usuario de la BBDD en relación al parámetro 'email' que recibe. De no encontrar ningún usuario, devolverá un observable vacío.
   * 
   * @param email Dirección de email que se usará para verificar si el usuario existe o no en la BBDD.
   * @returns Un observable vacío si no encuentra ningún usuario, o el propio usuario en caso de hacer match.
   * 
   * TODO: revisar si es meramente comprobativo, ya que tal vez no es necesario devolver el valor, y solo se puede devolver un valor booleano.
   */
  getUserByEmail(email: string): Observable<UserDBJSON | null> {
    return this._http.get<UserDBJSON[]>(`${this._DB_URL}/users?email=${email}`).pipe(
      map(users => users.length > 0 ? users[0] : null),
      catchError(error => {
        console.log(error)
        return throwError(() => new Error('Something went wrong. Please try again later.'))
      })
    )
  }

  /**
   * Método del servicio de base de datos encargado de devolver un observable de usuario de la BBDD en relación al parámetro 'id' que recibe. De no encontrar ningún usuario, devolverá un observable vacío.
   * 
   * @param id ID que se usará para verificar si el usuario existe o no en la BBDD.
   * @returns Un observable vacío si no encuentra ningún usuario, o el propio usuario en caso de hacer match.
   * 
   * TODO: revisar si es meramente comprobativo, ya que tal vez no es necesario devolver el valor, y solo se puede devolver un valor booleano.
   */
  getUserById(id: string): Observable<UserDBJSON | null> {
    return this._http.get<UserDBJSON[]>(`${this._DB_URL}/users?id=${id}`).pipe(
      map(users => users.length > 0 ? users[0] : null),
      catchError(error => {
        console.log(error)
        return throwError(() => new Error('Something went wrong. Please try again later.'))
      })

    )
  }

  /**
   * Método del servicio de base de datos encargado de devolver un observable con la lista de objetivos de un usuario, en relación al 'userId' que recibe por parámetro. De no encontrar ningún usuario, devolverá un observable vacío.
   * 
   * @param userId Id del usuario sobre el que se quiere obtener los objetivos.
   * @returns Un observable vacío si no encuentra ningún usuario y objetivos relacionados, o la lista de objetivos del mismo.
   */
  getGoals(userId: string): Observable<Goal[] | null> {
    return this._http.get<Goal[]>(`${this._DB_URL}/goals?userId=${userId}`).pipe(
      map(goals => goals.length > 0 ? goals : []),
      catchError(error => {
        console.log(error)
        return throwError(() => new Error('Something went wrong getting goals. Please try again later.'))
      })
    )
  }

  /**
   * Método del servicio de base de datos encargado de devolver un observable de un objetivo específico en relación al parámetro 'goalId' que recibe. De no encontrar dicho objetivo, devolverá un observable vacío.
   * 
   * @param goalId Id del objetivo que se usará para verificar si el usuario tiene o no asignada dicho objetivo.
   * @returns Un observable vacío si no encuentra el objetivo, o el propio objetivo en caso de hacer match.
   * 
   * TODO: revisar si es meramente comprobativo, ya que tal vez no es necesario devolver el valor, y solo se puede devolver un valor booleano. 
   */
  getGoalById(goalId: string): Observable<Goal | null> {
    return this._http.get<Goal[]>(`${this._DB_URL}/goals?id=${goalId}`).pipe(
      map(goals => goals.length > 0 ? goals[0] : null),
      catchError(error => {
        return throwError(() => new Error('Get goal by id error'))
      })
    )
  }

  getUserActivities(goalId: string): Observable<ActivityFromDBJSON[]> {
    return this._http.get<ActivityFromDBJSON[]>(`${this._DB_URL}/activities?goalId=${goalId}`)
  }

  /**
   * Método del servicio de base de datos encargado de devolver un observable de un objetivo nuevo, usando el objeto que recibe por parámetro.
   * 
   * @param newGoal Objeto con los datos del nuevo objetivo.
   * @returns Un observable del nuevo objetivo con el resultado de la operación de la BBDD.
   * 
   * TODO: revisar si es meramente comprobativo, ya que tal vez no es necesario devolver el usuario, y solo se puede devolver un valor booleano. 
   */
  addNewGoal(newGoal: NewGoal): Observable<void> {
    return this._http.post<void>(`${this._DB_URL}/goals`, newGoal).pipe(
      catchError(error => {
        return throwError(() => new Error('Something went wrong adding goal. Please, try again later.'))
      })
    )
  }

  /**
   * Método del servicio de base de datos encargado añadir una actividad a un objetivo, en relación a los dos parámetros que recibe. Devolverá un observable con el resultado de la operación de la base de datos.
   * 1. Comprueba que existe el objetivo por medio del ID. Para ello hace uso del método interno {@link getGoalById}.
   * 2. Encontrado el objetivo, se crea el nuevo objetivo con la modificación en las actividades, y se realiza la petición PUT a la BBDD para que actualice el objetivo.
   * 3. Se hace un *catch* para controlar posibles errores del servidor a la hora de recuperar el objetivo.
   * 4. Se lanza un error en caso de que no se encuentre el objetivo solicitado.
   * 
   * @param goalId Id del objetivo sobre el que se debe hacer la operación.
   * @param activity Objeto formateado de la actividad que se añadirá al objetivo.
   * @returns Un observable con el resultado de la operación, el objetivo completo.
   */
  addActivityToGoal(goalId: string, activity: NewActivity): Observable<Goal> {
    return this.getGoalById(goalId).pipe(
      switchMap(goal => {
        if (goal) {
          const newActivity: Activity = {
            km: activity.km,
            date: activity.date,
            goalId,
            added: new Date()
          }
          return this._http.post<Activity>(`${this._DB_URL}/activities`, newActivity).pipe(
            switchMap(() => {
              return this.checkGoalStatus(goal)
            })
          )
        }

        return throwError(() => new Error('Goal not found!'))
      }),
      catchError(error => {
        return throwError(() => new Error('Error adding activity to goal. Please, try again later.'))
      })
    )
  }

  checkGoalStatus(goal: Goal): Observable<Goal> {
    return this.getUserActivities(goal.id).pipe(
      switchMap(activities => {
        if (activities) {
          const kmsCovered = activities.reduce((prev, curr) => prev + curr.km , 0)

          if (kmsCovered >= goal.km) {
            return this._http.patch<Goal>(`${this._DB_URL}/goals/${goal.id}`, { completed: true }).pipe(
              map(updatedGoal => {
                console.log('actividad completada', updatedGoal)
                return updatedGoal
              })
            )
          }

          console.log('actividad sin completar', goal)
          return of(goal)
        }

        return throwError(() => new Error('Goal not found!'))
      })
    )
  }

  deleteGoal(goalId: string): Observable<void> {
    // * Obtener todas las actividades a eliminar
    return this.getUserActivities(goalId).pipe(
      switchMap(activities => {
        const deleteAtivities$ = activities.map(activity => {
          return this._http.delete<void>(`${this._DB_URL}/activities/${activity.id}`)
        })

        return forkJoin(deleteAtivities$).pipe(
          switchMap(() => this._http.delete<void>(`${this._DB_URL}/goals/${goalId}`))
        )
      }),
      catchError(error => {
        return throwError(() => new Error('Error deleting goals and its activities.'))
      })
    )
  }

  // deleteActivityFromGoal()
}
