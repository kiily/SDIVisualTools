import { SEATService } from './seat.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SDINavbarComponent } from './sdinavbar/sdinavbar.component';

@NgModule({
  declarations: [
    AppComponent,
    SDINavbarComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    SEATService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
