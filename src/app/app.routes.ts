
import { SignUpPageComponent } from './sign-up-page/sign-up-page.component';
import { ScaffoldingComponent } from './scaffolding/scaffolding.component';
import { InnovationComponent } from './innovation/innovation.component';
import { DiscoveryComponent } from './discovery/discovery.component';
import { HomeComponent } from './home/home.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { Routes } from '@angular/router';



//This constants holds the configuration for all the necessary routes within the application
export const rootRouterConfig: Routes = [
    { path: '', component: WelcomePageComponent },
    { path: 'scaffolding', component: ScaffoldingComponent },
    { path: 'discovery', component: DiscoveryComponent },
    { path: 'innovation', component: InnovationComponent },
    { path: 'home', component: HomeComponent },
    { path: 'welcome-page', component: WelcomePageComponent },
    { path: 'sign-up-page', component: SignUpPageComponent}
];