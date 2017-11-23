import { Component, Inject, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'error-dialog',
  templateUrl: './error-dialog.component.html',
  styleUrls: ['./error-dialog.component.scss']
})

/* This class controls the AuthDialogComponent that is used to generate an alert tailored for authentication messages.

References:
 - https://material.angular.io/components/dialog/overview - Accessed August 2017
 
 */
export class ErrorDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data : string) { }

  ngOnInit() {
  }

}
