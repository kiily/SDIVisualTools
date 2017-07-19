import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SDINavbarComponent } from './sdinavbar.component';

describe('SDINavbarComponent', () => {
  let component: SDINavbarComponent;
  let fixture: ComponentFixture<SDINavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SDINavbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SDINavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
