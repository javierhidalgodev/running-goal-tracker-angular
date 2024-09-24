import { Component, OnInit } from '@angular/core';
import { DbService } from '../../services/db.service';
import { User } from '../../models/user.model';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Goal, GoalWithExtraDetails } from '../../models/goals.model';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent implements OnInit {
map(undefined: undefined) {
throw new Error('Method not implemented.');
}
  user: User | null = null;
  goals: Goal[] | null = [];
  pendingTasks: number = 0;
  completedTasks: number = 0;

  constructor(
    private _dbService: DbService
  ) { }

  ngOnInit(): void {
    const token = localStorage.getItem('token')

    if (token) {
      const { userId } = JSON.parse(token)
      this._dbService.getUserById(userId).pipe(
        switchMap(user => {
          this.user = user

          return this._dbService.getGoals(user?.id!)
        })
      ).subscribe({
        next: goals => {
          this.goals = goals
          if (goals) {
            console.log(goals)
            this.pendingTasks = goals.filter(g => !g.completed).length
            this.completedTasks = goals.filter(g => g.completed).length
          }
        }
      })
    }
  }
}
