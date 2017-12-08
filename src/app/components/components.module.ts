import { componentRoutes } from './components.routes';
import { RouterModule } from '@angular/router';

import { ConfirmDialogComponent } from './alerts/confirm-dialog/confirm-dialog.component';
import { ErrorDialogComponent } from './alerts/error-dialog/error-dialog.component';
import { SDINavbarComponent } from './sdinavbar/sdinavbar.component';
import { NgModule } from '@angular/core';
import { HexagonMenuComponent } from './hexagon-menu/hexagon-menu.component';
import { LogoutComponent } from './logout/logout.component';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatToolbarModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
    declarations: [
        HexagonMenuComponent,
        LogoutComponent,
        SDINavbarComponent,
        ErrorDialogComponent,
        ConfirmDialogComponent,
        HeaderComponent
    ],
    imports : [
        CommonModule,
        BrowserAnimationsModule,
        MatToolbarModule,
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
        HeaderComponent,
        MatToolbarModule,
        RouterModule
    ]

})
export class ComponentsModule {

}
