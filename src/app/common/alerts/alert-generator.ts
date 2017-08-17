import { Injectable } from '@angular/core';
import { AuthDialogComponent } from './auth-dialog/auth-dialog.component';
import { MdDialog } from '@angular/material';

@Injectable()
export class AlertGenerator{

    constructor(private dialog : MdDialog){

    }

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

}