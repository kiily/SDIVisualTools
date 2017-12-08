import { SERVICES } from './app.imports';
import { PagesModule } from './pages/pages.module';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { AppComponent } from './app.component';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { rootRouterConfig } from './app.routes';
import { environment } from './../environments/environment.prod';
/*GLOBAL REFERENCES - these tutorials where helpful during the dev process

 - https://www.udemy.com/angular-2-tutorial-for-beginners/learn/v4/content - Accessed July 2017
 - https://www.udemy.com/testing-angular-apps/learn/v4/content - Accessed July 2017

*/

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    PagesModule,
    BrowserAnimationsModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    RouterModule.forRoot(rootRouterConfig),
    AngularFireModule.initializeApp(environment.firebaseConfig),

  ],
  providers: [
    SERVICES
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
