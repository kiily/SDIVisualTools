import { BrowserModule } from '@angular/platform-browser';
import { Http, HttpModule } from '@angular/http';
import { TestBed, inject } from '@angular/core/testing';

import { InnoflowService } from './innoflow.service';

describe('InnoflowService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InnoflowService],
      imports: [HttpModule, BrowserModule]
    });
  });

  it('should be created', inject([InnoflowService], (service: InnoflowService) => {
    expect(service).toBeTruthy();
  }));
});
