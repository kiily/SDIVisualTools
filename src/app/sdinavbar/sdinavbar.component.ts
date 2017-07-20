import { consoleTestResultHandler } from 'tslint/lib/test';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'sdinavbar',
  templateUrl: './sdinavbar.component.html',
  styleUrls: ['./sdinavbar.component.css']
})
export class SDINavbarComponent implements OnInit {
  dataTings;

  constructor() { }

  //interface
  ngOnInit() {
  }

  onKeyUp(){
    console.log(this.dataTings);
  }

}
