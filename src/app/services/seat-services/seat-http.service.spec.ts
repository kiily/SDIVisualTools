import { HttpModule } from '@angular/http';
import { TestBed, inject } from '@angular/core/testing';

import { SEATHttpService } from './seat-http.service';

describe('SEATService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SEATHttpService],
      imports: [HttpModule]
    });
  });

  it('should be created', inject([SEATHttpService], (service: SEATHttpService) => {
    expect(service).toBeTruthy();
  }));
});
