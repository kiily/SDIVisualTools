import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProblemSheetFormComponent } from './problem-sheet-form.component';

describe('ProblemSheetFormComponent', () => {
  let component: ProblemSheetFormComponent;
  let fixture: ComponentFixture<ProblemSheetFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProblemSheetFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProblemSheetFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
