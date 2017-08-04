import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SEATService } from './services/seat.service';
import {PowerBIService} from './services/power-bi.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { SDINavbarComponent } from './sdinavbar/sdinavbar.component';
import { LikeComponent } from './like/like.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { ScaffoldingComponent } from './scaffolding/scaffolding.component';
import { DiscoveryComponent } from './discovery/discovery.component';
import { InnovationComponent } from './innovation/innovation.component';
import { HomeComponent } from './home/home.component';
import { PyramidComponent } from './pyramid/pyramid.component';
import { HexagonMenuComponent } from './hexagon-menu/hexagon-menu.component';

@NgModule({
  declarations: [
    AppComponent,
    SDINavbarComponent,
    LikeComponent,
    WelcomePageComponent,
    ScaffoldingComponent,
    DiscoveryComponent,
    InnovationComponent,
    HomeComponent,
    PyramidComponent,
    HexagonMenuComponent
  ],
  imports: [
    BrowserModule, 
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
     { path: '', component: WelcomePageComponent },
     { path: 'scaffolding', component: ScaffoldingComponent },    
     { path: 'discovery', component: DiscoveryComponent },
     {path: 'innovation', component: InnovationComponent},
     {path: 'home', component: HomeComponent},
     {path: 'welcome-page', component: WelcomePageComponent}
    ])
  ],
  providers: [
    SEATService,
    PowerBIService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
