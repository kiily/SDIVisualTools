import { WelcomePageModule } from './welcome-page/welcome-page.module';
import { HomeCardsComponent } from './home/home-cards/home-cards.component';
import { ScrollIconComponent } from './home/scroll-icon/scroll-icon.component';
import { LoginFormComponent } from './welcome-page/login-form/login-form.component';
import { SignupFormComponent } from './welcome-page/signup-form/signup-form.component';

import { SafeURLPipe } from '../pipes/safe-url.pipe';
import { MarkdownModule } from 'angular2-markdown';
import { rootRouterConfig } from '../app.routes';
import { CommonModule } from '@angular/common';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { HomeComponent } from './home/home.component';
import { AddScaffoldingDataPageComponent } from './add-scaffolding-data-page/add-scaffolding-data-page.component';
import { InnovationComponent } from './innovation/innovation.component';
import { DiscoveryComponent } from './discovery/discovery.component';
import { ScaffoldingComponent } from './scaffolding/scaffolding.component';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material';
import { ComponentsModule } from '../components/components.module';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [
        ScaffoldingComponent,
        DiscoveryComponent,
        InnovationComponent,
        AddScaffoldingDataPageComponent,
        HomeComponent,
        WelcomePageComponent,
        ScrollIconComponent,
        HomeCardsComponent,
        SafeURLPipe
    ],
    imports : [
        CommonModule,
        FormsModule,
        WelcomePageModule,
        ReactiveFormsModule,
        ComponentsModule,
        MarkdownModule.forRoot(),
        RouterModule

    ],
    exports : [
        ScaffoldingComponent,
        DiscoveryComponent,
        InnovationComponent,
        AddScaffoldingDataPageComponent,
        HomeComponent,
        WelcomePageComponent,
        RouterModule
    ]
})
export class PagesModule {

}
