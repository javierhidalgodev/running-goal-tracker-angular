import { Injectable } from '@angular/core';
import { addDoc, collection, collectionData, documentId, Firestore, query, where } from '@angular/fire/firestore';
import { Goal } from '@models/goals.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(
    private _firestore: Firestore
  ) { }


  addGoal(goal: Goal) {
    const goalRef = collection(this._firestore, 'goals')

    return addDoc(goalRef, goal)
  }

  getGoals(userId: string): Observable<Goal[]> {
    const goalRef = collection(this._firestore, 'goals')
    const q = query(goalRef, where("userId", "==", userId))

    return collectionData(q, { idField: 'id' }) as Observable<Goal[]>
  }

  getGoalById(goalId: string): Observable<Goal> {
    console.log(goalId)
    const goalRef = collection(this._firestore, 'goals')
    const q = query(goalRef, where(documentId(), "==", goalId))

    return collectionData(q, { idField: 'id' }) as Observable<Goal>
  }
}
