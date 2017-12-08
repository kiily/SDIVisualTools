import { ReactiveFormsModule } from '@angular/forms';
import { LinkFormComponent } from './link-form/link-form.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  declarations: [
    LinkFormComponent
  ],
  exports: [
    LinkFormComponent
  ]
})
export class DiscoveryModule { }
