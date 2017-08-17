import { MD_DIALOG_DATA, MdDialogRef } from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})


export class ConfirmDialogComponent implements OnInit {

  constructor(@Inject(MD_DIALOG_DATA) public data : string, public dialogRef : MdDialogRef<ConfirmDialogComponent>) { 

  }

  ngOnInit() {
  }

}