import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InnovationMarkdownComponent } from './innovation-markdown.component';

describe('InnovationMarkdownComponent', () => {
  let component: InnovationMarkdownComponent;
  let fixture: ComponentFixture<InnovationMarkdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InnovationMarkdownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InnovationMarkdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
