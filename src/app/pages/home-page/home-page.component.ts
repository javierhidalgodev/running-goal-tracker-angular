import { Component, OnDestroy, OnInit } from '@angular/core';
import { DbService } from '@services/db.service';
import { User } from '../../models/user.model';
import { Goal } from '@models/goals.model';
import { catchError, Observable, Subscription, switchMap, throwError } from 'rxjs';
import { NotificationService } from '@services/notification.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent implements OnInit, OnDestroy {
  user: User | null = null;
  goals: Goal[] | null = null;
  pendingTasks: number = 0;
  completedTasks: number = 0;

  isLoading: boolean = true;

  private _goalsSubscription$: Subscription = new Subscription();

  constructor(
    private _dbService: DbService,
    private _notificationService: NotificationService,
  ) { }

  ngOnInit(): void {
    const token = localStorage.getItem('token')

    if (token) {
      const { userId } = JSON.parse(token)

      this._goalsSubscription$ = this._fetchUser$(userId).subscribe({
        next: (goals) => {
          this.goals = goals
          this.isLoading = false
        },
        error: (error) => {
          // console.log(error.message)
          this._notificationService.error('Something went wrong getting data. Please, try again later', false)
          this.isLoading = false
        },
        complete: () => {
          console.log('Get user and goals attempt completed!')
          this.isLoading = false
        }
      })
    }
  }

  private _fetchUser$(userId: string): Observable<Goal[] | null> {
    return this._dbService.getUserById(userId).pipe(
      switchMap(user => {
        this.user = user

        return this._dbService.getGoals(user?.id!)
      }),
      catchError(error => {
        return throwError(() => new Error('error fetch user'))
      })
    )
  }

  ngOnDestroy(): void {
    this._goalsSubscription$.unsubscribe()
  }
}
