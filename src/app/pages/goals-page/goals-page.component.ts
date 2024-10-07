import { Component, OnInit } from '@angular/core';
import { GoalService } from '@services/goal.service';
import { Goal } from '@models/goals.model';
import { Token } from '@guards/auth.guard';
import { NotificationService } from '@services/notification.service';
import { FirestoreService } from '@services/firestore.service';

@Component({
  selector: 'app-goals-page',
  templateUrl: './goals-page.component.html',
  styleUrl: './goals-page.component.scss'
})
export class GoalsPageComponent implements OnInit {
  isLoading: boolean = true;
  errorMessage: string | null = null;
  goals: Goal[] | null = null;

  constructor(
    private _goalsService: GoalService,
    private _notificationService: NotificationService,
    private _firestoreService: FirestoreService,
  ) { }

  ngOnInit(): void {
    this.fetchGoals()
  }

  fetchGoals(): void {
    const token = localStorage.getItem('token')

    if (token) {
      const decodedToken = JSON.parse(token)

      this._firestoreService.getGoals(decodedToken.userId).subscribe(goals => {
        console.log(goals)
        this.goals = goals
        this.isLoading = false
      })
    }
  }
  // ngOnInit(): void {
  //   const token = localStorage.getItem('token')

  //   // TODO: En este punto lo que habría que hacer es hacer una petición al BACKEND, a un endpoint previamente protegido por un middleware que comprueba el token. Depende de lo que devuelva, se gestiona aquí, el éxito o el error, ya que de no haber token, el GUARD directamente redirecciona, y de existir un error con el token que enviemos al hacer la petición, se puede ver reflejado el error.
  //   if (token) {
  //     const decodedToken: Token = JSON.parse(token)
  //     this._goalsService.getGoals(decodedToken.userId).subscribe({
  //       next: goals => {
  //           this.goals = goals
  //           this.isLoading = false;
  //       },
  //       error: error => {
  //         this.isLoading = false
  //         console.log(error)
  //         // this.errorMessage = error.message
  //         this._notificationService.error(error.message, false)
  //       },
  //       // complete: () => console.log('Get goals attempt completed!')
  //     })
  //   } else {
  //     this.isLoading = false
  //     this.errorMessage = 'Connection error'
  //   }
  // }
}
