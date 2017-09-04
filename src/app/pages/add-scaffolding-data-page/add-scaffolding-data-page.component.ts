import { async } from '@angular/core/testing';
import { SEATHttpService } from './../../services/seat-services/seat-http.service';
import { AlertGenerator } from '../../common/alerts/alert-generator';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { FirebaseListObservable } from 'angularfire2/database/firebase_list_observable';
import { SEATFirebaseService } from '../../services/seat-services/seat-firebase.service';
import { AuthService } from '../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import * as FileSaver from 'file-saver';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-add-scaffolding-data-page',
  templateUrl: './add-scaffolding-data-page.component.html',
  styleUrls: ['./add-scaffolding-data-page.component.css']
})
export class AddScaffoldingDataPageComponent implements OnInit {

  phases: FirebaseListObservable<any[]>;
  modules: FirebaseListObservable<any[]>;
  problemSheets: FirebaseListObservable<any[]>;
  problems: FirebaseListObservable<any[]>;
  students: FirebaseListObservable<any[]>;
  studentModules : FirebaseListObservable<any[]>;


  //Arrays are used to check for uniqueness
  problemSheetIDs: number[] = [];
  moduleCodes: any[] = [];
  problemIDs: number[] = [];
  studentModulesPairs : any[] =[];


  addModuleForm: FormGroup;
  addProblemSheetForm: FormGroup;
  addProblemForm: FormGroup;
  addAttemptForm: FormGroup;
  addStudentModuleForm : FormGroup;

  sharePointLink;
  dataTree;

  constructor(private authService: AuthService, private seatFirebaseService: SEATFirebaseService,
    private formBuilder: FormBuilder, private alertGenerator: AlertGenerator,
    private seatHttpService: SEATHttpService) {

    this.addModuleForm = formBuilder.group({
      moduleID: ["", Validators.required],
      moduleName: ["", Validators.required],
      classSize: ["", Validators.required],
      phase: ["", Validators.required]
    });

    this.addProblemSheetForm = formBuilder.group({
      problemSheetID: ["", Validators.required],
      problemSheetTitle: ["", Validators.required],
      moduleID: ["", Validators.required],
      releaseDate: ["", Validators.required],
      deadline: ["", Validators.required]
    });

    this.addStudentModuleForm = formBuilder.group({
      studentID: ["", Validators.required],
      moduleID: ["", Validators.required]
    })

    this.addProblemForm = formBuilder.group({
      problemID: ["", Validators.required],
      problemSheetID: ["", Validators.required],
      problemTitle: ["", Validators.required],
    });

    this.addAttemptForm = formBuilder.group({
      studentID: ["", Validators.required],
      problemID: ["", Validators.required],
      compile: ["", Validators.required],
      output: ["", Validators.required],
      date: ["", Validators.required],
    });
    
  }


  ngOnInit() {
    

    //Checking that a user is logged in
    this.authService.userScan();

    this.seatFirebaseService.getAppLink().subscribe(appLink => {
      this.sharePointLink = appLink.sharePointLink;
    });

     this.seatFirebaseService.getScaffoldingDataTree().subscribe(snapshot => {

      this.dataTree = JSON.stringify(snapshot);
   
     })

    //extract the arrays of modules and problems sheets here
    this.phases = this.seatFirebaseService.getPhases();
    this.students = this.seatFirebaseService.getStudents();
    this.modules = this.seatFirebaseService.getModules();
    this.problemSheets = this.seatFirebaseService.getProblemSheets();
    this.problems = this.seatFirebaseService.getProblems();
    this.studentModules = this.seatFirebaseService.getStudentModules();

    this.modules.subscribe(modules => {
      for (let mod of modules) {
        this.moduleCodes.push(mod.$key);
      }
    });

    this.problemSheets.subscribe(problemSheets => {
      for (let pS of problemSheets) {
        this.problemSheetIDs.push(Number(pS.$key));

      }
    });

    this.problems.subscribe(problems => {
      for (let problem of problems) {
        this.problemIDs.push(Number(problem.$key));
      }
    });

    this.studentModules.subscribe(studentModulePairs => {
      for(let pair of studentModulePairs){
        this.studentModulesPairs.push(pair);
        console.log(this.studentModulesPairs);
      }
    })

  }

  /*This method takes the values from the addScaffoldingModuleForm and checks whether the module code provided
  is unique. If it is, the new module is added to the database. If not, an error message is generated*/
  addModule() {

    if(!this.addModuleForm.invalid){

    let moduleCode = this.addModuleForm.controls.moduleID.value;
    let moduleName = this.addModuleForm.controls.moduleName.value;
    let classSize = this.addModuleForm.controls.classSize.value;
    let phaseID = this.addModuleForm.controls.phase.value;

    if (!this.moduleCodes.includes(moduleCode)) {
      //module id is unique

      //reset form
      this.addModuleForm.reset();


      //if it is unique, add to the database
      this.seatFirebaseService.addModule(moduleCode, moduleName, classSize, phaseID);

      //notify user
      this.alertGenerator.generateConfirmNotification("Success. A new module was successfully added");


    } else {
      //module already exists, throw an alert
      this.alertGenerator.generateDataAdditionError("The Module Code you entered already exists")
    }

    }else{
      //Notify user that a field is required
      this.alertGenerator.generateDataAdditionError("Please provide a value for all fields.")
    }
  }

  addProblemSheet() {

    if(!this.addProblemSheetForm.invalid){

    let problemSheetID = this.addProblemSheetForm.controls.problemSheetID.value;
    let problemSheetTitle = this.addProblemSheetForm.controls.problemSheetTitle.value;
    let moduleID = this.addProblemSheetForm.controls.moduleID.value;
    let releaseDate = this.addProblemSheetForm.controls.releaseDate.value;
    let deadline = this.addProblemSheetForm.controls.deadline.value;

    if (!this.problemSheetIDs.includes(problemSheetID)) {
      //if problemSheetID is unique

      //reset form
      this.addProblemSheetForm.reset();

      //add problem sheet
      this.seatFirebaseService.addProblemSheet(problemSheetID, problemSheetTitle, moduleID, releaseDate, deadline);

      //notify user
      this.alertGenerator.generateConfirmNotification("Success. A new problem sheet was successfully added to " + moduleID);
    } else {
      //problemSheet already exists, throw an alert
      this.alertGenerator.generateDataAdditionError("The ProblemSheetID must be unique.");
    }

    }else{
      //Notify user that a field is required
      this.alertGenerator.generateDataAdditionError("Please provide a value for all fields.");
    }

  }

  addProblem() {

    if(!this.addProblemForm.invalid){

    let problemID = this.addProblemForm.controls.problemID.value;
    let problemSheetID = this.addProblemForm.controls.problemSheetID.value;
    let problemTitle = this.addProblemForm.controls.problemTitle.value;

    if (!this.problemIDs.includes(problemID)) {
      //if problemID is unique

      //reset form
      this.addProblemForm.reset();

      //add problem sheet
      this.seatFirebaseService.addProblem(problemID, problemSheetID, problemTitle);

      //notify user
      this.alertGenerator.generateConfirmNotification("Success. A new problem (ID: "+problemID+") was successfully added to problem sheet " + problemSheetID);
    } else {
      //problem already exists, throw an alert
      this.alertGenerator.generateDataAdditionError("The ProblemID must be unique.");
    }

    }else{
      //Notify user that a field is required
      this.alertGenerator.generateDataAdditionError("Please provide a value for all fields.");
    }
  }

  addAttempt() {

    if(!this.addAttemptForm.invalid){

    let studentID = this.addAttemptForm.controls.studentID.value;
    let problemID = this.addAttemptForm.controls.problemID.value;
    let output = this.addAttemptForm.controls.output.value;
    let compile = this.addAttemptForm.controls.compile.value;
    let date = this.addAttemptForm.controls.date.value;

    this.seatFirebaseService.addAttempt(studentID, problemID, output, compile, date);
    this.alertGenerator.generateConfirmNotification("Success. A new attempt was successfully added");

    }else{
      //Notify user that a field is required
      this.alertGenerator.generateDataAdditionError("Please provide a value for all fields.")
    }
  }


  addStudentModule(){

    if(!this.addStudentModuleForm.invalid){

    let studentID = this.addStudentModuleForm.controls.studentID.value;
    let moduleID = this.addStudentModuleForm.controls.moduleID.value;

    if(this.studentModulesPairs.includes({moduleID : moduleID, studentID : studentID})){

    this.seatFirebaseService.addStudentModule(studentID, moduleID);
    this.alertGenerator.generateConfirmNotification("Success. Student "+studentID+" was enrolled into "+moduleID+".");
    
    }else{
      //Notify user that a field is required
      this.alertGenerator.generateDataAdditionError("Student "+studentID+" is already enrolled in "+moduleID+".")
    }
  }else{
     //Notify user that a field is required
      this.alertGenerator.generateDataAdditionError("Please provide a value for all fields.")
  }

  }

  exportJSONTree() {
  
      let blob = new Blob([this.dataTree], { type: 'json' });
      FileSaver.saveAs(blob, "sdi-visual-tools-export.json");
     
  }


}
