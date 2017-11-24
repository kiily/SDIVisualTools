import { AddScaffoldingDataPageComponent } from './pages/add-scaffolding-data-page/add-scaffolding-data-page.component';
import { SignUpPageComponent } from './pages/sign-up-page/sign-up-page.component';
import { ScaffoldingComponent } from './pages/scaffolding/scaffolding.component';
import { InnovationComponent } from './pages/innovation/innovation.component';
import { DiscoveryComponent } from './pages/discovery/discovery.component';
import { HomeComponent } from './pages/home/home.component';
import { WelcomePageComponent } from './pages/welcome-page/welcome-page.component';
import { Routes } from '@angular/router';



//This constants holds the configuration for all the necessary routes within the application
export const rootRouterConfig: Routes = [


    { path: '', component: WelcomePageComponent },
    { path: 'welcome-page', component: WelcomePageComponent },
    { path: 'sign-up-page', component: SignUpPageComponent },
    { path: 'home', component: HomeComponent },
    { path: 'scaffolding', component: ScaffoldingComponent },
    { path: 'add-scaffolding-data-page', component: AddScaffoldingDataPageComponent },
    { path: 'discovery', component: DiscoveryComponent },
    { path: 'innovation', component: InnovationComponent },
];