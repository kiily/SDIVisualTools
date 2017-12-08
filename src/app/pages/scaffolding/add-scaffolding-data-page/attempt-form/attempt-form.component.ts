import { Student } from './../../../../common/models/scaffolding/student.model';
import { Observable } from 'rxjs/Observable';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { SEATFirebaseService } from '../../../../services/seat-services/seat-firebase.service';
import { AlertGenerator } from './../../../../components/alerts/alert-generator';
import { Problem } from '../../../../common/models/scaffolding/problem.model';
import { ISubscription } from 'rxjs/Subscription';
import { Attempt } from '../../../../common/models/scaffolding/attempt.model';

@Component({
  selector: 'app-attempt-form',
  templateUrl: './attempt-form.component.html',
  styleUrls: ['./attempt-form.component.scss']
})
export class AttemptFormComponent implements OnInit {

  addAttemptForm: FormGroup;

  problems$: Observable<Problem[]>;
  students$: Observable<Student[]>;


  constructor(private fb: FormBuilder, private seatFirebaseService: SEATFirebaseService,
    private alertGenerator: AlertGenerator) {
         // Add Attempt Form
    this.addAttemptForm = fb.group({
      studentID: ['', Validators.required],
      problemID: ['', Validators.required],
      compile: ['', Validators.required],
      output: ['', Validators.required],
      date: ['', Validators.required],
    });
    }

  ngOnInit() {
    this.problems$ = this.seatFirebaseService.getProblems();
    this.students$ = this.seatFirebaseService.getStudents();
  }


   /*This method takes the values from the addAttemptForm and adds the new attempt to the database.
    Uniqueness is ensured by only letting the user add attempts to pre-existing problems and students.
    */
    addAttempt() {

          if (!this.addAttemptForm.invalid) {
          const studentID = this.addAttemptForm.controls.studentID.value;
          const problemID = this.addAttemptForm.controls.problemID.value;
          const output = this.addAttemptForm.controls.output.value;
          const compile = this.addAttemptForm.controls.compile.value;
          const date = this.addAttemptForm.controls.date.value;


          const attempt = new Attempt(studentID, problemID, output, compile, date);
          this.seatFirebaseService.addAttempt(attempt);
          this.alertGenerator.generateConfirmNotification('Success. A new attempt was successfully added');

          }else {
            // Notify user that a field is required
            this.alertGenerator.generateDataAdditionError('Please provide a value for all fields.');
          }
        }

}
