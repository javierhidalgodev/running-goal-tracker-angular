import { Injectable } from '@angular/core';
import { addDoc, collection, collectionData, CollectionReference, deleteDoc, doc, docData, documentId, Firestore, getDocs, query, where } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth'
import { Goal } from '@models/goals.model';
import { Login, NewUser, User } from '@models/user.model';
import { Observable } from 'rxjs';
import CryptoJS from 'crypto-js';
import jwt from 'jsonwebtoken'
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  private usersRef: CollectionReference = collection(this._firestore, 'users')
  private goalsRef: CollectionReference = collection(this._firestore, 'goals')

  constructor(
    private _firestore: Firestore,
    private _httpClient: HttpClient
  ) { }

  async userExists(email: string) {

    const q = query(this.usersRef, where("email", "==", email))
    const querySnapshot = await getDocs(q)

    return querySnapshot
  }

  hashPassword(password: string): string {
    return CryptoJS.SHA256(password).toString()
  }

  async addUser(user: NewUser) {
    const userAlreadyExists = await this.userExists(user.email)

    if (!userAlreadyExists.empty) {
      throw new Error('el usuario ya existe.')
    }

    const hashedPassword = this.hashPassword(user.password)

    const userData: User = {
      ...user,
      password: hashedPassword,
      registrationDate: new Date()
    }

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

    const goalDocRef = doc(this._firestore, `goals/${goal.id}`)
    return deleteDoc(goalDocRef)
  }

  comparePasswords(password: string, hash: string): boolean {
    return CryptoJS.SHA256(password).toString() === hash
  }

  generateToken(payload: { email: string, userId: string }) {
    console.log(payload)

    return this._httpClient.post('http://localhost:5000/login', payload)
  }

  async login(userFormData: Login) {
    // 1. Buscar usuario en la base de datos
    const userExists = await this.userExists(userFormData.email)

    if (!userExists.empty) {
      // console.log(userExists.docs[0].data())
      const user = userExists.docs[0]
      const passwordMatch = this.comparePasswords(userFormData.password, user.data()['password'])

      // 2. Comparar password
      if (passwordMatch) {
        const payload = {
          email: userFormData.email,
          userId: user.id
        }

        // 3. Generar token y guardarlo
        this.generateToken(payload).subscribe({
          next: token => {
            localStorage.setItem('token', JSON.stringify(payload))
          },
          error: err => {
            console.log(err)
          },
          complete: () => {
            console.log('Login attempt completed!')
          }
        })
      }
    }

    // 4. Redirigir
  }
}
