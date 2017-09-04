import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { Injectable } from '@angular/core';
import { ErrorDialogComponent } from './error-dialog/error-dialog.component';
import { MdDialog } from '@angular/material';

/*
This class encapsulates the necessary methods to trigger dialogs.
*/
@Injectable()
export class AlertGenerator{

    constructor(private dialog : MdDialog){

    }

    //Methods on ErrorDialogComponent
    //Can reuse the ErrorDialogComponent for all errors and even notifications
    generateAuthAlert(message : string){

    let dialogRef = this.dialog.open(ErrorDialogComponent, {
      data: "Error: "+message,
    });

    }

    generateConfirmNotification(message : string){

    let dialogRef = this.dialog.open(ErrorDialogComponent, {
      data: message,
    });

    }

    generateDataAdditionError(message : string){

      let dialogRef = this.dialog.open(ErrorDialogComponent, {
      data: "Error: Your data could not be added. "+message,
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