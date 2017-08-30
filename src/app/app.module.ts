import { InnoflowHttpService } from './services/innoflow-services/innoflow-http.service';
import { DiscoveryHttpService } from './services/discovery-services/discovery-http.service';
import { SEATFirebaseService } from './services/seat-services/seat-firebase.service';
import { InnoflowFirebaseService } from './services/innoflow-services/innoflow-firebase.service';
import { DiscoveryFirebaseService } from './services/discovery-services/discovery-firebase.service';
import { AppGlobalErrorHandler } from './common/error-handling/app-global-error-handler';
import { HttpModule } from '@angular/http';
import { AuthValidator } from './common/validators/auth.validator';
import { AlertGenerator } from './common/alerts/alert-generator';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthService } from './services/auth.service';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SEATHttpService } from './services/seat-services/seat-http.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { AppComponent } from './app.component';
import { SDINavbarComponent } from './components/sdinavbar/sdinavbar.component';
import { WelcomePageComponent } from './pages/welcome-page/welcome-page.component';
import { ScaffoldingComponent } from './pages/scaffolding/scaffolding.component';
import { DiscoveryComponent } from './pages/discovery/discovery.component';
import { InnovationComponent } from './pages/innovation/innovation.component';
import { HomeComponent } from './pages/home/home.component';
import { HexagonMenuComponent } from './components/hexagon-menu/hexagon-menu.component';
import { MarkdownModule } from 'angular2-markdown'
import { MdDialogModule } from '@angular/material';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { rootRouterConfig } from './app.routes';
import { AuthDialogComponent } from './common/alerts/auth-dialog/auth-dialog.component';
import { SignUpPageComponent } from './pages/sign-up-page/sign-up-page.component';
import { ConfirmDialogComponent } from './common/alerts/confirm-dialog/confirm-dialog.component';
import { LogoutComponent } from './components/logout/logout.component';
import { SafeURLPipe } from './pipes/safe-url.pipe';

/*GLOBAL REFERENCES - these tutorials where helpful during the dev process

 - https://www.udemy.com/angular-2-tutorial-for-beginners/learn/v4/content
 - https://www.udemy.com/testing-angular-apps/learn/v4/content

*/


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
    WelcomePageComponent,
    ScaffoldingComponent,
    DiscoveryComponent,
    InnovationComponent,
    HomeComponent,
    HexagonMenuComponent,
    AuthDialogComponent,
    SignUpPageComponent,
    ConfirmDialogComponent,
    LogoutComponent,
    SafeURLPipe,
  ],
  entryComponents: [
    AuthDialogComponent,
    ConfirmDialogComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    MdDialogModule,
    BrowserAnimationsModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    MarkdownModule.forRoot(),
    RouterModule.forRoot(rootRouterConfig),
    AngularFireModule.initializeApp(firebaseConfig),

  ],
  providers: [
    SEATFirebaseService,
    SEATHttpService,
    AuthService,
    DiscoveryFirebaseService,
    DiscoveryHttpService,
    InnoflowHttpService,
    InnoflowFirebaseService,
    AlertGenerator,
    AuthValidator
    //replace the default error handler with the global error handler
    // { provide: ErrorHandler, useClass: AppGlobalErrorHandler}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
