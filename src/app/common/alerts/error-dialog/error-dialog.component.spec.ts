import { MdDialogModule, MD_DIALOG_DATA, MdDialog, MdDialogRef } from '@angular/material';
import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { ErrorDialogComponent } from './error-dialog.component';

describe('ErrorDialogComponent', () => {
  let component: ErrorDialogComponent;
  let fixture: ComponentFixture<ErrorDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ErrorDialogComponent],
      imports: [MdDialogModule],
      providers: [
        {provide: MD_DIALOG_DATA, useValue: {}},
        {provide: MdDialog, useValue: {} },
        {provide: MdDialogRef, useValue: {}}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
