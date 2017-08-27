import { RouterOutlet } from '@angular/router';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [RouterTestingModule.withRoutes([])]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`should have as title 'SDIVisualTools'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('SDIVisualTools');
  }));

  it('should have a router outlet', async(()=> {
    let debugElement = fixture.debugElement.query(By.directive(RouterOutlet));

    expect(debugElement).not.toBeNull();
  }));


});
