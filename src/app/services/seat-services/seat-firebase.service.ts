import { PowerBILink } from './../../common/models/scaffolding/powerbi-link.model';
import { Attempt } from './../../common/models/scaffolding/attempt.model';
import { StudentModule } from '../../common/models/scaffolding/student-module.model';
import { Student } from './../../common/models/scaffolding/student.model';
import { Phase } from './../../common/models/scaffolding/phase.model';
import { AlertGenerator } from '../../components/alerts/alert-generator';
import { AngularFireList, AngularFireObject } from 'angularfire2/database/interfaces';
import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { ProblemSheet } from '../../common/models/scaffolding/problem-sheet.model';
import { Problem } from '../../common/models/scaffolding/problem.model';
import { Module } from '../../common/models/scaffolding/module.model';


/*This Service handles the connection to Firebase for the data relevant to scaffolding. It provides
methods retrieve the links for the PowerBI reports as well as the links for the PowerBI app, dashboard
and Excel data source.

This Service may be extended in the future once an appropriate connection with SEAT is established */
@Injectable()
export class SEATFirebaseService {

  // RETRIEVE PowerBI related Links
  appLinksRef: AngularFireList<PowerBILink>;
  reportLinksRef: AngularFireList<PowerBILink>;

  appLinks$: Observable<PowerBILink[]>;
  reportLinks$: Observable<PowerBILink[]>;


  // ADD and RETRIEVE SCAFFOLDING DATA
  phasesRef: AngularFireList<Phase>;
  studentsRef: AngularFireList<Student>;
  problemSheetsRef: AngularFireList<ProblemSheet>;
  problemsRef: AngularFireList<Problem>;
  modulesRef: AngularFireList<Module>;
  studentModulesRef: AngularFireList<StudentModule>;
  attemptsRef: AngularFireList<Attempt>;

  scaffoldingTree;

  phases$: Observable<Phase[]>;
  students$: Observable<Student[]>;
  problemSheets$: Observable<ProblemSheet[]>;
  problems$: Observable<Problem[]>;
  modules$: Observable<Module[]>;
  studentModules$: Observable<StudentModule[]>;
  scaffoldingTree$;


  constructor(private afdb: AngularFireDatabase) {

    this.appLinksRef = this.afdb.list('/scaffolding/powerBIApp');
    this.reportLinksRef = this.afdb.list('/scaffolding/powerBIReports');

    this.appLinks$ = this.appLinksRef.snapshotChanges()
    .map( appLinks => {
      return appLinks.map( c => {
        const key = c.payload.key;
        const data = c.payload.val();
        const transformed = new PowerBILink(key, data);
        return transformed;
      });
    });
    this.reportLinks$ = this.reportLinksRef.valueChanges();

    this.scaffoldingTree = this.afdb.object('/scaffolding');

    this.phasesRef = this.afdb.list('/scaffolding/phases');
    this.studentsRef = this.afdb.list('/scaffolding/students');
    this.problemSheetsRef = this.afdb.list('/scaffolding/problemSheets');
    this.problemsRef = this.afdb.list('/scaffolding/problems');
    this.modulesRef = this.afdb.list('/scaffolding/modules');
    this.studentModulesRef = this.afdb.list('/scaffolding/studentModules');
    this.attemptsRef = this.afdb.list('/scaffolding/attempts');

    this.phases$ = this.phasesRef.valueChanges();
    this.students$ = this.studentsRef.valueChanges();
    this.problemSheets$ = this.problemSheetsRef.valueChanges();
    this.problems$ = this.problemsRef.valueChanges();
    this.studentModules$ = this.studentModulesRef.valueChanges();
    this.scaffoldingTree$ =  this.scaffoldingTree.valueChanges();

    // need to retrieve the module key
    this.modules$ = this.modulesRef.snapshotChanges()
    .map( modules => {
        return modules.map( c => {
          const key = c.payload.key;
          const data = c.payload.val();

          const transformed = new Module(key, data['classSize'], data['moduleName'], data['phaseID']);
          return transformed;
        });
    });


  }


  /*This method retrieves a FirebaseObjectObservable that contains the links for the PowerBI
  app, dahsboard and Excel data source */
  getAppLink() {
    return this.appLinks$;
   }

   /* This method retrieves a FirebaseObjectObservable that contains the links for the PowerBI reports
   that are embedded within the app */
   getReportEmbedLinks() {
    return this.reportLinks$;
   }

     /* This method retrieves a FirebaseObjectObservable with the entire Firebase JSON tree
     corresponding to the scaffolding section */
   getScaffoldingDataTree() {
     return this.scaffoldingTree$;
   }

     /* This method retrieves a FirebaseListObservable that contains the list of scaffolding phases */
   getPhases() {
     return this.phases$;
   }


     /* This method retrieves a FirebaseListObservable that contains the list of students */
   getStudents() {
     return this.students$;
   }


     /* This method retrieves a FirebaseListObservable that contains the list of student modules */
   getStudentModules() {
     return this.studentModules$;
   }

  /* This method retrieves a FirebaseListObservable that contains the list of modules */
   getModules() {
    return this.modules$;
  }

    /* This method retrieves a FirebaseListObservable that contains the list of ProblemSheets */
  getProblemSheets() {
    return this.problemSheets$;
  }

  /* This method retrieves a FirebaseListObservable that contains the list of Problems */
  getProblems() {
    return this.problems$;
  }

   /* This method adds a new module to the modules part of the tree.*/
   addModule(module_: Module) {
    this.modulesRef.push({

        moduleCode : module_.moduleCode,
        moduleName : module_.moduleName,
        classSize: module_.classSize,
        phaseID: module_.phaseID

    });

   }

   
   /* This method adds a new problemSheet to the problemSheets part of the tree.*/
   addProblemSheet(problemSheet : ProblemSheet){
     console.log(problemSheet);
     this.problemSheetsRef.push({
        problemSheetID : problemSheet.problemSheetID,
        moduleID : problemSheet.moduleID,      
        problemSheetTitle: problemSheet.problemSheetTitle,
        releaseDate : problemSheet.releaseDate,
        deadline : problemSheet.deadline
      
    });

   }

  
   /* This method adds a new problem to the problems part of the tree.*/
   addProblem(problem : Problem){
    this.problemsRef.push({
      problemID: problem.problemID,
      problemSheetID : problem.problemSheetID,
      problemTitle: problem.problemTitle
    })

     
   }

   
   /* This method adds a new attempt to the attempts part of the tree.*/
   addAttempt(attempt : Attempt){
     this.attemptsRef.push({
       studentID: attempt.studentID,
       problemID: attempt.problemID,
       compile : attempt.compile,
       output: attempt.output,
       date : attempt.date
     });
   }

   
   /* This method adds a student module pair to the studentModules part of the tree.*/
   addStudentModule(studentModule : StudentModule){
     this.studentModulesRef.push({
      studentID : studentModule.studentID,
      moduleCode : studentModule.moduleCode
     });

   }
/* This method adds a student to the students part of the tree.*/
   addStudent(student : Student){
    const students = this.afdb.object('/scaffolding/students');

    this.studentsRef.push({
        studentID: student.studentID,
        firstName: student.firstName,
        lastName: student.lastName,
        email : student.email,
        promotionYear : student.promotionYear 
      
    });

   }
    

}
 
