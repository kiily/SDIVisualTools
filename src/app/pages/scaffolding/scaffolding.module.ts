import { ScaffoldingComponent } from './scaffolding.component';
import { CommonModule } from '@angular/common';
import { AddScaffoldingDataPageComponent } from './add-scaffolding-data-page/add-scaffolding-data-page.component';
import { NgModule } from '@angular/core';
import { ComponentsModule } from '../../components/components.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AddScaffoldingDataModule } from './add-scaffolding-data-page/add-scaffolding-data-page.module';

@NgModule({
    declarations: [
        ScaffoldingComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        ComponentsModule,
        AddScaffoldingDataModule
    ],
    exports: [
        ScaffoldingComponent
    ]
})
export class ScaffoldingModule {}
