import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Activity } from '@models/activity.model';
import { Goal } from '@models/goals.model';
import { AuthService } from '@services/auth.service';
import { FirestoreService } from '@services/firestore.service';
import { GoalService } from '@services/goal.service';

@Component({
  selector: 'app-goal',
  templateUrl: './goal.component.html',
  styleUrl: './goal.component.scss'
})
export class GoalComponent implements OnInit {
  @Input() goalObject: Goal;
  goalActivities: Activity[];
  
  isImageLoading: boolean = true;

  constructor (
    private _route: Router,
    private _goalService: GoalService,
    private _authService: AuthService
  ) { }

  // Podemos introducir un ngOnInit para verificar el estado del goal, y si es null renderizar algo concreto y avisar al usuario
  ngOnInit(): void {
    console.log(this._authService.currentUserSignal())
    if (!this.goalObject) {
      console.warn('Something went wrong with data source!')
    } else {
      // * Hacer mejor
      this._goalService.getActivitiesByGoalId(this.goalObject.id).subscribe(value => this.goalActivities = value)
    }
  }

  onImageLoad() {
    // TODO: quitar la simulación de retraso
    setTimeout(() => this.isImageLoading = false,2000)
  }

  navigateTo(url: string): void {
    this._route.navigate([`goals/${url}`])
  }
}
