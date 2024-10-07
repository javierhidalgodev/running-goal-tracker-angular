import { Injectable } from '@angular/core';
import { addDoc, collection, collectionData, deleteDoc, doc, docData, documentId, Firestore, getDoc, query, where } from '@angular/fire/firestore';
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
    const goalDocRef = doc(this._firestore, `goals/${goalId}`)
    // const goalRef = collection(this._firestore, 'goals')
    // const q = query(goalRef, where(documentId(), "==", goalId))
    // return collectionData(q, { idField: 'id' }) as Observable<Goal>
    const docu = docData(goalDocRef)
    console.log(docu)
    return docu
  }

  deleteGoal(goal: Goal) {
    console.log(goal)
    const goalDocRef = doc(this._firestore, `goals/${goal.id}`)
    return deleteDoc(goalDocRef)
  }
}
