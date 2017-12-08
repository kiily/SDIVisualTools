import { trigger, state, style, animate, transition } from '@angular/animations';
import { consoleTestResultHandler } from 'tslint/lib/test';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

/*
/*This class acts as the controller for the SDINavbar component; this is the main navigation
method of the scaffoding, discovery and innovation pages. It is associated with an HTML template
that renders the navbar on the top-left corner of the page. The navbar provides a way of navigating
between the home, scaffolding, discovery and innovation pages.

References:
- https://bootsnipp.com/snippets/featured/fancy-sidebar-navigation
- https://angularfirebase.com/lessons/bootstrap-4-collapsable-navbar-work-with-angular/
*/

@Component({
  selector: 'sdinavbar',
  templateUrl: './sdinavbar.component.html',
  styleUrls: ['./sdinavbar.component.scss'],
  // animations: [
  //   trigger('collapse', [
  //     state('open', style({
  //       opacity: '1',
  //       display: 'block',
  //       transform: 'translate3d(0,0,0)',
  //       overflow: 'hidden',
  //       width: '220px'
  //      })),
  //      state('closed', style({
  //       opacity: '0',
  //       display: 'none',
  //       transform: 'translate3d(100%,0,0)'
  //      })),
  //      transition('closed => open', animate('200ms ease-in')),
  //      transition('open => closed', animate('100ms ease-out'))
  //   ])
  // ]
})
export class SDINavbarComponent implements OnInit {
  isOpen= false;

  constructor() { }

  ngOnInit() {
  }

  activateMenu() {
    this.isOpen = !this.isOpen;
  }




}
