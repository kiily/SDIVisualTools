import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-scaffolding',
  templateUrl: './scaffolding.component.html',
  styleUrls: ['./scaffolding.component.css']
})
export class ScaffoldingComponent implements OnInit {
  phaseNumber : number;

  constructor() { }

  ngOnInit() {
  }

  togglePhase(phaseNumber : number){
    this.phaseNumber= phaseNumber;
    console.log(this.phaseNumber);
    console.log(phaseNumber);
  }
}
