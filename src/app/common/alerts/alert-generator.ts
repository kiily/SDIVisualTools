import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { Injectable } from '@angular/core';
import { AuthDialogComponent } from './auth-dialog/auth-dialog.component';
import { MdDialog } from '@angular/material';

/*
This class encapsulates the necessary methods to trigger dialogs.
*/
@Injectable()
export class AlertGenerator{

    constructor(private dialog : MdDialog){

    }

    //Methods on AuthDialogComponent
    generateAuthAlert(message : string){

    let dialogRef = this.dialog.open(AuthDialogComponent, {
      data: "Error: "+message,
    });

    }

    generateRegistrationConfirm(message : string){

    let dialogRef = this.dialog.open(AuthDialogComponent, {
      data: message,
    });

    }

    //Methods on ConfirmDialogComponent
    confirmDelete(message : string){
      let dialogRef = this.dialog.open(ConfirmDialogComponent, {
        data: message
      });

      return dialogRef.afterClosed();
      

    }

}