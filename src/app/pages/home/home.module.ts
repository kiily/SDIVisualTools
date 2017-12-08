import { HomeComponent } from './home.component';
import { ScrollIconComponent } from './scroll-icon/scroll-icon.component';
import { HomeCardsComponent } from './home-cards/home-cards.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    HomeCardsComponent,
    ScrollIconComponent
  ],
  exports:[
    HomeCardsComponent,
    ScrollIconComponent
  ]
})
export class HomeModule { }
