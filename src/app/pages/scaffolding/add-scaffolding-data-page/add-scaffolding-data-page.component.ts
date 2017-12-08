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
import { ProblemSheet } from '../../../common/models/scaffolding/problem-sheet.model';
import { Student } from '../../../common/models/scaffolding/student.model';
import { PowerBILink } from '../../../common/models/scaffolding/powerbi-link.model';



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

  links: any[] = [];
  sharepointLink: PowerBILink;
  excelLink: PowerBILink;
  workspaceLink: PowerBILink;

  dataTree;

  constructor(private authService: AuthService, private seatFirebaseService: SEATFirebaseService,
  private alertGenerator: AlertGenerator) {}

  ngOnInit() {

    // Checking that a user is logged in
    this.authService.userScan();

    this.dataTree =  this.seatFirebaseService.getScaffoldingDataTree();
    console.log(this.dataTree);

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

}
