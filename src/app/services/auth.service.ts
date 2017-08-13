import { Injectable } from '@angular/core';
import { AngularFire, AuthMethods, AuthProviders, FirebaseObjectObservable, AngularFireAuth} from 'angularfire2';

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

  firebaseAuth : AngularFireAuth;


  constructor(private af : AngularFire) {
    this.firebaseAuth = af.auth;
   }

   /**
 * Takes an email and password and attempts to log in the user. It
 * returns a firebase promise of the type FirebaseAuthState.
 */
   login(email, password){

    //auth.login method returns a Promise
   
    let loginPromise = this.af.auth.login({
      email: email,
      password: password
    },{
      //method selected in Firebase
      method: AuthMethods.Password,
      provider: AuthProviders.Password
    });

    return loginPromise;

   }

   /**
 * Signs up a user with the passed credentials in 
 * the firebase database. It returns a firebase promise of the type FirebaseAuthState.
 */
signupUser(email, password){

  let signupUserPromise = this.af.auth.createUser({
      email: email,
      password: password
    });
  
    return signupUserPromise;
}

/**
 * Registers the user and its associated data in the database.
 */
registerUser(uid, email, firstName, lastName){

  this.af.database.object('/users/'+uid).update({

    email: email,
    firstName: firstName,
    lastName: lastName
    
  })

 
}
  //    resetPassword(email : string){
  //      let resetAuth = firebase.auth();
  //      return resetAuth.sendPasswordResetEmail(email)
         
  // }
}
