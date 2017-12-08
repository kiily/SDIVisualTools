import { InnovationModule } from './innovation/innovation.module';
import { DiscoveryModule } from './discovery/discovery.module';
import { HomeModule } from './home/home.module';
import { WelcomePageModule } from './welcome-page/welcome-page.module';
import { CommonModule } from '@angular/common';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { HomeComponent } from './home/home.component';
import { InnovationComponent } from './innovation/innovation.component';
import { DiscoveryComponent } from './discovery/discovery.component';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from '../components/components.module';
import { RouterModule } from '@angular/router';
import { ScaffoldingModule } from './scaffolding/scaffolding.module';

@NgModule({
    declarations: [
        DiscoveryComponent,
        InnovationComponent,
        WelcomePageComponent,
        HomeComponent,
    ],
    imports : [
        CommonModule,
        ReactiveFormsModule,
        WelcomePageModule,
        ScaffoldingModule,
        DiscoveryModule,
        InnovationModule,
        HomeModule,
        ComponentsModule,
        RouterModule

    ],
    exports : [
        WelcomePageComponent,
        RouterModule
    ]
})
export class PagesModule {

}
