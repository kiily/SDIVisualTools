import { AlertGenerator } from './../../../../components/alerts/alert-generator';
import { SEATFirebaseService } from '../../../../services/seat-services/seat-firebase.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProblemSheet } from '../../../../common/models/scaffolding/problem-sheet.model';
import { Observable } from 'rxjs/Observable';
import { Module } from '../../../../common/models/scaffolding/module.model';
import { ISubscription } from 'rxjs/Subscription';


@Component({
  selector: 'app-problem-sheet-form',
  templateUrl: './problem-sheet-form.component.html',
  styleUrls: ['./problem-sheet-form.component.scss']
})
export class ProblemSheetFormComponent implements OnInit, OnDestroy {

  addProblemSheetForm: FormGroup;

  modules$: Observable<Module[]>;

  problemSheetsSub: ISubscription;
  problemSheets: ProblemSheet[] = [];


  constructor(private fb: FormBuilder, private seatFirebaseService: SEATFirebaseService,
    private alertGenerator: AlertGenerator) {
    // Add ProblemSheet Form
    this.addProblemSheetForm = fb.group({
      problemSheetID: ['', Validators.required],
      problemSheetTitle: ['', Validators.required],
      moduleID: ['', Validators.required],
      releaseDate: ['', Validators.required],
      deadline: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.modules$ = this.seatFirebaseService.getModules();

    this.problemSheetsSub = this.seatFirebaseService.getProblemSheets().subscribe( problemSheets => {
      this.problemSheets = problemSheets;
    });
  }

  ngOnDestroy() {
    this.problemSheetsSub.unsubscribe();
  }


    /*This method takes the values from the addProblemSheetForm and checks whether the ProblemSheetID provided
  is unique. If it is, the new problemSheet is added to the database. If not, an error message is generated*/
  addProblemSheet() {

        if (!this.addProblemSheetForm.invalid) {

        const problemSheetID = this.addProblemSheetForm.controls.problemSheetID.value;
        const problemSheetTitle = this.addProblemSheetForm.controls.problemSheetTitle.value;
        const moduleID = this.addProblemSheetForm.controls.moduleID.value;
        const releaseDate = this.addProblemSheetForm.controls.releaseDate.value;
        const deadline = this.addProblemSheetForm.controls.deadline.value;

        const problemSheet = new ProblemSheet(problemSheetID, moduleID, problemSheetTitle,  releaseDate, deadline);

        const problemSheetIDs: number[] =[];
        for (const problemSheet of this.problemSheets){
          problemSheetIDs.push(problemSheet.problemSheetID);
        }
        if (!problemSheetIDs.includes(problemSheetID)) {
          // if problemSheetID is unique

          // reset form
          this.addProblemSheetForm.reset();

          // add problem sheet
          this.seatFirebaseService.addProblemSheet(problemSheet);

          // notify user
          this.alertGenerator.generateConfirmNotification('Success. A new problem sheet was successfully added to ' + moduleID);
        } else {
          // problemSheet already exists, throw an alert
          this.alertGenerator.generateDataAdditionError('The ProblemSheetID must be unique.');
        }

        }else {
          // Notify user that a field is required
          this.alertGenerator.generateDataAdditionError('Please provide a value for all fields.');
        }

      }
}
