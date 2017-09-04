import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddScaffoldingDataPageComponent } from './add-scaffolding-data-page.component';

describe('AddScaffoldingDataPageComponent', () => {
  let component: AddScaffoldingDataPageComponent;
  let fixture: ComponentFixture<AddScaffoldingDataPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddScaffoldingDataPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddScaffoldingDataPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
