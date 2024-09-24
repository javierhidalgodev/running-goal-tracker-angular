import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GoalService } from '../../services/goal.service';
import { ActiveModal, Goal, GoalActivity, GoalWithExtraDetails } from '../../models/goals.model';
import { calculateDaysToEnd, calculateGoalTotal, calculateProgress } from '../../utils/utils';

@Component({
  selector: 'app-goal-details-page',
  templateUrl: './goal-details-page.component.html',
  styleUrl: './goal-details-page.component.scss'
})
export class GoalDetailsPageComponent implements OnInit {
  id: string | null = null;
  goalWithExtraDetails?: GoalWithExtraDetails;
  isLoading: boolean = true;

  // * Estos datos en principio permanecen, aunque los revisaremos más adelante
  errorMessage?: string
  activitySuccessMessage?: string;
  complete: boolean = false;
  activeModal: ActiveModal = null;

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

  //  TODO: De momento los datos no persisten porque no está configurado para eso.
  // handleModal() {
  //   this.activeModal = !this.activeModal
  // }

  openModal() {
    this.activeModal = 'activityForm'
  }

  closeModal() {
    this.activeModal = null;
    if (this.complete) {
      this.complete = false
    }
  }

  activityAdded(event: Goal) {
    // if (event && this.goalWithExtraDetails) {
    //   this.goalWithExtraDetails = {
    //     ...this.goalWithExtraDetails,
    //     activities: [
    //       ...this.goalWithExtraDetails.activities,
    //       event
    //     ]
    //   }
    // }

    // this.activeModal = null

    if (this.goalWithExtraDetails) {
      this.recalculateAfterAdd(event)
    }

    // this.activitySuccessMessage = 'Activity added successfully!'
    // setTimeout(() => {
    //   this.activitySuccessMessage = undefined
    // }, 5000)
    // this._snackbar.open('Activity added successfully!', 'Close', {
    //   duration: 5000
    // })
  }

  private getGoalIdFromRoute(): string | null {
    return this._route.snapshot.paramMap.get('id')
  }

  private fetchGoalById(id: string) {
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
        console.log('Get goal by id attempt completed!')
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
}