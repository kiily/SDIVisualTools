import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginFormComponent } from './login-form/login-form.component';
import { SignupFormComponent } from './signup-form/signup-form.component';
import { NgModule } from '@angular/core';


@NgModule({
    declarations: [
        SignupFormComponent,
        LoginFormComponent,
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule
    ],
    exports: [
        SignupFormComponent,
        LoginFormComponent,
    ]
})
export class WelcomePageModule {}
