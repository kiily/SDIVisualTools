import { AlertGenerator } from '../../common/alerts/alert-generator';
import { FirebaseListObservable } from 'angularfire2/database/firebase_list_observable';
import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';

/*This Service handles the connection to Firebase for the data relevant to scaffolding. It provides
methods retrieve the links for the PowerBI reports as well as the links for the PowerBI app, dashboard
and Excel data source.

This Service may be extended in the future once an appropriate connection with SEAT is established */
@Injectable()
export class SEATFirebaseService {

  constructor(private afdb : AngularFireDatabase) { 

  }

  /*This method retrieves a FirebaseObjectObservable that contains the links for the PowerBI
  app, dahsboard and Excel data source */
  getAppLink(){
     let appLinks = this.afdb.object("/scaffolding/powerBIApp");
     return appLinks;
   }

   /* This method retrieves a FirebaseObjectObservable that contains the links for the PowerBI reports
   that are embedded within the app */
   getReportEmbedLinks(){
     let reportEmbedLinks = this.afdb.object("/scaffolding/powerBIReports");
     return reportEmbedLinks;
   }

     /* This method retrieves a FirebaseObjectObservable with the entire Firebase JSON tree
     corresponding to the scaffolding section */
   getScaffoldingDataTree(){
     let scaffoldingData = this.afdb.object("/scaffolding");
     return scaffoldingData;
   }

     /* This method retrieves a FirebaseListObservable that contains the list of scaffolding phases */
   getPhases(){
     let phases = this.afdb.list("/scaffolding/phases");
     return phases;
   }

   
     /* This method retrieves a FirebaseListObservable that contains the list of students */
   getStudents(){
     let students = this.afdb.list("/scaffolding/students");
     return students;
   }

   
     /* This method retrieves a FirebaseListObservable that contains the list of student modules */
   getStudentModules(){
      let studentModules = this.afdb.list("/scaffolding/studentModules");
     return studentModules;
   }

  /* This method retrieves a FirebaseListObservable that contains the list of modules */
   getModules(){
    let modules =  this.afdb.list('/scaffolding/modules');
    return modules;
  }

    /* This method retrieves a FirebaseListObservable that contains the list of ProblemSheets */
  getProblemSheets(){
    let problemSheets =  this.afdb.list('/scaffolding/problemSheets');
    return problemSheets;
  }

  /* This method retrieves a FirebaseListObservable that contains the list of Problems */
  getProblems(){
    let problems = this.afdb.list('/scaffolding/problems');
    return problems; 
  }

   /* This method adds a new module to the modules part of the tree.*/
   addModule(moduleCode, moduleName, classSize, phaseID){
    let modules = this.afdb.object('/scaffolding/modules');

    modules.update({
      [moduleCode]: {
        moduleName : moduleName,
        classSize: classSize,
        phaseID: phaseID

      }
    });
   
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
     })
   }
    

}
 
