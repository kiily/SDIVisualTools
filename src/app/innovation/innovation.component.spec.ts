import { MarkdownComponent } from 'angular2-markdown';
import { Http, HttpModule } from '@angular/http';
import * as http from 'http';
import { InnoflowService } from './../services/innoflow.service';
import { SDINavbarComponent } from './../sdinavbar/sdinavbar.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InnovationComponent } from './innovation.component';

describe('InnovationComponent', () => {
  let component: InnovationComponent;
  let fixture: ComponentFixture<InnovationComponent>;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InnovationComponent, SDINavbarComponent, MarkdownComponent ], 
      providers: [InnoflowService],
      imports: [HttpModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InnovationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
