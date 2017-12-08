import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttemptFormComponent } from './attempt-form.component';

describe('AttemptFormComponent', () => {
  let component: AttemptFormComponent;
  let fixture: ComponentFixture<AttemptFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttemptFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttemptFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
