import * as console from 'console';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { Router, RouterLinkWithHref } from '@angular/router';
import { HexagonMenuComponent } from '../../components/hexagon-menu/hexagon-menu.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';


describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeComponent, HexagonMenuComponent ],
      imports: [RouterTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should have a link back to the login page', () => {
    let debugElements = fixture.debugElement.queryAll(By.directive(RouterLinkWithHref));

    let index = debugElements.findIndex(de => de.properties['href'] === '/welcome-page');
    
    expect(index).toBeGreaterThan(-1);

  });
  
});
