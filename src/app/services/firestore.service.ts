import { Injectable } from '@angular/core';
import { addDoc, collection, collectionData, deleteDoc, doc, docData, documentId, Firestore, getDocs, query, where } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth'
import { Goal } from '@models/goals.model';
import { NewUser, User } from '@models/user.model';
import { Observable } from 'rxjs';
import CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(
    private _firestore: Firestore,
    private _authFirestore: AngularFireAuth
  ) { }

  async userExists(email: string) {
    const usersRef = collection(this._firestore, 'users')
    const q = query(usersRef, where("email", "==", email))
    const querySnapshot = await getDocs(q)
    return !querySnapshot.empty
  }

  hashPassword(password: string): string {
    return CryptoJS.SHA256(password).toString()
  }

  async addUser(user: NewUser) {
    const userAlreadyExists = await this.userExists(user.email)

    if(userAlreadyExists) {
      throw new Error('El usuario ya existe.')
    }

    const hashedPassword = this.hashPassword(user.password)

    const userData: User = {
      ...user,
      password: hashedPassword,
      registrationDate: new Date()
    }

    this._authFirestore.createUserWithEmailAndPassword(user.email, user.password)
    await addDoc(collection(this._firestore, 'users'), userData)
  }

  addGoal(goal: Goal) {
    const goalRef = collection(this._firestore, 'goals')

    return addDoc(goalRef, goal)
  }

  // getUser(userEmail: string): Observable<User[]> {
  //   const userRef = collection(this._firestore, 'users')
  //   const q = query(userRef, where("email", "==", userEmail))

  //   return collectionData(q, { idField: 'id' }) as Observable<User[]>
  // }

  getGoals(userId: string): Observable<Goal[]> {
    const goalRef = collection(this._firestore, 'goals')
    const q = query(goalRef, where("userId", "==", userId))

    return collectionData(q, { idField: 'id' }) as Observable<Goal[]>
  }

  getGoalById(goalId: string): Observable<Goal> {
    // console.log(goalId)
    const goalDocRef = doc(this._firestore, `goals/${goalId}`)

    return docData(goalDocRef, { idField: 'id' }) as Observable<Goal>
  }

  deleteGoal(goal: Goal) {
    console.log(goal)
    documentId()
    const goalDocRef = doc(this._firestore, `goals/${goal.id}`)
    return deleteDoc(goalDocRef)
  }
}
