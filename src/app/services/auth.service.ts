import { Injectable } from '@angular/core';
import { AngularFireAuth} from 'angularfire2/auth';
import {AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase/app';

/**
 * AuthService provides user data manipulation methods and authentication methods.
 * 
 * References: 
 *  - https://firebase.google.com/docs/reference/
 *  - https://angularfire2.com/api/
 *  - https://github.com/angular/angularfire2
 *  - https://coursetro.com/posts/code/54/Angular-4-Firebase-Tutorial:-Make-a-Simple-Angular-4-App
 * 
 * */

@Injectable()
export class AuthService {



  constructor(private afAuth : AngularFireAuth, private afdb : AngularFireDatabase) {
   
   }

   /**
 * Takes an email and password and attempts to log in the user. It
 * returns a firebase promise of the type FirebaseAuthState.
 */
   login(email, password){

    //auth.login method returns a Promise
   
    let loginPromise = this.afAuth.auth.signInWithEmailAndPassword(email, password);
    return loginPromise;

   }

   /**
 * Signs up a user with the passed credentials in 
 * the firebase database. It returns a firebase promise of the type FirebaseAuthState.
 */
signupUser(email, password){

  let signupUserPromise = this.afAuth.auth.createUserWithEmailAndPassword(email, password);
      return signupUserPromise;
}

/**
 * Registers the user and its associated data in the database.
 */
registerUser(uid, email, firstName, lastName){

  this.afdb.object('/users/'+uid).update({

    email: email,
    firstName: firstName,
    lastName: lastName
    
  });

 
}
     resetPassword(email : string){
       let resetAuth = this.afAuth.auth.sendPasswordResetEmail(email);
       return resetAuth;
         
  }
}
