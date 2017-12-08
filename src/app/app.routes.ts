import { HomeComponent } from './pages/home/home.component';
import { WelcomePageComponent } from './pages/welcome-page/welcome-page.component';
import { Routes } from '@angular/router';



// This constants holds the configuration for all the necessary routes within the application
export const rootRouterConfig: Routes = [
    { path: '', component: WelcomePageComponent },
    { path: 'welcome-page', component: WelcomePageComponent },
    { path: 'home', component: HomeComponent }
];
