import { SEATHttpService } from '../../services/seat-services/seat-http.service';
import { MD_DIALOG_DATA, MdDialog, MdDialogRef } from '@angular/material';
import { AlertGenerator } from '../../common/alerts/alert-generator';
import { SEATFirebaseService } from '../../services/seat-services/seat-firebase.service';
import { RouterTestingModule } from '@angular/router/testing';
import { AngularFireDatabase } from 'angularfire2/database';
import { firebaseConfig } from './../../app.module';
import { FirebaseApp } from 'angularfire2/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthService } from '../../services/auth.service';
import { ReactiveFormsModule } from '@angular/forms';
import { LogoutComponent } from '../../components/logout/logout.component';
import { SDINavbarComponent } from '../../components/sdinavbar/sdinavbar.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AddScaffoldingDataPageComponent } from './add-scaffolding-data-page.component';
import { AngularFireModule } from "angularfire2";

describe('AddScaffoldingDataPageComponent', () => {
  let component: AddScaffoldingDataPageComponent;
  let fixture: ComponentFixture<AddScaffoldingDataPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddScaffoldingDataPageComponent, SDINavbarComponent,
      LogoutComponent ],
      imports: [RouterTestingModule, ReactiveFormsModule,  AngularFireModule.initializeApp(firebaseConfig)],
      providers: [AuthService, AngularFireAuth, FirebaseApp, AngularFireDatabase, SEATFirebaseService,
      AlertGenerator,
      { provide: MD_DIALOG_DATA, useValue: {} },
      { provide: MdDialog, useValue: {} },
      { provide: MdDialogRef, useValue: {} }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddScaffoldingDataPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }); 

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should create a add modules form with 4 form controls', () => {
    expect(component.addModuleForm.contains('moduleID')).toBeTruthy();
    expect(component.addModuleForm.contains('moduleName')).toBeTruthy();
    expect(component.addModuleForm.contains('classSize')).toBeTruthy();
    expect(component.addModuleForm.contains('phase')).toBeTruthy();
  });

  it('should create a add problem Sheets form with 5 form controls', () => {
    expect(component.addProblemSheetForm.contains('problemSheetID')).toBeTruthy();
    expect(component.addProblemSheetForm.contains('problemSheetTitle')).toBeTruthy();
    expect(component.addProblemSheetForm.contains('moduleID')).toBeTruthy();
    expect(component.addProblemSheetForm.contains('releaseDate')).toBeTruthy();
    expect(component.addProblemSheetForm.contains('deadline')).toBeTruthy();
  });

  it('should create a add student module form with 2 form controls', () => {
    expect(component.addStudentModuleForm.contains('studentID')).toBeTruthy();
    expect(component.addStudentModuleForm.contains('moduleID')).toBeTruthy();
  });


  it('should create a add problem form with 3 form controls', () => {
    expect(component.addProblemForm.contains('problemID')).toBeTruthy();
    expect(component.addProblemForm.contains('problemSheetID')).toBeTruthy();
    expect(component.addProblemForm.contains('problemTitle')).toBeTruthy();
  });

  it('should create a add attempt form with 4 form controls', () => {
    expect(component.addAttemptForm.contains('studentID')).toBeTruthy();
    expect(component.addAttemptForm.contains('problemID')).toBeTruthy();
    expect(component.addAttemptForm.contains('compile')).toBeTruthy();
    expect(component.addAttemptForm.contains('output')).toBeTruthy();
    expect(component.addAttemptForm.contains('date')).toBeTruthy();
  });

  it('add modules controls are required', () => {
    let moduleIDControl = component.addModuleForm.get('moduleID');
    let moduleNameControl = component.addModuleForm.get('moduleName');
    let classSizeControl = component.addModuleForm.get('classSize');
    let phaseControl = component.addModuleForm.get('phase');


    moduleIDControl.setValue('');
    moduleNameControl.setValue('');
    classSizeControl.setValue('');
    phaseControl.setValue('');

    expect(moduleIDControl.valid).toBeFalsy();
    expect(moduleNameControl.valid).toBeFalsy();
    expect(classSizeControl.valid).toBeFalsy();
    expect(phaseControl.valid).toBeFalsy();

  });

  it('add problem sheets controls are required', () => {
    let moduleIDControl = component.addProblemSheetForm.get('moduleID');
    let problemSheetIDControl = component.addProblemSheetForm.get('problemSheetID');
    let problemSheetTitleControl = component.addProblemSheetForm.get('problemSheetTitle');
    let releaseDateControl = component.addProblemSheetForm.get('releaseDate');
    let deadlineControl = component.addProblemSheetForm.get('deadline');


    moduleIDControl.setValue('');
    problemSheetIDControl.setValue('');
    problemSheetTitleControl.setValue('');
    releaseDateControl.setValue('');
    deadlineControl.setValue('');

    expect(moduleIDControl.valid).toBeFalsy();
    expect(problemSheetIDControl.valid).toBeFalsy();
    expect(problemSheetTitleControl.valid).toBeFalsy();
    expect(releaseDateControl.valid).toBeFalsy();
    expect(deadlineControl.valid).toBeFalsy();

  });

  
  it('add student module controls are required', () => {
    let moduleIDControl = component.addStudentModuleForm.get('moduleID');
    let studentIDControl = component.addStudentModuleForm.get('studentID');
   


    moduleIDControl.setValue('');
    studentIDControl.setValue('');
  
    expect(moduleIDControl.valid).toBeFalsy();
    expect(studentIDControl.valid).toBeFalsy();

  });

  it('add problem controls are required', () => {
    let problemSheetIDControl = component.addProblemForm.get('problemSheetID');
    let problemIDControl = component.addProblemForm.get('problemID');
    let problemTitleControl = component.addProblemForm.get('problemTitle');
   
    problemSheetIDControl.setValue('');
    problemIDControl.setValue('');
    problemTitleControl.setValue('');
  
    expect(problemSheetIDControl.valid).toBeFalsy();
    expect(problemIDControl.valid).toBeFalsy();
    expect(problemTitleControl.valid).toBeFalsy();

  });

  it('add attempt controls are required', () => {
    let problemIDControl = component.addAttemptForm.get('problemID');
    let studentIDControl = component.addAttemptForm.get('studentID');
    let compileControl = component.addAttemptForm.get('compile');
    let outputIDControl = component.addAttemptForm.get('output');
    let dateControl = component.addAttemptForm.get('date');
   

    problemIDControl.setValue('');
    studentIDControl.setValue('');
    compileControl.setValue('');
    outputIDControl.setValue('');
    dateControl.setValue('');
  
    expect(problemIDControl.valid).toBeFalsy();
    expect(studentIDControl.valid).toBeFalsy();
    expect(compileControl.valid).toBeFalsy();
    expect(outputIDControl.valid).toBeFalsy();
    expect(dateControl.valid).toBeFalsy();

  });


});
