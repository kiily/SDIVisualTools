import { StudentModule } from '../../common/models/student-module.model';
import { Student } from './../../common/models/student.model';
import { Phase } from './../../common/models/phase.model';
import { AlertGenerator } from '../../components/alerts/alert-generator';
import { AngularFireList } from 'angularfire2/database/interfaces';
import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { PowerBILink } from '../../common/models/powerbi-link.model';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { ProblemSheet } from '../../common/models/problem-sheet.model';
import { Problem } from '../../common/models/problem.model';
import { Module } from '../../common/models/module.model';


/*This Service handles the connection to Firebase for the data relevant to scaffolding. It provides
methods retrieve the links for the PowerBI reports as well as the links for the PowerBI app, dashboard
and Excel data source.

This Service may be extended in the future once an appropriate connection with SEAT is established */
@Injectable()
export class SEATFirebaseService {

  //RETRIEVE PowerBI related Links
  appLinksRef : AngularFireList<PowerBILink>;
  reportLinksRef : AngularFireList<PowerBILink>;

  appLinks$ : Observable<PowerBILink[]>;
  reportLinks$ : Observable<PowerBILink[]>;
  

  //ADD and RETRIEVE SCAFFOLDING DATA
  phasesRef : AngularFireList<Phase>;
  studentsRef : AngularFireList<Student>;
  problemSheetsRef : AngularFireList<ProblemSheet>;
  problemsRef : AngularFireList<Problem>;
  modulesRef : AngularFireList<Module>;
  studentModulesRef : AngularFireList<StudentModule>;

  phases$ : Observable<Phase[]>;
  students$ : Observable<Student[]>
  problemSheets$ : Observable<ProblemSheet[]>
  problems$ : Observable<Problem[]>
  modules$ : Observable<Module[]>
  studentModules$ : Observable<StudentModule[]>


  
  constructor(private afdb : AngularFireDatabase) { 

    this.appLinksRef = this.afdb.list("/scaffolding/powerBIApp");
    this.reportLinksRef = this.afdb.list("/scaffolding/powerBIReports");

    this.appLinks$ = this.appLinksRef.valueChanges();
    this.reportLinks$ = this.reportLinksRef.valueChanges();


    this.phasesRef = this.afdb.list("/scaffolding/phases");
    this.studentsRef = this.afdb.list("/scaffolding/students");
    this.problemSheetsRef = this.afdb.list("/scaffolding/problemSheets");
    this.problemsRef = this.afdb.list("/scaffolding/problems");
    this.modulesRef = this.afdb.list("/scaffolding/modules");
    this.studentModulesRef = this.afdb.list("/scaffolding/studentModules");

    this.phases$ = this.phasesRef.valueChanges();
    this.students$ = this.studentsRef.valueChanges();
    this.problemSheets$ = this.problemSheetsRef.valueChanges();
    this.problems$ = this.problemsRef.valueChanges();
    this.studentModules$ = this.studentModulesRef.valueChanges();

    //need to retrieve the module key
    this.modules$ = this.modulesRef.snapshotChanges()
    .map( modules => {
        return modules.map( c => {
          let key = c.payload.key;
          let data = c.payload.val();

          let transformed = new Module(key, data['classSize'], data['moduleName'], data['phaseID']);
          return transformed;
        });
    });
    

  }


  /*This method retrieves a FirebaseObjectObservable that contains the links for the PowerBI
  app, dahsboard and Excel data source */
  getAppLink(){
    return this.appLinks$;
   }

   /* This method retrieves a FirebaseObjectObservable that contains the links for the PowerBI reports
   that are embedded within the app */
   getReportEmbedLinks(){
    return this.reportLinks$;
   }

     /* This method retrieves a FirebaseObjectObservable with the entire Firebase JSON tree
     corresponding to the scaffolding section */
  //  getScaffoldingDataTree(){
  //    let scaffoldingData = this.afdb.object("/scaffolding");
  //    return scaffoldingData;
  //  }

     /* This method retrieves a FirebaseListObservable that contains the list of scaffolding phases */
   getPhases(){
     return this.phases$;
   }

   
     /* This method retrieves a FirebaseListObservable that contains the list of students */
   getStudents(){
     return this.students$;
   }

   
     /* This method retrieves a FirebaseListObservable that contains the list of student modules */
   getStudentModules(){
     return this.studentModules$;
   }

  /* This method retrieves a FirebaseListObservable that contains the list of modules */
   getModules(){
    return this.modules$;
  }

    /* This method retrieves a FirebaseListObservable that contains the list of ProblemSheets */
  getProblemSheets(){
    return this.problemSheets$;
  }

  /* This method retrieves a FirebaseListObservable that contains the list of Problems */
  getProblems(){
    return this.problems$; 
  }

   /* This method adds a new module to the modules part of the tree.*/
   addModule(moduleCode, moduleName, classSize, phaseID){
    this.modulesRef.push(
      [moduleCode]: {
        moduleName : moduleName,
        classSize: classSize,
        phaseID: phaseID

      }
    );

   }

   
   /* This method adds a new problemSheet to the problemSheets part of the tree.*/
   addProblemSheet(problemSheetID, problemSheetTitle, moduleID, releaseDate, deadline){
     let problemSheets = this.afdb.object('/scaffolding/problemSheets');

     problemSheets.update({
       [problemSheetID] : {
         problemSheetID : problemSheetID,
         problemSheetTitle: problemSheetTitle,
         moduleID : moduleID,
         releaseDate : releaseDate,
         deadline : deadline
       }
     });
   }

  
   /* This method adds a new problem to the problems part of the tree.*/
   addProblem(problemID, problemSheetID, problemTitle){
     let problems = this.afdb.object('/scaffolding/problems');

     problems.update({
       [problemID] : {
         problemID: problemID,
         problemSheetID : problemSheetID,
         problemTitle: problemTitle
       }
     });
   }

   
   /* This method adds a new attempt to the attempts part of the tree.*/
   addAttempt(studentID, problemID, compile, output, date){
     let attempts = this.afdb.list("/scaffolding/attempts");

     attempts.push({
       studentID: studentID,
       problemID: problemID,
       compile : compile,
       output: output,
       date : date
     });
   }

   
   /* This method adds a student module pair to the studentModules part of the tree.*/
   addStudentModule(studentID, moduleID){
     let studentModules = this.afdb.list("/scaffolding/studentModules");

     studentModules.push({
       studentID : studentID,
       moduleID : moduleID
     });
   }
/* This method adds a student to the students part of the tree.*/
   addStudent(studentID, firstName, lastName, email, promotionYear){
    let students = this.afdb.object('/scaffolding/students');

    students.update({
      [studentID] : {
        studentID: studentID,
        firstName: firstName,
        lastName: lastName,
        email : email,
        promotionYear : promotionYear 
      }
    });

   }
    

}
 
