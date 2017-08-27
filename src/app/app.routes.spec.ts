import { InnovationComponent } from './innovation/innovation.component';
import { DiscoveryComponent } from './discovery/discovery.component';
import { HomeComponent } from './home/home.component';
import { SignUpPageComponent } from './sign-up-page/sign-up-page.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { rootRouterConfig } from './app.routes';
import { ScaffoldingComponent } from './scaffolding/scaffolding.component';


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
})