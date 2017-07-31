import { consoleTestResultHandler } from 'tslint/lib/test';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'sdinavbar',
  templateUrl: './sdinavbar.component.html',
  styleUrls: ['./sdinavbar.component.css']
})
export class SDINavbarComponent implements OnInit {
  @Input('isOpen') isOpen : boolean;
  @Output('change') click = new EventEmitter();

  overlay : boolean = false;

  dataTings;

  constructor() { }

  //interface
  ngOnInit() {
  }

  onKeyUp(){
    console.log(this.dataTings);
  }

  activateMenu(){
    this.isOpen = !this.isOpen;
    this.click.emit({ newValue: this.isOpen});
    console.log(this.isOpen);

    this.overlay = true;
  }




}
