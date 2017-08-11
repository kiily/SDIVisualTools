import { TestBed, inject } from '@angular/core/testing';

import { InnoflowService } from './innoflow.service';

describe('InnoflowService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InnoflowService]
    });
  });

  it('should be created', inject([InnoflowService], (service: InnoflowService) => {
    expect(service).toBeTruthy();
  }));
});
