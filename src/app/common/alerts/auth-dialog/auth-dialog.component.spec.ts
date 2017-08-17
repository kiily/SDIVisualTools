import { MdDialogModule, MD_DIALOG_DATA, MdDialog, MdDialogRef } from '@angular/material';
import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { AuthDialogComponent } from './auth-dialog.component';

describe('AuthDialogComponent', () => {
  let component: AuthDialogComponent;
  let fixture: ComponentFixture<AuthDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthDialogComponent],
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
    fixture = TestBed.createComponent(AuthDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});