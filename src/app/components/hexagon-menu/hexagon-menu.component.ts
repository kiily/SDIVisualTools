import { Component, OnInit } from '@angular/core';


/*This class acts as the controller for the HexagonMenu component; this is the main navigation
method of the home page. It is associated with an HTML template that renders the honey-comb menu.

References:
 - https://github.com/web-tiki/responsive-grid-of-hexagons - Accessed August 2017*/
@Component({
  selector: 'hexagon-menu',
  templateUrl: './hexagon-menu.component.html',
  styleUrls: ['./hexagon-menu.component.scss']
})
export class HexagonMenuComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
