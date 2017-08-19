import { WjGridModule } from '../../wijmo-commonjs-min/wijmo.angular2.grid';
import { DiscoveryService } from './services/discovery.service';
import { AppGlobalErrorHandler } from './common/error-handling/app-global-error-handler';
import { HttpModule } from '@angular/http';
import { AuthValidator } from './common/validators/auth.validator';
import { AlertGenerator } from './common/alerts/alert-generator';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InnoflowService } from './services/innoflow.service';
import { AuthService } from './services/auth.service';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SEATService } from './services/seat.service';
import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, ErrorHandler, NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { SDINavbarComponent } from './sdinavbar/sdinavbar.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { ScaffoldingComponent } from './scaffolding/scaffolding.component';
import { DiscoveryComponent } from './discovery/discovery.component';
import { InnovationComponent } from './innovation/innovation.component';
import { HomeComponent } from './home/home.component';
import { HexagonMenuComponent } from './hexagon-menu/hexagon-menu.component';
import { MarkdownModule } from 'angular2-markdown'
import { MdDialogModule } from '@angular/material';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { rootRouterConfig } from './app.routes';
import { AuthDialogComponent } from './common/alerts/auth-dialog/auth-dialog.component';
import { SignUpPageComponent } from './sign-up-page/sign-up-page.component';
import { ConfirmDialogComponent } from './common/alerts/confirm-dialog/confirm-dialog.component';




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
    ConfirmDialogComponent

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
    WjGridModule,
    MarkdownModule.forRoot(),
    RouterModule.forRoot(rootRouterConfig),
    AngularFireModule.initializeApp(firebaseConfig),

  ],
  providers: [
    SEATService,
    AuthService,
    DiscoveryService,
    InnoflowService,
    AlertGenerator,
    AuthValidator
    //replace the default error handler with the global error handler
    //should revert this and retest
    // { provide: ErrorHandler, useClass: AppGlobalErrorHandler}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
