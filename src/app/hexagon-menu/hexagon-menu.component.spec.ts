import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HexagonMenuComponent } from './hexagon-menu.component';

describe('HexagonMenuComponent', () => {
  let component: HexagonMenuComponent;
  let fixture: ComponentFixture<HexagonMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HexagonMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HexagonMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
