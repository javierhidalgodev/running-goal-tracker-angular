import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { GoalService } from '@services/goal.service';
import { ActiveModal, Goal } from '@models/goals.model';
import { catchError, Observable, Subscription, switchMap, throwError } from 'rxjs';
import { ModalService } from '@services/modal.service';
import { ModalYeahComponent } from '@components/modal-yeah/modal-yeah.component';
import { ModalInterface } from '@models/modal.model';
import { Activity } from '@models/activity.model';
import { NotificationService } from '@services/notification.service';
import { FirestoreService } from '@services/firestore.service';

@Component({
  selector: 'app-goal-details-page',
  templateUrl: './goal-details-page.component.html',
  styleUrl: './goal-details-page.component.scss'
})
export class GoalDetailsPageComponent implements OnInit, OnDestroy {
  idParam: string | null = null;
  goal: Goal;
  activities: Activity[] = [];
  isLoading: boolean = true;

  // * Estos datos en principio permanecen, aunque los revisaremos más adelante
  errorMessage?: string
  activitySuccessMessage?: string;
  complete: boolean = false;
  activeModal: ActiveModal = null;

  private fetchGoalByIdSubscription$: Subscription = new Subscription();

  constructor(
    private _route: ActivatedRoute,
    private _goalsService: GoalService,
    private _modalService: ModalService,
    private _notificationService: NotificationService,
    private _firestoreService: FirestoreService,
    private _router: Router,
  ) { }

  ngOnInit(): void {
    this.idParam = this.getGoalIdFromRoute()

    if (this.idParam) {
      this.fetchGoalById(this.idParam).subscribe({
        next: activities => {
          console.log(this.goal)
          console.log(activities)

          this.activities = activities
        },
        error: error => {
          console.error(error)
          this._notificationService.error(error.message, false)
        },
        complete: () => {
          console.log('Completed!');
        }
      })
    } else {
      this._notificationService.error('Goal not found')
    }
    this.isLoading = false
  }

  private getGoalIdFromRoute(): string | null {
    return this._route.snapshot.paramMap.get('id')
  }

  private fetchGoalById(id: string): Observable<Activity[]> {
    return this._firestoreService.getGoalById(id).pipe(
      switchMap(res => {
        if(res) {
          this.goal = res
          return this._firestoreService.getGoalActivities(id)
        } else {
          return throwError(() => new Error('Goal not found'))
        }
      }),
      catchError(error => {
        return throwError(() => new Error(error))
      })
    )


    this.isLoading = false
    // console.log(id)
    // this._firestoreService.getGoalById(id)
    //   .subscribe(goal => {
    //     this.goal = goal
    //     this.isLoading = false
    //   })

    // this.fetchGoalByIdSubscription$ =
    //   this._goalsService.getGoalById(id).subscribe({
    //     next: goal => {
    //       if (!goal) {
    //         this._notificationService.error('Goal not found!', false)
    //         // this.handleErrorMessage('Goal not found!')
    //       } else {
    //         this.goal = goal
    //         this.fetchActivitiesByGoalId(id)
    //       }
    //     },
    //     error: error => {
    //       this._notificationService.error('Lo sentimos pero hubo un error. Por favor, inténtelo de nuevo más tarde.', false)
    //       // this.handleErrorMessage('Lo sentimos pero hubo un error. Por favor, inténtelo de nuevo más tarde.')
    //       this.isLoading = false
    //     },
    //     complete: () => {
    //       // console.log('Get goal by id attempt completed!')
    //       this.isLoading = false
    //     }
    //   })
  }

  private fetchActivitiesByGoalId(goalId: string) {
    this._goalsService.getActivitiesByGoalId(goalId).subscribe({
      next: activities => {
        // console.log(activities)
        this.activities = activities
      },
      error: error => {
        console.log(error)
      },
      // complete: () => {
      // console.log('Get activities from user attempt completed!')
      // }
    })
  }

  confirmDelete() {
    const modalInterface: ModalInterface = {
      cancelButtonLabel: 'No',
      confirmAction: () => this.deleteGoal(),
      confirmButtonLabel: 'Delete',
      title: 'Delete goal', 
      content: 'Are you sure to delete this goal?',
    }

    this._modalService.openDialog(ModalYeahComponent, modalInterface)
  }

  async deleteGoal() {
    await this._firestoreService.deleteGoal(this.goal)
    this._router.navigate(['/goals'])
  }

  // ? Para añadir kilómetros
  openModal(modalType: ActiveModal) {
    this.activeModal = modalType
  }

  // ? Para cerrar el modal de añadir kilómetros
  closeModal() {
    this.activeModal = null;
    if (this.complete) {
      this.complete = false
    }
  }

  // * Para recibir la acción de actualización del componente de goal-details, y actualizar la vista
  activityAdded(event: any) {
    this.activeModal = null

    this.checkGoalProgress()
    console.log(this.goal.km,)
  }

  async checkGoalProgress() {
    const goalTotal = this.activities.reduce((prev, acc) => prev + acc.km, 0)

    if (goalTotal > this.goal.km) {
      try {
        const res = await this._firestoreService.updateGoalStatus(this.idParam!)
        console.log(res)
      } catch (error) {
        console.error(error)
      }
    }
  }

  // ? Mostrar errores a la hora de fallar en la recuperación de goals o actividades
  private handleErrorMessage(message: string) {
    // console.log(message)
    this.errorMessage = message
  }

  ngOnDestroy(): void {
    this.fetchGoalByIdSubscription$.unsubscribe()
  }
}