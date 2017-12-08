import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Component({
  selector: 'app-home-cards',
  templateUrl: './home-cards.component.html',
  styleUrls: ['./home-cards.component.scss']
})
export class HomeCardsComponent implements OnInit {

  cards = [
    {scaffolding : false},
    {discovery: false},
    {innovation: false},
    {theory: false}
  ];


  constructor() { }

  ngOnInit() {
  }

  toggleCard(cardToToggle: string ) {
    switch (cardToToggle) {
      case 'scaffolding':
        this.cards['scaffolding'] = true;
        break;
        case 'discovery':
        this.cards['discovery'] = true;
        break;
        case 'innovation':
        this.cards['innovation'] = true;
        break;
        case 'theory':
        this.cards['theory'] = true;
        break;
    }
  }

  unToggleCard(unToggle:  string){
    switch (unToggle) {
      case 'scaffolding':
        this.cards['scaffolding'] = false;
        break;
        case 'discovery':
        this.cards['discovery'] = false;
        break;
        case 'innovation':
        this.cards['innovation'] = false;
        break;
        case 'theory':
        this.cards['theory'] = false;
        break;
    }
  }


//refactor card content into a constant in this folder
}
