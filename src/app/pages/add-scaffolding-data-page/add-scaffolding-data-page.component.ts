import { SEATHttpService } from './../../services/seat-services/seat-http.service';
import { AlertGenerator } from '../../common/alerts/alert-generator';
import { FormBuilder, Validators } from '@angular/forms';
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
  problems : FirebaseListObservable<any[]>;
  students : FirebaseListObservable<any[]>;


  //Arrays are used to check for uniqueness
  problemSheetIDs: number[] = [];
  moduleCodes: any[] = [];
  problemIDs : number[] =[];
  

  addScaffoldingModuleForm: any;
  addScaffoldingProblemSheetForm: any;
  addScaffoldingProblemForm: any;
  addScaffoldingAttemptForm : any;

  sharePointLink;

  constructor(private authService: AuthService, private seatFirebaseService: SEATFirebaseService,
    private formBuilder: FormBuilder, private alertGenerator: AlertGenerator,
     private seatHttpService : SEATHttpService) {

    this.addScaffoldingModuleForm = formBuilder.group({
      moduleCode: ["", Validators.required],
      moduleName: ["", Validators.required],
      classSize: ["", Validators.required],
      phase: ["", Validators.required]
    });

    this.addScaffoldingProblemSheetForm = formBuilder.group({
      problemSheetID: ["", Validators.required],
      problemSheetTitle: ["", Validators.required],
      moduleID: ["", Validators.required],
      releaseDate: ["", Validators.required],
      deadline: ["", Validators.required]
    });

    this.addScaffoldingProblemForm = formBuilder.group({
      problemID: ["", Validators.required],
      problemSheetID: ["", Validators.required],
      problemTitle: ["", Validators.required],
    });

    this.addScaffoldingAttemptForm = formBuilder.group({
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
      console.log(this.sharePointLink);
    });
    
    //extract the arrays of modules and problems sheets here
    this.phases = this.seatFirebaseService.getPhases();
    this.students = this.seatFirebaseService.getStudents();
    this.modules = this.seatFirebaseService.getModules();
    this.problemSheets = this.seatFirebaseService.getProblemSheets();
    this.problems = this.seatFirebaseService.getProblems();

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
      for(let problem of problems){
        this.problemIDs.push(Number(problem.$key));
      }
    });

  }

  /*This method takes the values from the addScaffoldingModuleForm and checks whether the module code provided
  is unique. If it is, the new module is added to the database. If not, an error message is generated*/
  addModule() {

    let moduleCode = this.addScaffoldingModuleForm.controls.moduleCode.value;
    let moduleName = this.addScaffoldingModuleForm.controls.moduleName.value;
    let classSize = this.addScaffoldingModuleForm.controls.classSize.value;
    let phaseID = this.addScaffoldingModuleForm.controls.phase.value;

    if (!this.moduleCodes.includes(moduleCode)) {
      //module id is unique

      //reset form
      this.addScaffoldingModuleForm.reset();


      //if it is unique, add to the database
      this.seatFirebaseService.addModule(moduleCode, moduleName, classSize, phaseID);

      //notify user
      this.alertGenerator.generateConfirmNotification("Success. A new module was successfully added");


    } else {
      //module already exists, throw an alert
      this.alertGenerator.generateDataAdditionError("The Module Code you entered already exists")
    }
  }

  addProblemSheet() {

    let problemSheetID = this.addScaffoldingProblemSheetForm.controls.problemSheetID.value;
    let problemSheetTitle = this.addScaffoldingProblemSheetForm.controls.problemSheetTitle.value;
    let moduleID = this.addScaffoldingProblemSheetForm.controls.moduleID.value;
    let releaseDate = this.addScaffoldingProblemSheetForm.controls.releaseDate.value;
    let deadline = this.addScaffoldingProblemSheetForm.controls.deadline.value;

    if (!this.problemSheetIDs.includes(problemSheetID)) {
      //if problemSheetID is unique

      //reset form
      this.addScaffoldingProblemSheetForm.reset();

      //add problem sheet
      this.seatFirebaseService.addProblemSheet(problemSheetID, problemSheetTitle, moduleID, releaseDate, deadline);

      //notify user
      this.alertGenerator.generateConfirmNotification("Success. A new problem sheet was successfully added to " + moduleID);
    } else {
      //problemSheet already exists, throw an alert
      this.alertGenerator.generateDataAdditionError("The ProblemSheetID must be unique.");
    }

  }

  addProblem(){

    let problemID = this.addScaffoldingProblemForm.controls.problemID.value;
    let problemSheetID = this.addScaffoldingProblemForm.controls.problemSheetID.value;
    let problemTitle = this.addScaffoldingProblemForm.controls.problemTitle.value;

    if(!this.problemIDs.includes(problemID)){
        //if problemID is unique

         //reset form
      this.addScaffoldingProblemForm.reset();

      //add problem sheet
      this.seatFirebaseService.addProblem(problemID, problemSheetID, problemTitle);

      //notify user
      this.alertGenerator.generateConfirmNotification("Success. A new problem was successfully added to problem sheet " + problemSheetID);
    }else{
      //problem already exists, throw an alert
      this.alertGenerator.generateDataAdditionError("The ProblemID must be unique.");
    }

  }

  addAttempt(){

    let studentID = this.addScaffoldingAttemptForm.controls.studentID.value;
    let problemID = this.addScaffoldingAttemptForm.controls.problemID.value;
    let output = this.addScaffoldingAttemptForm.controls.output.value;
    let compile = this.addScaffoldingAttemptForm.controls.compile.value;
    let date = this.addScaffoldingAttemptForm.controls.date.value;

    this.seatFirebaseService.addAttempt(studentID, problemID, output, compile, date);
  }

  exportJSONTree(){
    this.seatFirebaseService.getScaffoldingDataTree().subscribe( snapshot => {
      console.log(snapshot);


      
      // console.log(JSON.stringify(snapshot));

      let blob = new Blob([JSON.stringify(snapshot)], {type:'json'});
      FileSaver.saveAs(blob, "sdi-database.json");
    })

  }


}
