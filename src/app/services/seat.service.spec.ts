import { HttpModule } from '@angular/http';
import { TestBed, inject } from '@angular/core/testing';

import { SEATService } from './seat.service';

describe('SEATService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SEATService],
      imports: [HttpModule]
    });
  });

  it('should be created', inject([SEATService], (service: SEATService) => {
    expect(service).toBeTruthy();
  }));
});
