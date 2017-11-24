import { Attempt } from '../../common/models/scaffolding/attempt.model';
import { StudentModule } from './../../common/models/scaffolding/student-module.model';
import { Problem } from '../../common/models/scaffolding/problem.model';
import { Module } from '../../common/models/scaffolding/module.model';
import { Phase } from './../../common/models/scaffolding/phase.model';
import { AlertGenerator } from '../../components/alerts/alert-generator';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { SEATFirebaseService } from '../../services/seat-services/seat-firebase.service';
import { AuthService } from '../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import * as FileSaver from 'file-saver';
import 'rxjs/add/operator/map';
import * as XLSX from 'xlsx';
import { ProblemSheet } from '../../common/models/scaffolding/problem-sheet.model';
import { Student } from '../../common/models/scaffolding/student.model';

type AOA = Array<Array<any>>;


/* 

/*This class acts as the controller for the AddScaffoldingDataPage component. It is associated with an HTML template
that renders the add scaffolding data page. This class processes the scaffolding data submitted by the users and 
ensures that Problems, Modules, ProblemSheets are unique and that attempts can only be assigned to an existing student and 
an existing problem. The user can add new attempts, new modules, new problemSheets, new problems and enrol students into a module.
This class also provides buttons to access the data sources and export the complete Firebase JSON tree 

REFERENCES: 
 - https://github.com/SheetJS/js-xlsx/tree/master/demos/angular2 - Accessed August 2017
 
 */
@Component({
  selector: 'app-add-scaffolding-data-page',
  templateUrl: './add-scaffolding-data-page.component.html',
  styleUrls: ['./add-scaffolding-data-page.component.scss']
})
export class AddScaffoldingDataPageComponent implements OnInit {

  //Firebase Scaffolding data
  phases : Phase[] =[];
  modules : Module[] = [];
  problemSheets : ProblemSheet[] = [];
  problems : Problem[] = [];
  students : Student[] =[];
  studentModules : StudentModule[] =[];


  //Forms
  addModuleForm: FormGroup;
  addProblemSheetForm: FormGroup;
  addProblemForm: FormGroup;
  addAttemptForm: FormGroup;
  addStudentModuleForm : FormGroup;

  dataManipulationLinks : any[] = [];
  sharePointLink;
  dataTree;
  excelData : AOA;

  constructor(private authService: AuthService, private seatFirebaseService: SEATFirebaseService,
    private formBuilder: FormBuilder, private alertGenerator: AlertGenerator) {

    //Add Module Form
    this.addModuleForm = formBuilder.group({
      moduleID: ["", Validators.required],
      moduleName: ["", Validators.required],
      classSize: ["", Validators.required],
      phase: ["", Validators.required]
    });

    //Add ProblemSheet Form
    this.addProblemSheetForm = formBuilder.group({
      problemSheetID: ["", Validators.required],
      problemSheetTitle: ["", Validators.required],
      moduleID: ["", Validators.required],
      releaseDate: ["", Validators.required],
      deadline: ["", Validators.required]
    });

    //Add Student Form
    this.addStudentModuleForm = formBuilder.group({
      studentID: ["", Validators.required],
      moduleID: ["", Validators.required]
    })

    //Add Problem Form
    this.addProblemForm = formBuilder.group({
      problemID: ["", Validators.required],
      problemSheetID: ["", Validators.required],
      problemTitle: ["", Validators.required],
    });


    //Add Attempt Form
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

    //extract the arrays of modules, problems and problems sheets and StudentModule pairs here
    this.seatFirebaseService.getPhases().subscribe( phases => {
      this.phases = phases;
    });
    this.seatFirebaseService.getStudents().subscribe( students => {
      this.students = students;
    });

    this.seatFirebaseService.getModules().subscribe( modules => {
      this.modules  = modules;
    });

    this.seatFirebaseService.getProblemSheets().subscribe( problemSheets => {
      this.problemSheets = problemSheets;
    });

    this.seatFirebaseService.getProblems().subscribe( problems => {
      this.problems = problems;
    });

    this.seatFirebaseService.getStudentModules().subscribe(studentModules => {
      this.studentModules = studentModules;
    });



  }

  /*This method takes the values from the addScaffoldingModuleForm and checks whether the module code provided
  is unique. If it is, the new module is added to the database. If not, an error message is generated*/
  addModule() {

    if(!this.addModuleForm.invalid){

    let moduleCode = this.addModuleForm.controls.moduleID.value;
    let moduleName = this.addModuleForm.controls.moduleName.value;
    let classSize = this.addModuleForm.controls.classSize.value;
    let phaseID = this.addModuleForm.controls.phase.value;

    let module_ = new Module(moduleCode, moduleName, classSize, phaseID)

    let moduleCodes : string[] =[];
    for(let module_ of this.modules){
      moduleCodes.push(module_.moduleCode);
    }
    if (!moduleCodes.includes(moduleCode)) {
      //module id is unique

      //reset form
      this.addModuleForm.reset();


      //if it is unique, add to the database
      this.seatFirebaseService.addModule(module_);

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


    /*This method takes the values from the addProblemSheetForm and checks whether the ProblemSheetID provided
  is unique. If it is, the new problemSheet is added to the database. If not, an error message is generated*/
  addProblemSheet() {

    if(!this.addProblemSheetForm.invalid){

    let problemSheetID = this.addProblemSheetForm.controls.problemSheetID.value;
    let problemSheetTitle = this.addProblemSheetForm.controls.problemSheetTitle.value;
    let moduleID = this.addProblemSheetForm.controls.moduleID.value;
    let releaseDate = this.addProblemSheetForm.controls.releaseDate.value;
    let deadline = this.addProblemSheetForm.controls.deadline.value;

    let problemSheet = new ProblemSheet(problemSheetID, moduleID, problemSheetTitle,  releaseDate, deadline);    

    let problemSheetIDs : number[] =[];
    for(let problemSheet of this.problemSheets){
      problemSheetIDs.push(problemSheet.problemSheetID);
    }
    if (!problemSheetIDs.includes(problemSheetID)) {
      //if problemSheetID is unique

      //reset form
      this.addProblemSheetForm.reset();

      //add problem sheet
      this.seatFirebaseService.addProblemSheet(problemSheet);

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


  
    /*This method takes the values from the addProblemForm and checks whether the ProblemID provided
  is unique. If it is, the new problem is added to the database. If not, an error message is generated*/
  addProblem() {

    if(!this.addProblemForm.invalid){

    let problemID = this.addProblemForm.controls.problemID.value;
    let problemSheetID = this.addProblemForm.controls.problemSheetID.value;
    let problemTitle = this.addProblemForm.controls.problemTitle.value;

    let problem = new Problem(problemID, problemSheetID, problemTitle);    

    let problemIDs : number[] =[];
    for(let problem of this.problems){
      problemIDs.push(problem.problemID);
    }
    if (!problemIDs.includes(problemID)) {
      //if problemID is unique

      //reset form
      this.addProblemForm.reset();

      //add problem 
      this.seatFirebaseService.addProblem(problem);

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


    /*This method takes the values from the addAttemptForm and adds the new attempt to the database. 
    Uniqueness is ensured by only letting the user add attempts to pre-existing problems and students.
    */
  addAttempt() {

    if(!this.addAttemptForm.invalid){

    let studentID = this.addAttemptForm.controls.studentID.value;
    let problemID = this.addAttemptForm.controls.problemID.value;
    let output = this.addAttemptForm.controls.output.value;
    let compile = this.addAttemptForm.controls.compile.value;
    let date = this.addAttemptForm.controls.date.value;


    let attempt = new Attempt(studentID, problemID, output, compile, date);
    this.seatFirebaseService.addAttempt(attempt);
    this.alertGenerator.generateConfirmNotification("Success. A new attempt was successfully added");

    }else{
      //Notify user that a field is required
      this.alertGenerator.generateDataAdditionError("Please provide a value for all fields.")
    }
  }



    /*This method takes the values from the addStudentModuleForm and checks whether the StudentModule pair provided
  is unique. If it is, the StudentModule pair is added to the database. If not, an error message is generated. This is
  the equivalent of enrolling a student in a module. */
  addStudentModule(){

    if(!this.addStudentModuleForm.invalid){

    let studentID = this.addStudentModuleForm.controls.studentID.value;
    let moduleID = this.addStudentModuleForm.controls.moduleID.value;

    let studentModule = new StudentModule(studentID, moduleID);
    

    if(this.studentModules.includes(studentModule)){

    this.seatFirebaseService.addStudentModule(studentModule);
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

  /* Utility method to open a fileSaver and export the JSON data tree. This can then be imported to
  sharepoint to update the data source. */
  exportJSONTree() {
  
      let blob = new Blob([this.dataTree], { type: 'json' });
      FileSaver.saveAs(blob, "sdi-visual-tools-export.json");
     
  }

  /*Utility method that opens a file picker and reads an Excel file passed to it.
  Current setup only uploads one sheet at the time */
  onFileChanged(event : any ){

    let target : DataTransfer = <DataTransfer>(event.target);
    if(target.files.length != 1){
      throw new Error("Only a single file can be opened at any given time");
    }

    let reader = new FileReader();
    //Set the event for when the reader loads
    reader.onload = (evt :any) => {
      /* READ WORKBOOK */
      let binaryFile = evt.target.result; 
      let workbook = XLSX.read(binaryFile, {type: 'binary'});

      let worksheets = [];
      //Will only grab the first sheet for now - could have a for loop here
      let worksheetName = workbook.SheetNames[0];
      let worksheet = workbook.Sheets[worksheetName];

      /*SAVE DATA AS JSON */
      this.excelData= <AOA>(XLSX.utils.sheet_to_json(worksheet, {header: 1}));

      console.log(this.excelData);

    };
    //Read the selected file
    reader.readAsBinaryString(target.files[0]);

    
  }

  //this should be delegated to the Firebase Service and should reset the variable to null so that the table is hidden
  //once uploaded; TO BE FINISHED (Only allows attempts and students to be uploaded)
  uploadExcelData(){

    if(this.excelData == null){
      this.alertGenerator.generateDataAdditionError("Please select a file to upload")
    }else{   
      
      //Check the header and see if it matches the expected format for uploading student data
      //StudentID, FirstName, LastName, Email, PromotionYear
      //extract the headers
      let headers = this.excelData[0];
      
      if(headers.includes("StudentID") && headers.includes("FirstName")
        && headers.includes("LastName") && headers.includes("Email")
      && headers.includes("PromotionYear")){
        //headers are valid - assume that the data is too

      
          //clear the excel data after the upload
          // this.excelData = null;
          console.log("pressed");

      for(let i = 1; i< this.excelData.length; i++){
        let studentRow = (this.excelData[i]);

        let studentID = studentRow[0];

        //extract student IDs
        let studentIDs : number[] = [];
        for(let student of this.students){
          studentIDs.push(student.studentID);
        }

        if(!studentIDs.includes(studentID)){
        let firstName = studentRow[1];
        let lastName = studentRow[2];
        let email = studentRow[3];
        let promotionYear = studentRow[4];

        let student = new Student(studentID, email, firstName, lastName,  promotionYear)
        this.seatFirebaseService.addStudent(student);
        }else{
          this.alertGenerator.generateDataAdditionError("Please ensure that all student IDs are unique.");
          break;
        }
      }

    }else{
      //headers are not valid
      this.alertGenerator.generateDataAdditionError("Please ensure that the data format is correct");
    }
    }
    
  }


}