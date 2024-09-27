import { Component, OnDestroy, OnInit } from '@angular/core';
import { DbService } from '@services/db.service';
import { User } from '../../models/user.model';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Goal, GoalWithExtraDetails } from '@models/goals.model';
import { Subscription, switchMap } from 'rxjs';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent implements OnInit, OnDestroy {
  user: User | null = null;
  goals: Goal[] | null = [];
  pendingTasks: number = 0;
  completedTasks: number = 0;

  private _goalsSubscription$: Subscription = new Subscription();

  constructor(
    private _dbService: DbService
  ) { }

  ngOnInit(): void {
    const token = localStorage.getItem('token')

    if (token) {
      const { userId } = JSON.parse(token)

      this._goalsSubscription$ =
      this._dbService.getUserById(userId).pipe(
        switchMap(user => {
          this.user = user

          return this._dbService.getGoals(user?.id!)
        })
      ).subscribe({
        next: goals => {
          this.goals = goals
          if (goals) {
            this.pendingTasks = goals.filter(g => !g.completed).length
            this.completedTasks = goals.filter(g => g.completed).length
          }
        }
      })
    }
  }
  ngOnDestroy(): void {
    this._goalsSubscription$.unsubscribe()
  }
}
