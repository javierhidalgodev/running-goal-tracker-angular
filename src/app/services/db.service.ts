import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, switchMap, throwError } from 'rxjs';
import { User, UserDBJSON } from '../models/user.model';
import { Goal, GoalActivity, GoalWithExtraDetails, NewGoal } from '../models/goals.model';

@Injectable({
  providedIn: 'root'
})
export class DbService {
  private _DB_URL = 'http://localhost:3000'

  constructor(private _http: HttpClient) { }

  // * Recupera todos los usuarios
  getUsers(): Observable<User[]> {
    return this._http.get<User[]>(`${this._DB_URL}/users`).pipe(
      catchError(error => {
        console.log(error)
        return throwError(() => new Error('Something went wrong getting user list'))
      })
    )
  }

  // * Recupera un usuario por el email o devuelve null
  getUserByEmail(email: string): Observable<UserDBJSON | null> {
    return this._http.get<UserDBJSON[]>(`${this._DB_URL}/users?email=${email}`).pipe(
      map(users => users.length > 0 ? users[0] : null),
      catchError(error => {
        console.log(error)
        return throwError(() => new Error('Something went wrong. Please try again later.'))
      })
    )
  }

  getUserById(id: string): Observable<UserDBJSON | null> {
    return this._http.get<UserDBJSON[]>(`${this._DB_URL}/users?id=${id}`).pipe(
      map(users => users.length > 0 ? users[0] : null),
      catchError(error => {
        console.log(error)
        return throwError(() => new Error('Something went wrong. Please try again later.'))
      })

    )
  }

  getGoals(userId: string): Observable<Goal[] | null> {
    return this._http.get<Goal[]>(`${this._DB_URL}/goals?userId=${userId}`).pipe(
      map(goals => goals.length > 0 ? goals : null),
      catchError(error => {
        console.log(error)
        return throwError(() => new Error('Something went wrong. Please try again later.'))
      })
    )
  }

  getGoalById(goalId: string): Observable<Goal | null> {
    return this._http.get<Goal[]>(`${this._DB_URL}/goals?id=${goalId}`).pipe(
      map(goals => goals.length > 0 ? goals[0] : null),
      catchError(error => {
        return throwError(() => new Error('Get goal by id error'))
      })
    )
  }

  addNewGoal(newGoal: NewGoal): Observable<Goal> {
    return this._http.post<Goal>(`${this._DB_URL}/goals`, newGoal)
  }

  addActivityToGoal(goalId: string, activity: GoalActivity): Observable<Goal> {
    // * Un pipe siempre debe devolver un valor
    return this.getGoalById(goalId).pipe(
      switchMap(goal => {
        if (goal) {
          const goalTotal = goal.activities.reduce((prev, curr) => curr.km + prev, 0)
          const completed = goalTotal + activity.km > goal.km

          const updatedGoal: Goal = {
            ...goal,
            activities: [
              ...goal.activities,
              activity
            ],
            completed
          }

          return this._http.put<Goal>(`${this._DB_URL}/goals/${goalId}`, updatedGoal).pipe(
            catchError(error => {
              return throwError(() => new Error('Error updating goal. Please, try again later.'))
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
}
