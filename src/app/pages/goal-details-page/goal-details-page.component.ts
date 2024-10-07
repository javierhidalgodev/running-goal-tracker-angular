import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GoalService } from '@services/goal.service';
import { ActiveModal, Goal } from '@models/goals.model';
import { Subscription } from 'rxjs';
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
  ) { }

  ngOnInit(): void {
    // 1. Recuperar el parámetro ID de la URL para obtener goal
    this.idParam = this.getGoalIdFromRoute()

    // 2. Obtener goal
    if (this.idParam) {
      this.fetchGoalById(this.idParam)
      // 3. Obtener actividades del goal
    }
  }

  private getGoalIdFromRoute(): string | null {
    return this._route.snapshot.paramMap.get('id')
  }

  private fetchGoalById(id: string) {
    console.log(id)
    this._firestoreService.getGoalById(id).subscribe(goal => {
      console.log(goal)
      this.goal = goal
      this.isLoading = false
    })

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
      confirmAction: () => this._goalsService.deleteGoal(this.idParam!),
      confirmButtonLabel: 'Delete',
      title: 'Delete goal',
      content: 'Are you sure to delete this goal?',
    }

    this._modalService.openDialog(ModalYeahComponent, modalInterface)
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
  activityAdded(event: Goal) {
    this.activeModal = null

    // * Necesito usar esta función que actualiza el objetivo y sus actividades a la vez para ver reflejados los cambios en la UI
    this.fetchGoalById(event.id)

    if (event.completed) {
      this.activeModal = 'goalCompleted'
    } else {
      this.activitySuccessMessage = 'Activity added successfully!'
      setTimeout(() => {
        this.activitySuccessMessage = undefined
      }, 5000)
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