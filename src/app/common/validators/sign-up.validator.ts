import { Injectable } from '@angular/core';
import { AlertGenerator } from './../alerts/alert-generator';
import { AuthDialogComponent } from './../../auth-dialog/auth-dialog.component';
import { MdDialog } from '@angular/material';

@Injectable()
export class SignUpValidator{
    
    error : any;

    constructor(private alertGenerator : AlertGenerator){

    }

    //The error codes caught by this method are used as the form validation in this case
    //These are default errors from the firebase authentication service
    //The error message specific to each error is displayed in a dialog
    handleAuthErrors(error){
        this.error = error;
          
          if(this.error.code === 'auth/invalid-email'){
            this.alertGenerator.generateSignUpAlert("Email is badly formatted");
          }
          else if(this.error.code === 'auth/weak-password'){
            this.alertGenerator.generateSignUpAlert("The password must be 6 characters long or more");
          }
          else if(this.error.code === 'auth/email-already-in-use'){
            this.alertGenerator.generateSignUpAlert("The email address is already in use by another account.");
          }else{
             //Something unexpected occurred
          this.alertGenerator.generateSignUpAlert("An unexpected error occurred");
        
          }
         
    
    }

    
  
}