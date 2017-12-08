import { Observable } from 'rxjs/Observable';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { SEATFirebaseService } from '../../../../services/seat-services/seat-firebase.service';
import { AlertGenerator } from './../../../../components/alerts/alert-generator';
import { Problem } from '../../../../common/models/scaffolding/problem.model';
import { ProblemSheet } from '../../../../common/models/scaffolding/problem-sheet.model';
import { ISubscription } from 'rxjs/Subscription';


@Component({
  selector: 'app-problem-form',
  templateUrl: './problem-form.component.html',
  styleUrls: ['./problem-form.component.scss']
})
export class ProblemFormComponent implements OnInit, OnDestroy {

  addProblemForm: FormGroup;

  problemSheets$: Observable<ProblemSheet[]>;

  problemsSub: ISubscription;
  problems: Problem[] = [];

  constructor(private fb: FormBuilder, private seatFirebaseService: SEATFirebaseService,
    private alertGenerator: AlertGenerator) {
      // Add Problem Form
    this.addProblemForm = fb.group({
      problemID: ['', Validators.required],
      problemSheetID: ['', Validators.required],
      problemTitle: ['', Validators.required],
    });
     }

  ngOnInit() {
    this.problemSheets$ = this.seatFirebaseService.getProblemSheets();

    this.problemsSub = this.seatFirebaseService.getProblems().subscribe( problems => {
      this.problems = problems;
    });

  }

  ngOnDestroy(){
    this.problemsSub.unsubscribe();
  }

    /*This method takes the values from the addProblemForm and checks whether the ProblemID provided
  is unique. If it is, the new problem is added to the database. If not, an error message is generated*/
  addProblem() {

        if (!this.addProblemForm.invalid) {

        const problemID = this.addProblemForm.controls.problemID.value;
        const problemSheetID = this.addProblemForm.controls.problemSheetID.value;
        const problemTitle = this.addProblemForm.controls.problemTitle.value;

        const problem = new Problem(problemID, problemSheetID, problemTitle);

        const problemIDs: number[] =[];
        for(const problem of this.problems){
          problemIDs.push(problem.problemID);
        }
        if (!problemIDs.includes(problemID)) {
          // if problemID is unique

          // reset form
          this.addProblemForm.reset();

          // add problem
          this.seatFirebaseService.addProblem(problem);

          // notify user
          this.alertGenerator.generateConfirmNotification('Success. A new problem (ID: ' + problemID +
           ') was successfully added to problem sheet ' + problemSheetID);
        } else {
          // problem already exists, throw an alert
          this.alertGenerator.generateDataAdditionError('The ProblemID must be unique.');
        }

        }else {
          // Notify user that a field is required
          this.alertGenerator.generateDataAdditionError('Please provide a value for all fields.');
        }
      }
}
