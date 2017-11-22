import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})

/* This class controls the ConfirmDialogComponent that is used to generate a confirmation dialog.

References:
 - https://material.angular.io/components/dialog/overview - Acessed August 2017
 
 */
export class ConfirmDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data : string, public dialogRef : MatDialogRef<ConfirmDialogComponent>) { 

  }

  ngOnInit() {
  }

}
