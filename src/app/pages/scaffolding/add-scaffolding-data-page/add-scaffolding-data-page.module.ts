import { AttemptFormComponent } from './attempt-form/attempt-form.component';
import { ProblemSheetFormComponent } from './problem-sheet-form/problem-sheet-form.component';
import { ProblemFormComponent } from './problem-form/problem-form.component';
import { ModuleFormComponent } from './module-form/module-form.component';
import { CommonModule } from '@angular/common';
import { AddScaffoldingDataPageComponent } from './add-scaffolding-data-page.component';
import { NgModule } from '@angular/core';
import { ComponentsModule } from '../../../components/components.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { StudentModuleFormComponent } from './student-module-form/student-module-form.component';

@NgModule({
    declarations: [
        AddScaffoldingDataPageComponent,
        ModuleFormComponent,
        ProblemFormComponent,
        ProblemSheetFormComponent,
        AttemptFormComponent,
        StudentModuleFormComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        ComponentsModule
    ],
    exports: [
        AddScaffoldingDataPageComponent
    ]
})
export class AddScaffoldingDataModule {}
