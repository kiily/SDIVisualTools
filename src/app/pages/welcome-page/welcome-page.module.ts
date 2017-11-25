import { WelcomePageComponent } from './welcome-page.component';
import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations : [
        WelcomePageComponent,       
    ],
    imports :[
        MatToolbarModule,
        FormsModule,
        ReactiveFormsModule
    ],
    exports: [
        WelcomePageComponent
    ]
})
export class WelcomePageModule {}