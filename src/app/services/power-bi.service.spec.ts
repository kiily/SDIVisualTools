import { TestBed, inject } from '@angular/core/testing';

import { PowerBIService } from './power-bi.service';

describe('PowerBIService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PowerBIService]
    });
  });

  it('should be created', inject([PowerBIService], (service: PowerBIService) => {
    expect(service).toBeTruthy();
  }));
});
