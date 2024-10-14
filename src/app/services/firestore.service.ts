import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { collection, collectionData, CollectionReference, Firestore, docData, updateDoc, deleteDoc } from '@angular/fire/firestore';
import { Activity } from '@models/activity.model';
import { Goal } from '@models/goals.model';
import { NewUser } from '@models/user.model';
import { addDoc, doc, getDoc, query, where } from 'firebase/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  private usersRef: CollectionReference = collection(this._firestore, 'users')
  private goalsRef: CollectionReference = collection(this._firestore, 'goals')
  private activitiesRef: CollectionReference = collection(this._firestore, 'activities')

  constructor(
    private _firestore: Firestore,
    private _auth: Auth,
  ) { }

  register(userFormData: NewUser) {
    return createUserWithEmailAndPassword(this._auth, userFormData.email, userFormData.password)
  }

  login({email, password}: any) {
    return signInWithEmailAndPassword(this._auth, email, password)
  }

  logout() {
    return signOut(this._auth)
  }

  getUserGoals(uid: string): Observable<Goal[]> {
    const q = query(this.goalsRef, where('userId', '==', uid))
    return collectionData(q, { idField: 'uid' }) as Observable<Goal[]>
  }

  getGoalById(goalId: string): Observable<Goal> {
    const docRef = doc(this.goalsRef, goalId, )
    return docData(docRef, { idField: 'uid' }) as Observable<Goal>
  }

  addGoal(data: Goal) {
    return addDoc(this.goalsRef, data)
  }

  deleteGoal(goal: Goal) {
    const goalRef = doc(this.goalsRef, goal.uid)
    return deleteDoc(goalRef)
  }

  getGoalActivities(goalId: string): Observable<Activity[]> {
    const q = query(this.activitiesRef, where('goalId', '==', goalId))
    return collectionData(q) as Observable<Activity[]>
  }

  addActivity(data: Activity) {
    console.log(data)
    return addDoc(this.activitiesRef, data)
  }

  updateGoalStatus(goalId: string) {
    const docRef = doc(this.goalsRef, goalId)
    return updateDoc(docRef, { completed: true })
  }
}
