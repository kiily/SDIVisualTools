import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentModuleFormComponent } from './student-module-form.component';

describe('StudentModuleFormComponent', () => {
  let component: StudentModuleFormComponent;
  let fixture: ComponentFixture<StudentModuleFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentModuleFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentModuleFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
