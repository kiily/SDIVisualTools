import { AlertGenerator } from '../../common/alerts/alert-generator';
import { FormBuilder, Validators } from '@angular/forms';
import { FirebaseListObservable } from 'angularfire2/database/firebase_list_observable';
import { SEATFirebaseService } from '../../services/seat-services/seat-firebase.service';
import { AuthService } from '../../services/auth.service';
import { Component, OnInit } from '@angular/core';
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

  problemSheetIDs: number[] = [];
  moduleCodes: any[] = [];

  addScaffoldingModuleForm: any;
  addScaffoldingProblemSheetForm: any;
  addScaffoldingProblemForm: any;

  constructor(private authService: AuthService, private seatFirebaseService: SEATFirebaseService,
    private formBuilder: FormBuilder, private alertGenerator: AlertGenerator) {

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
    })
  }


  ngOnInit() {

    //Checking that a user is logged in
    this.authService.userScan();
    //extract the arrays of modules and problems sheets here

    this.phases = this.seatFirebaseService.getPhases();
    this.modules = this.seatFirebaseService.getModules();
    this.problemSheets = this.seatFirebaseService.getProblemSheets();


    this.modules.subscribe(modules => {
      for (let mod of modules) {
        this.moduleCodes.push(mod.$key);
      }
    })

    this.problemSheets.subscribe(problemSheets => {
      for (let pS of problemSheets) {
        this.problemSheetIDs.push(Number(pS.$key));

      }
      console.log(this.problemSheetIDs)
    })
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
      this.alertGenerator.generateDataAdditionError("The Module Code you entered already exists")
    }









  }

}
