import { Attempt } from '../../../common/models/scaffolding/attempt.model';
import { StudentModule } from './../../../common/models/scaffolding/student-module.model';
import { Problem } from '../../../common/models/scaffolding/problem.model';
import { Module } from '../../../common/models/scaffolding/module.model';
import { AlertGenerator } from '../../../components/alerts/alert-generator';
import { SEATFirebaseService } from '../../../services/seat-services/seat-firebase.service';
import { AuthService } from '../../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import * as FileSaver from 'file-saver';
import 'rxjs/add/operator/map';
import * as XLSX from 'xlsx';
import { ProblemSheet } from '../../../common/models/scaffolding/problem-sheet.model';
import { Student } from '../../../common/models/scaffolding/student.model';
import { PowerBILink } from '../../../common/models/scaffolding/powerbi-link.model';

type AOA = Array<Array<any>>;


/*

/*This class acts as the controller for the AddScaffoldingDataPage component. It is associated with an HTML template
that renders the add scaffolding data page. This class processes the scaffolding data submitted by the users and
ensures that Problems, Modules, ProblemSheets are unique and that attempts can only be assigned to an existing student and 
an existing problem. The user can add new attempts, new modules, new problemSheets, new problems and enrol students into a module.
This class also provides buttons to access the data sources and export the complete Firebase JSON tree.

REFERENCES:
 - https://github.com/SheetJS/js-xlsx/tree/master/demos/angular2 - Accessed August 2017

 */
@Component({
  selector: 'app-add-scaffolding-data-page',
  templateUrl: './add-scaffolding-data-page.component.html',
  styleUrls: ['./add-scaffolding-data-page.component.scss']
})
export class AddScaffoldingDataPageComponent implements OnInit {

  pageTitle = 'Scaffolding';
  // Holds the name of the current form
  currentForm: string;

  
  students: Student[] = [];

  links: any[] = [];
  sharepointLink: PowerBILink;
  excelLink: PowerBILink;
  workspaceLink: PowerBILink;

  dataTree;
  excelData: AOA;

  constructor(private authService: AuthService, private seatFirebaseService: SEATFirebaseService,
  private alertGenerator: AlertGenerator) {}

  ngOnInit() {

    // Checking that a user is logged in
    this.authService.userScan();

    this.dataTree =  this.seatFirebaseService.getScaffoldingDataTree();
    console.log(this.dataTree);
    // extract the arrays of modules, problems and problems sheets and StudentModule pairs here
    this.seatFirebaseService.getStudents().subscribe( students => {
      this.students = students;
    });

    // Get PowerBI related Links
    this.seatFirebaseService.getAppLink().subscribe(appLinks => {
      this.links = appLinks;
      // extract links from array so that they can be referred to by name for clarity
      this.sharepointLink = this.links[3];
      this.excelLink = this.links[1];
      this.workspaceLink = this.links[4];
    });

  }

    // Helper Methods to toggle forms
    addModule() {
      this.currentForm = 'addModule';
    }
    addProblemSheet() {
      this.currentForm = 'addProblemSheet';
    }
    addProblem() {
      this.currentForm = 'addProblem';
    }
    addAttempt() {
      this.currentForm = 'addAttempt';
    }
    addStudentModule() {
      this.currentForm = 'addStudentModule';
    }


  /* Utility method to open a fileSaver and export the JSON data tree. This can then be imported to
  sharepoint to update the data source. */
  exportJSONTree() {

      const blob = new Blob([this.dataTree], { type: 'json' });
      FileSaver.saveAs(blob, 'sdi-visual-tools-export.json');

  }

  /*Utility method that opens a file picker and reads an Excel file passed to it.
  Current setup only uploads one sheet at the time */
  onFileChanged(event: any ){

    const target : DataTransfer = <DataTransfer>(event.target);
    if(target.files.length !== 1){
      throw new Error('Only a single file can be opened at any given time');
    }

    const reader = new FileReader();
    // Set the event for when the reader loads
    reader.onload = (evt :any) => {
      /* READ WORKBOOK */
      const binaryFile = evt.target.result;
      const workbook = XLSX.read(binaryFile, {type: 'binary'});

      const worksheets = [];
      // Will only grab the first sheet for now - could have a for loop here
      const worksheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[worksheetName];

      /*SAVE DATA AS JSON */
      this.excelData = <AOA>(XLSX.utils.sheet_to_json(worksheet, {header: 1}));

      console.log(this.excelData);

    };
    // Read the selected file
    reader.readAsBinaryString(target.files[0]);


  }

  //SHOULD REFACTOR THIS TO ANOTHER COMPONENT TO ISOLATE THE EXCEL FUNCTIONALITY
  // this should be delegated to the Firebase Service and should reset the variable to null so that the table is hidden
  // once uploaded; TO BE FINISHED (Only allows attempts and students to be uploaded)
  uploadExcelData() {

    if (this.excelData == null) {
      this.alertGenerator.generateDataAdditionError('Please select a file to upload');
    }else {

      // Check the header and see if it matches the expected format for uploading student data
      // StudentID, FirstName, LastName, Email, PromotionYear
      // extract the headers
      const headers = this.excelData[0];

      if (headers.includes('StudentID') && headers.includes('FirstName')
        && headers.includes('LastName') && headers.includes('Email')
      && headers.includes('PromotionYear')) {
        // headers are valid - assume that the data is too


          // clear the excel data after the upload
          // this.excelData = null;
          console.log('pressed');

      for (let i = 1; i < this.excelData.length; i++) {
        const studentRow = (this.excelData[i]);

        const studentID = studentRow[0];

        // extract student IDs
        const studentIDs: number[] = [];
        for (const student of this.students){
          studentIDs.push(student.studentID);
        }

        if (!studentIDs.includes(studentID)){
        const firstName = studentRow[1];
        const lastName = studentRow[2];
        const email = studentRow[3];
        const promotionYear = studentRow[4];

        const student = new Student(studentID, email, firstName, lastName,  promotionYear);
        this.seatFirebaseService.addStudent(student);
        }else {
          this.alertGenerator.generateDataAdditionError('Please ensure that all student IDs are unique.');
          break;
        }
      }

    }else {
      // headers are not valid
      this.alertGenerator.generateDataAdditionError('Please ensure that the data format is correct');
    }
    }

  }


}
