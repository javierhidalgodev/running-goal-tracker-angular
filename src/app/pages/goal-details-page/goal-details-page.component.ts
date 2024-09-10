import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GoalService } from '../../services/goal.service';
import { ActiveModal, GoalActivity, GoalWithExtraDetails } from '../../models/goals';
import { calculateDaysToEnd, calculateGoalTotal, calculateProgress } from '../../utils/utils';

@Component({
  selector: 'app-goal-details-page',
  templateUrl: './goal-details-page.component.html',
  styleUrl: './goal-details-page.component.scss'
})
export class GoalDetailsPageComponent implements OnInit {
  id: number = 0;
  goalWithExtraDetails?: GoalWithExtraDetails;

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
    this.fetchGoalById(this.id)

    // ! Obsoleto de momento
    // this.calculateDaysToEnd()
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

  activityAdded(event: GoalActivity) {
    if (event && this.goalWithExtraDetails) {
      this.goalWithExtraDetails = {
        ...this.goalWithExtraDetails,
        activities: [
          ...this.goalWithExtraDetails.activities,
          event
        ]
      }
    }

    this.activeModal = null

    if (this.goalWithExtraDetails) {
      this.recalculateAfterAdd(this.goalWithExtraDetails)
    }

    // this.activitySuccessMessage = 'Activity added successfully!'
    // setTimeout(() => {
    //   this.activitySuccessMessage = undefined
    // }, 5000)
    // this._snackbar.open('Activity added successfully!', 'Close', {
    //   duration: 5000
    // })
  }

  private getGoalIdFromRoute(): number {
    return Number(this._route.snapshot.paramMap.get('id'))
  }

  private fetchGoalById(id: number) {
    this._goalsService.getGoalById(id).subscribe({
      next: res => {
        if (res) {
          this.goalWithExtraDetails = {
            ...res,
            daysToEnd: calculateDaysToEnd(res),
            goalTotal: calculateGoalTotal(res),
            goalProgress: calculateProgress(res),
            complete: false
          }
        }
      },
      error: error => {
        this.handleErrorMessage('Goal not found!')
      },
      complete: () => console.log('Get goal by id attempt completed!')
    })
  }

  private handleErrorMessage(message: string) {
    console.log(message)
    this.errorMessage = message
  }

  private recalculateAfterAdd(goal: GoalWithExtraDetails) {
    if (this.goalWithExtraDetails) {
      this.goalWithExtraDetails.goalTotal = calculateGoalTotal(this.goalWithExtraDetails)
      this.goalWithExtraDetails.goalProgress = calculateProgress(this.goalWithExtraDetails)

      if (this.goalWithExtraDetails.goalTotal >= this.goalWithExtraDetails.km) {
        this.goalWithExtraDetails.complete = true
        this.activeModal = 'goalCompleted'
      }
    }
  }
}