import { By } from '@angular/platform-browser';
import { SDINavbarComponent } from './../sdinavbar/sdinavbar.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScaffoldingComponent } from './scaffolding.component';

describe('ScaffoldingComponent', () => {
  let component: ScaffoldingComponent;
  let fixture: ComponentFixture<ScaffoldingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScaffoldingComponent, SDINavbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScaffoldingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle a different report when clicked', () => {
   let button =  fixture.debugElement.query(By.css('.button'));
   //explictly click button
   button.triggerEventHandler('click',null);

   expect(component.phaseNumber).toBeLessThanOrEqual(5);
  });

});
