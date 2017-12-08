import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() title: string;

  // tracks whether the header is on the home page as it is different - no navbar
  isHome = true;

  constructor() { }

  ngOnInit() {
    if (this.title === 'home') {
      this.title = "SDI Visual Tools";
      this.isHome = true;
    }
    else {
      this.isHome = false;
    }
  }

}
