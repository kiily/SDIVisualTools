import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'pyramid-navbar',
  templateUrl: './pyramid.component.html',
  styleUrls: ['./pyramid.component.css']
})
export class PyramidComponent implements OnInit {

  constructor(private router : Router) { }

  ngOnInit() {
  }

    //navigate to scaffolding
  goToScaffolding(){
    this.router.navigate(['/scaffolding']);

  }

  goToDiscovery(){
    this.router.navigate(['/discovery']);

  }

  goToInnovation(){
    this.router.navigate(['/innovation']);

  }
}
