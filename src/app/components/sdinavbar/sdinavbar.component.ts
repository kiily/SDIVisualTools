import { consoleTestResultHandler } from 'tslint/lib/test';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

/*
/*This class acts as the controller for the SDINavbar component; this is the main navigation
method of the scaffoding, discovery and innovation pages. It is associated with an HTML template
that renders the navbar on the top-left corner of the page. The navbar provides a way of navigating
between the home, scaffolding, discovery and innovation pages.

References:
- https://bootsnipp.com/snippets/featured/fancy-sidebar-navigation
*/

@Component({
  selector: 'sdinavbar',
  templateUrl: './sdinavbar.component.html',
  styleUrls: ['./sdinavbar.component.scss']
})
export class SDINavbarComponent implements OnInit {
  isOpen: boolean = false;


  constructor() { }

  ngOnInit() {
  }

  activateMenu(){
    this.isOpen = !this.isOpen;
  }




}
