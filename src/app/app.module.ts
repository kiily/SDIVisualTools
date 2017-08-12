import { AppGlobalErrorHandler } from './common/error-handling/app-global-error-handler';
import { HttpModule } from '@angular/http';
import { InnoflowService } from './services/innoflow.service';
import { AuthService } from './services/auth.service';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SEATService } from './services/seat.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { AppComponent } from './app.component';
import { SDINavbarComponent } from './sdinavbar/sdinavbar.component';
import { LikeComponent } from './like/like.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { ScaffoldingComponent } from './scaffolding/scaffolding.component';
import { DiscoveryComponent } from './discovery/discovery.component';
import { InnovationComponent } from './innovation/innovation.component';
import { HomeComponent } from './home/home.component';
import { HexagonMenuComponent } from './hexagon-menu/hexagon-menu.component';
import { AngularFireModule } from 'angularfire2';
import { MarkdownModule } from 'angular2-markdown'
import { rootRouterConfig } from './app.routes';


//Firebase database configuration settings
export const firebaseConfig = {
  apiKey: "AIzaSyDpKv2ZSRCffWFSua8lgy2YLVwTSHo_tRE",
  authDomain: "sdi-visual-tools.firebaseapp.com",
  databaseURL: "https://sdi-visual-tools.firebaseio.com",
  projectId: "sdi-visual-tools",
  storageBucket: "sdi-visual-tools.appspot.com",
  messagingSenderId: "759960395397"
}

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
    HexagonMenuComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(rootRouterConfig),
    AngularFireModule.initializeApp(firebaseConfig),
    MarkdownModule.forRoot()

  ],
  providers: [
    SEATService,
    AuthService,
    InnoflowService,
    //replace the default error handler with the global error handler
    { provide: ErrorHandler, useClass: AppGlobalErrorHandler}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
