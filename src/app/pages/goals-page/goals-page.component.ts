import { Component, OnInit } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { Goal } from '@models/goals.model';
import { AuthService } from '@services/auth.service';
import { FirestoreService } from '@services/firestore.service';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-goals-page',
  templateUrl: './goals-page.component.html',
  styleUrl: './goals-page.component.scss'
})
export class GoalsPageComponent implements OnInit {
  goals: Goal[];
  isLoading: boolean = true;

  constructor(
    private _auth: AuthService,
    private _firestoreService: FirestoreService,
  ) { }

  ngOnInit(): void {
    const user = this._auth.currentUserSignal()

    if (user) {
      this.fetchUserGoals(user)
    } else {

    }
  }

  // ! Tipar
  fetchUserGoals(user: any) {
    this._firestoreService.getUserGoals(user.uid).subscribe({
      next: res => {
        this.goals = res
      },
      error: error => {
        console.log(error)
      },
      complete: () => {
        console.log('Fetching data complete!')
      }
    })

    this.isLoading = false
  }
}
