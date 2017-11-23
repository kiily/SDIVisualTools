import { RouterModule } from '@angular/router';
import { ConfirmDialogComponent } from './alerts/confirm-dialog/confirm-dialog.component';
import { ErrorDialogComponent } from './alerts/error-dialog/error-dialog.component';
import { SDINavbarComponent } from './sdinavbar/sdinavbar.component';
import { NgModule } from '@angular/core';
import { HexagonMenuComponent } from './hexagon-menu/hexagon-menu.component';
import { LogoutComponent } from './logout/logout.component';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material';
import { rootRouterConfig } from '../app.routes';


@NgModule({
    declarations: [
        HexagonMenuComponent,
        LogoutComponent,
        SDINavbarComponent,
        ErrorDialogComponent,
        ConfirmDialogComponent
    ],
    imports : [
        CommonModule,
        MatDialogModule,
        RouterModule.forChild(rootRouterConfig)
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
        ConfirmDialogComponent
    ]

})

export class ComponentModule{}