import { componentRoutes } from './components.routes';
import { RouterModule } from '@angular/router';

import { ConfirmDialogComponent } from './alerts/confirm-dialog/confirm-dialog.component';
import { ErrorDialogComponent } from './alerts/error-dialog/error-dialog.component';
import { SDINavbarComponent } from './sdinavbar/sdinavbar.component';
import { NgModule } from '@angular/core';
import { HexagonMenuComponent } from './hexagon-menu/hexagon-menu.component';
import { LogoutComponent } from './logout/logout.component';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material';
import { LoginFormComponent } from './login-form/login-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SignupFormComponent } from './signup-form/signup-form.component';


@NgModule({
    declarations: [
        HexagonMenuComponent,
        LogoutComponent,
        SDINavbarComponent,
        ErrorDialogComponent,
        ConfirmDialogComponent,
        LoginFormComponent,
        SignupFormComponent
    ],
    imports : [
        CommonModule,
        MatDialogModule,
        ReactiveFormsModule,
        RouterModule.forChild(componentRoutes)
    ],
    entryComponents : [
        ErrorDialogComponent,
        ConfirmDialogComponent
    ],
    exports: [
        HexagonMenuComponent,
        LogoutComponent,
        SDINavbarComponent,
        ErrorDialogComponent,
        ConfirmDialogComponent,
        LoginFormComponent,
        SignupFormComponent,
        RouterModule
    ]

})
export class ComponentsModule {

}
