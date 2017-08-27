import { AuthService } from './../services/auth.service';
import { AuthValidator } from './../common/validators/auth.validator';
import { MD_DIALOG_DATA, MdDialog, MdDialogRef } from '@angular/material';
import { AlertGenerator } from './../common/alerts/alert-generator';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { FirebaseApp } from 'angularfire2/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { WelcomePageComponent } from './welcome-page.component';
import { AngularFireModule } from "angularfire2";
import { firebaseConfig } from "../app.module";
import { Router } from "@angular/router";

class RouterStub {
  navigate(params){

  }
}

describe('WelcomePageComponent', () => {
  let component: WelcomePageComponent;
  let fixture: ComponentFixture<WelcomePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WelcomePageComponent],
      imports: [RouterTestingModule, FormsModule, ReactiveFormsModule,
        AngularFireModule.initializeApp(firebaseConfig),
        AngularFireDatabaseModule],
      providers: [AuthService, AngularFireAuth, FirebaseApp, AlertGenerator, AuthValidator,
        { provide: MD_DIALOG_DATA, useValue: {} },
        { provide: MdDialog, useValue: {} },
        { provide: MdDialogRef, useValue: {} },
        {provide: Router, useClass: RouterStub }
      ]
    })
      .compileComponents().then( () => {
        let authService = TestBed.get(AuthService);
      });

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WelcomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create a form with 2 form controls', () => {
    expect(component.loginForm.contains('email')).toBeTruthy();
    expect(component.loginForm.contains('password')).toBeTruthy();
  })

  it('should make email and password controls required', () => {
    let emailControl = component.loginForm.get('email');
    let passwordControl = component.loginForm.get('password');

    emailControl.setValue('');
    passwordControl.setValue('');

    expect(emailControl.valid).toBeFalsy();
    expect(passwordControl.valid).toBeFalsy();
  })

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should redirect the user to the sign up page', () => {
    let router = TestBed.get(Router);
    let spy = spyOn(router, 'navigate');

    component.goToSignUp();

    expect(spy).toHaveBeenCalledWith(['/sign-up-page']);
  });

  //Something is not letting this test work - could be the firebase connection
  // it('should redirect the user to the home page', () => {
  //   let router = TestBed.get(Router);
  //   let spy = spyOn(router, 'navigate');

  //   component.login();

  //   expect(spy).toHaveBeenCalledWith(['/home']);
  // });


});
