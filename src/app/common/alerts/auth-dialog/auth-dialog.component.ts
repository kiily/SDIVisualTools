import { Component, Inject, OnInit } from '@angular/core';
import {MD_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'auth-dialog',
  templateUrl: './auth-dialog.component.html',
  styleUrls: ['./auth-dialog.component.css']
})

/* This class controls the AuthDialogComponent that is used to generate an alert tailored for authentication messages.

References:
 - https://material.angular.io/components/dialog/overview
 
 */
export class AuthDialogComponent implements OnInit {

  constructor(@Inject(MD_DIALOG_DATA) public data : string) { }

  ngOnInit() {
  }

}
