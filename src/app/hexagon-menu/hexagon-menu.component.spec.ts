import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { RouterLinkWithHref } from '@angular/router';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HexagonMenuComponent } from './hexagon-menu.component';

describe('HexagonMenuComponent', () => {
  let component: HexagonMenuComponent;
  let fixture: ComponentFixture<HexagonMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HexagonMenuComponent ],
      imports: [RouterTestingModule]
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

    it('should have a link to the scaffolding page', () => {
    let debugElements = fixture.debugElement.queryAll(By.directive(RouterLinkWithHref));

    let index = debugElements.findIndex(de => de.properties['href'] === '/scaffolding');

    expect(index).toBeGreaterThan(-1);

  });

    it('should have a link to the discovery page', () => {
    let debugElements = fixture.debugElement.queryAll(By.directive(RouterLinkWithHref));

    let index = debugElements.findIndex(de => de.properties['href'] === '/discovery');

    expect(index).toBeGreaterThan(-1);

  });

    it('should have a link to the innovation page', () => {
    let debugElements = fixture.debugElement.queryAll(By.directive(RouterLinkWithHref));

    let index = debugElements.findIndex(de => de.properties['href'] === '/innovation');

    expect(index).toBeGreaterThan(-1);

  });


});
