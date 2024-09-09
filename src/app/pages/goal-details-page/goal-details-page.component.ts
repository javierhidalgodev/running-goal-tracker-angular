import { Component, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Goal, GoalActivity, GoalService } from '../../services/goal.service';
import { CdkTreeNodeOutletContext } from '@angular/cdk/tree';

@Component({
  selector: 'app-goal-details-page',
  templateUrl: './goal-details-page.component.html',
  styleUrl: './goal-details-page.component.scss'
})
export class GoalDetailsPageComponent implements OnInit {
  id: number = 0;
  selectedGoal?: Goal;
  daysToEnd: number = 0;

  errorMessage?: string
  activitySuccessMessage?: string;
  complete: boolean = false;
  isModalOpen: boolean = false;

  constructor(
    private _route: ActivatedRoute,
    private _goalsService: GoalService
  ) { }

  ngOnInit(): void {
    this.id = this.getGoalIdFromRoute()
    this.fetchGoalById(this.id)

    this.calculateDaysToEnd()
  }

  //  TODO: De momento los datos no persisten porque no está configurado para eso.
  handleModal() {
    this.isModalOpen = !this.isModalOpen
  }
  
  closeModal() {
    this.isModalOpen = false;
    if(this.complete) {
      this.complete = false
    }
  }

  completeModal() {
    console.log('Complete en true hermano')
    this.complete = true;
  }

  activityAdded(event: GoalActivity) {
    if (event && this.selectedGoal) {
      this.selectedGoal = {
        ...this.selectedGoal,
        activities: [
          ...this.selectedGoal.activities,
          event
        ]
      }
    }
    this.isModalOpen = false

    if(this.selectedGoal) {
      let goalTotal = this.selectedGoal?.activities.reduce((acc, cur) => cur.km + acc , 0)
      if(goalTotal >= this.selectedGoal?.km) {
        this.complete = true
      }
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
    this._goalsService.getGoalById(this.id).subscribe({
      next: res => {
        if (res) {
          this.selectedGoal = res
          // ? Separar a método a parte para mejorar legibilodad?
        }
      },
      error: error => {
        this.handleErrorMessage('Goal not found!')
      },
      complete: () => console.log('Get goal by id attempt completed!')
    })
  }

  calculateDaysToEnd() {
    if(this.selectedGoal) {
      this.daysToEnd = Number(((new Date().getTime() - this.selectedGoal.startDate.getTime())/(1000*60*60*24)).toFixed())
    }
  }

  private handleErrorMessage(message: string) {
    console.log(message)
    this.errorMessage = message
  }
}