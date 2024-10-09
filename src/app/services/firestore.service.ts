import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { collection, CollectionReference, Firestore } from '@angular/fire/firestore';
import { NewUser } from '@models/user.model';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  private usersRef: CollectionReference = collection(this._firestore, 'users')
  private goalsRef: CollectionReference = collection(this._firestore, 'goals')

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
}
