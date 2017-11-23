import { SafeURLPipe } from '../pipes/safe-url.pipe';
import { MarkdownModule } from 'angular2-markdown';
import { rootRouterConfig } from '../app.routes';
import { CommonModule } from '@angular/common';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { SignUpPageComponent } from './sign-up-page/sign-up-page.component';
import { HomeComponent } from './home/home.component';
import { AddScaffoldingDataPageComponent } from './add-scaffolding-data-page/add-scaffolding-data-page.component';
import { InnovationComponent } from './innovation/innovation.component';
import { DiscoveryComponent } from './discovery/discovery.component';
import { ScaffoldingComponent } from './scaffolding/scaffolding.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ComponentModule } from '../components/components.module';

@NgModule({
    declarations: [
        ScaffoldingComponent,
        DiscoveryComponent,
        InnovationComponent,
        AddScaffoldingDataPageComponent,
        HomeComponent,
        SignUpPageComponent,
        WelcomePageComponent,
        SafeURLPipe        
    ], 
    imports : [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ComponentModule,
        MarkdownModule.forRoot(),        
        RouterModule.forChild(rootRouterConfig)
    ],
    exports : [
        ScaffoldingComponent,
        DiscoveryComponent,
        InnovationComponent,
        AddScaffoldingDataPageComponent,
        HomeComponent,
        SignUpPageComponent,
        WelcomePageComponent 
    ]
})
export class PagesModule {}