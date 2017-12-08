import { DiscoveryComponent } from './../pages/discovery/discovery.component';
import { InnovationComponent } from './../pages/innovation/innovation.component';
import { AddScaffoldingDataPageComponent } from './../pages/scaffolding/add-scaffolding-data-page/add-scaffolding-data-page.component';
import { ScaffoldingComponent } from './../pages/scaffolding/scaffolding.component';
import { Routes } from '@angular/router';


export const componentRoutes: Routes = [
    { path: 'scaffolding', component: ScaffoldingComponent },
    { path: 'add-scaffolding-data-page', component: AddScaffoldingDataPageComponent },
    { path: 'discovery', component: DiscoveryComponent },
    { path: 'innovation', component: InnovationComponent }
];
