import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AngularFireAuth} from 'angularfire2/auth';
import {AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase/app';


/**
 * AuthService provides user data manipulation methods and authentication methods.
 * 
 * References: 
 *  - https://firebase.google.com/docs/reference/ - Accessed July 2017
 *  - https://angularfire2.com/api/ - Accessed July 2017
 *  - https://github.com/angular/angularfire2 - Accessed July 2017
 *  - https://coursetro.com/posts/code/54/Angular-4-Firebase-Tutorial:-Make-a-Simple-Angular-4-App - Accessed July 2017
 * 
 * */

@Injectable()
export class AuthService {

  constructor(private afAuth : AngularFireAuth, private afdb : AngularFireDatabase,
  private router : Router) {
   
   }
  
   /**
    * Checks the authentication state of the current user. If no user is properly logged in, the method
    will redirect to the welcome-page.
    */
   userScan(){
     let authState = this.afAuth.auth.onAuthStateChanged( user => {
       if(user){
         //user logged in
       }else{
          this.router.navigate(['/welcome-page']);
       }
     });
     
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

  logout(){
    let logoutPromise = this.afAuth.auth.signOut();
    return logoutPromise;

  }
}
