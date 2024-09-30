import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GoalService } from '@services/goal.service';
import { ActiveModal, Goal, GoalWithExtraDetails } from '@models/goals.model';
import { calculateDaysToEnd, calculateGoalTotal, calculateProgress } from '@utils/goals.utils';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-goal-details-page',
  templateUrl: './goal-details-page.component.html',
  styleUrl: './goal-details-page.component.scss'
})
export class GoalDetailsPageComponent implements OnInit, OnDestroy {
  id: string | null = null;
  goalWithExtraDetails?: GoalWithExtraDetails;
  isLoading: boolean = true;

  // * Estos datos en principio permanecen, aunque los revisaremos más adelante
  errorMessage?: string
  activitySuccessMessage?: string;
  complete: boolean = false;
  activeModal: ActiveModal = null;

  private fetchGoalByIdSubscription$: Subscription = new Subscription();

  constructor(
    private _route: ActivatedRoute,
    private _goalsService: GoalService
  ) { }

  ngOnInit(): void {
    this.id = this.getGoalIdFromRoute()

    if (this.id) {
      this.fetchGoalById(this.id)
    }
  }

  openModal(modalType: ActiveModal) {
    this.activeModal = modalType
  }

  closeModal() {
    this.activeModal = null;
    if (this.complete) {
      this.complete = false
    }
  }

  activityAdded(event: Goal) {
    this.activeModal = null

    if (this.goalWithExtraDetails) {
      this.recalculateAfterAdd(event)
    }

    this.activitySuccessMessage = 'Activity added successfully!'
    setTimeout(() => {
      this.activitySuccessMessage = undefined
    }, 5000)
  }

  deleteGoal() {

  }

  private getGoalIdFromRoute(): string | null {
    return this._route.snapshot.paramMap.get('id')
  }

  private fetchGoalById(id: string) {
    this.fetchGoalByIdSubscription$ =
      this._goalsService.getGoalById(id).subscribe({
        next: res => {
          if (res) {
            this.goalWithExtraDetails = {
              ...res,
              daysToEnd: calculateDaysToEnd(res),
              goalTotal: calculateGoalTotal(res),
              goalProgress: calculateProgress(res),
            }
          } else {
            this.handleErrorMessage('Goal not found!')
          }
        },
        error: error => {
          this.handleErrorMessage('Lo sentimos pero hubo un error. Por favor, inténtelo de nuevo más tarde.')
          this.isLoading = false
        },
        complete: () => {
          // console.log('Get goal by id attempt completed!')
          this.isLoading = false
        }
      })
  }

  private handleErrorMessage(message: string) {
    console.log(message)
    this.errorMessage = message
  }

  private recalculateAfterAdd(goal: Goal) {
    this.goalWithExtraDetails = {
      ...goal,
      goalTotal: calculateGoalTotal(goal),
      goalProgress: calculateProgress(goal),
      daysToEnd: calculateDaysToEnd(goal),
    }

    if (this.goalWithExtraDetails.goalTotal >= this.goalWithExtraDetails.km) {
      this.goalWithExtraDetails.completed = true
      this.activeModal = 'goalCompleted'
    }
  }

  ngOnDestroy(): void {
    this.fetchGoalByIdSubscription$.unsubscribe()
  }
}