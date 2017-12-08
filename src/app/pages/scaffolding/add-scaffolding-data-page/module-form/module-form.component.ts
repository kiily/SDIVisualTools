import { Module } from './../../../../common/models/scaffolding/module.model';
import { AlertGenerator } from './../../../../components/alerts/alert-generator';
import { Phase } from './../../../../common/models/scaffolding/phase.model';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { SEATFirebaseService } from '../../../../services/seat-services/seat-firebase.service';
import { ISubscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-module-form',
  templateUrl: './module-form.component.html',
  styleUrls: ['./module-form.component.scss']
})
export class ModuleFormComponent implements OnInit, OnDestroy {

  addModuleForm: FormGroup;

  // Populate the phass selector
  phases$: Observable<Phase[]>;

  // Modules Array
  modules: Module[] = [];
  // Unsubscribe at the end
  modulesSub: ISubscription;

  constructor(private fb: FormBuilder, private seatFirebaseService: SEATFirebaseService,
  private alertGenerator: AlertGenerator) {
    // Add Module Form
    this.addModuleForm = fb.group({
      moduleID: ['', Validators.required],
      moduleName: ['', Validators.required],
      classSize: ['', Validators.required],
      phase: ['', Validators.required]
    });
   }

  ngOnInit() {
    this.phases$ = this.seatFirebaseService.getPhases();

    this.modulesSub = this.seatFirebaseService.getModules().subscribe( modules => {
      this.modules = modules;
    });
  }

  ngOnDestroy() {
    this.modulesSub.unsubscribe();
  }

  /*This method takes the values from the addScaffoldingModuleForm and checks whether the module code provided
  is unique. If it is, the new module is added to the database. If not, an error message is generated*/
  addModule() {

        if (!this.addModuleForm.invalid) {

        const moduleCode = this.addModuleForm.controls.moduleID.value;
        const moduleName = this.addModuleForm.controls.moduleName.value;
        const classSize = this.addModuleForm.controls.classSize.value;
        const phaseID = this.addModuleForm.controls.phase.value;

        const module_ = new Module(moduleCode, moduleName, classSize, phaseID);

        const moduleCodes: string[] = [];
        for (let module_ of this.modules){
          moduleCodes.push(module_.moduleCode);
        }
        if (!moduleCodes.includes(moduleCode)) {
          // module id is unique

          // reset form
          this.addModuleForm.reset();


          // if it is unique, add to the database
          this.seatFirebaseService.addModule(module_);
          // notify user
          this.alertGenerator.generateConfirmNotification('Success. A new module was successfully added');
        } else {
          // module already exists, throw an alert
          this.alertGenerator.generateDataAdditionError('The Module Code you entered already exists');
        }
        }else {
          // Notify user that a field is required
          this.alertGenerator.generateDataAdditionError('Please provide a value for all fields.');
        }
      }

}
