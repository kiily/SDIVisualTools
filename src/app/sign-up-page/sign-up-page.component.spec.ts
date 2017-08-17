import { RouterLinkWithHref } from '@angular/router';
import { By } from '@angular/platform-browser';
import { AuthService } from './../services/auth.service';
import { MD_DIALOG_DATA, MdDialog, MdDialogRef } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { firebaseConfig } from '../app.module';
import { AngularFireDatabaseModule } from 'angularfire2/database/database.module';
import { AngularFireAuth } from 'angularfire2/auth';
import { FirebaseApp } from 'angularfire2/app';
import { AlertGenerator } from '../common/alerts/alert-generator';
import { AuthValidator } from '../common/validators/auth.validator';
import { it } from '@angular/cli/lib/ast-tools/spec-utils';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SignUpPageComponent } from './sign-up-page.component';
import { AngularFireModule } from "angularfire2";



describe('SignUpPageComponent', () => {
  let component: SignUpPageComponent;
  let fixture: ComponentFixture<SignUpPageComponent>;
  let authService: AuthService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SignUpPageComponent],
      imports: [RouterTestingModule, FormsModule, ReactiveFormsModule,
        AngularFireModule.initializeApp(firebaseConfig),
        AngularFireDatabaseModule],
      providers: [AuthService, AngularFireAuth, FirebaseApp, AlertGenerator, AuthValidator,
        { provide: MD_DIALOG_DATA, useValue: {} },
        { provide: MdDialog, useValue: {} },
        { provide: MdDialogRef, useValue: {} }
      ]
    })
      .compileComponents().then(() => {
        authService = TestBed.get(AuthService);
      });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUpPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should create a form with 5 form controls', () => {
    expect(component.signUpForm.contains('email')).toBeTruthy();
    expect(component.signUpForm.contains('firstName')).toBeTruthy();
    expect(component.signUpForm.contains('lastName')).toBeTruthy();
    expect(component.signUpForm.contains('password')).toBeTruthy();
    expect(component.signUpForm.contains('repeatPassword')).toBeTruthy();
  })

  it('should make email and password controls required', () => {
    let emailControl = component.signUpForm.get('email');
    let passwordControl = component.signUpForm.get('password');
    let repeatPasswordControl = component.signUpForm.get('repeatPassword')

    emailControl.setValue('');
    passwordControl.setValue('');
    repeatPasswordControl.setValue('');

    expect(emailControl.valid).toBeFalsy();
    expect(passwordControl.valid).toBeFalsy();
    expect(repeatPasswordControl.valid).toBeFalsy();
  });

  it('should have a link back to the login page', () => {
    let debugElements = fixture.debugElement.queryAll(By.directive(RouterLinkWithHref));

    let index = debugElements.findIndex(de => de.properties['href'] === '/welcome-page');

    expect(index).toBeGreaterThan(-1);

  });

});
