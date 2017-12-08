import { Student } from './../../../../common/models/scaffolding/student.model';
import { Module } from './../../../../common/models/scaffolding/module.model';
import { AlertGenerator } from './../../../../components/alerts/alert-generator';
import { Phase } from './../../../../common/models/scaffolding/phase.model';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { SEATFirebaseService } from '../../../../services/seat-services/seat-firebase.service';
import { ISubscription } from 'rxjs/Subscription';
import { StudentModule } from '../../../../common/models/scaffolding/student-module.model';

@Component({
  selector: 'app-student-module-form',
  templateUrl: './student-module-form.component.html',
  styleUrls: ['./student-module-form.component.scss']
})
export class StudentModuleFormComponent implements OnInit, OnDestroy {


  addStudentModuleForm: FormGroup;
  students$: Observable<Student[]>;
  modules$: Observable<Module[]>;

  studentModules: StudentModule[] = [];
  // Unsubscribe at the end
  studentModulesSub: ISubscription;

  constructor(private fb: FormBuilder, private seatFirebaseService: SEATFirebaseService,
    private alertGenerator: AlertGenerator) {
         // Add Student Form
    this.addStudentModuleForm = fb.group({
      studentID: ['', Validators.required],
      moduleID: ['', Validators.required]
    });
    }

  ngOnInit() {
    this.students$ = this.seatFirebaseService.getStudents();
    this.modules$ = this.seatFirebaseService.getModules();

    this.studentModulesSub = this.seatFirebaseService.getStudentModules().subscribe( studentModules => {
      this.studentModules = studentModules;
    });
  }

  ngOnDestroy() {
    this.studentModulesSub.unsubscribe();
  }

  /*This method takes the values from the addStudentModuleForm and checks whether the StudentModule pair provided
  is unique. If it is, the StudentModule pair is added to the database. If not, an error message is generated. This is
  the equivalent of enrolling a student in a module. */
  addStudentModule() {

        if (!this.addStudentModuleForm.invalid) {

        const studentID = this.addStudentModuleForm.controls.studentID.value;
        const moduleID = this.addStudentModuleForm.controls.moduleID.value;

        const studentModule = new StudentModule(studentID, moduleID);


        if (this.studentModules.includes(studentModule)) {

        this.seatFirebaseService.addStudentModule(studentModule);
        this.alertGenerator.generateConfirmNotification('Success. Student ' + studentID + ' was enrolled into ' + moduleID + '.');

        }else {
          // Notify user that a field is required
          this.alertGenerator.generateDataAdditionError('Student ' + studentID + ' is already enrolled in ' + moduleID + '.');
        }
      }else {
         // Notify user that a field is required
          this.alertGenerator.generateDataAdditionError('Please provide a value for all fields.');
      }

      }

}
