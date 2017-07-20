import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SEATService } from './seat.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SDINavbarComponent } from './sdinavbar/sdinavbar.component';
import { LikeComponent } from './like/like.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';

@NgModule({
  declarations: [
    AppComponent,
    SDINavbarComponent,
    LikeComponent,
    WelcomePageComponent
  ],
  imports: [
    BrowserModule, 
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    SEATService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
