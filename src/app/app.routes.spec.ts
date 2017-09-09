import { AddScaffoldingDataPageComponent } from './pages/add-scaffolding-data-page/add-scaffolding-data-page.component';
import { InnovationComponent } from './pages/innovation/innovation.component';
import { DiscoveryComponent } from './pages/discovery/discovery.component';
import { HomeComponent } from './pages/home/home.component';
import { SignUpPageComponent } from './pages/sign-up-page/sign-up-page.component';
import { WelcomePageComponent } from './pages/welcome-page/welcome-page.component';
import { rootRouterConfig } from './app.routes';
import { ScaffoldingComponent } from './pages/scaffolding/scaffolding.component';


describe('rootRouterConfig', () => {

     it('should contain a route for the root' , () => {
        expect(rootRouterConfig).toContain(
            { path: '', component: WelcomePageComponent });
    });

      it('should contain a route for the /welcome-page' , () => {
        expect(rootRouterConfig).toContain(
            { path: 'welcome-page', component: WelcomePageComponent });
    });
      
     it('should contain a route for /sign-up-page' , () => {
        expect(rootRouterConfig).toContain(
            { path: 'sign-up-page', component: SignUpPageComponent });
    });

     it('should contain a route for /home' , () => {
        expect(rootRouterConfig).toContain(
            { path: 'home', component: HomeComponent });
    });

     it('should contain a route for /scaffolding' , () => {
        expect(rootRouterConfig).toContain(
            { path: 'scaffolding', component: ScaffoldingComponent });
    });

     it('should contain a route for /discovery' , () => {
        expect(rootRouterConfig).toContain(
            { path: 'discovery', component: DiscoveryComponent });
    });

    it('should contain a route for /innovation' , () => {
        expect(rootRouterConfig).toContain(
            { path: 'innovation', component: InnovationComponent });
    });

    it('should contain a route for /add-scaffolding-data-age' , () => {
        expect(rootRouterConfig).toContain(
            { path: 'add-scaffolding-data-page', component: AddScaffoldingDataPageComponent });
    });
})