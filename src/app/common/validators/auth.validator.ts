import { Injectable } from '@angular/core';
import { AlertGenerator } from './../alerts/alert-generator';
import { AuthDialogComponent } from '../alerts/auth-dialog/auth-dialog.component';
import { MdDialog } from '@angular/material';

@Injectable()
export class AuthValidator{
    
    error : any;

    constructor(private alertGenerator : AlertGenerator){

    }

    //The error codes caught by this method are used as the form validation in this case
    //These are default errors from the firebase authentication service
    //The error message specific to each error is displayed in a dialog
    handleAuthErrors(error){
        this.error = error;
          
          if(this.error.code === 'auth/invalid-email'){
            this.alertGenerator.generateAuthAlert("Email is badly formatted. Please enter a valid email address.");
          }
          else if(this.error.code === 'auth/wrong-password'){
            this.alertGenerator.generateAuthAlert("The password is invalid or the user does not have a password.");
          }
          else if(this.error.code === 'auth/user-not-found'){
             this.alertGenerator.generateAuthAlert("There is no user record corresponding to this identifier.");
          }
          else if(this.error.code === 'auth/weak-password'){
            this.alertGenerator.generateAuthAlert("The password must be 6 characters long or more.");
          }
          else if(this.error.code === 'auth/email-already-in-use'){
            this.alertGenerator.generateAuthAlert("The email address is already in use by another account.");
          }else{
             //Something unexpected occurred
          this.alertGenerator.generateAuthAlert("An unexpected error occurred.");
        
          }
         
    
    }

    
  
}