import { BrowserModule } from '@angular/platform-browser';
import { Http, HttpModule } from '@angular/http';
import { TestBed, inject } from '@angular/core/testing';

import { InnoflowHttpService } from './innoflow-http.service';

describe('InnoflowService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InnoflowHttpService],
      imports: [HttpModule, BrowserModule]
    });
  });

  it('should be created', inject([InnoflowHttpService], (service: InnoflowHttpService) => {
    expect(service).toBeTruthy();
  }));
});
