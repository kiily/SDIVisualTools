import { TestBed, inject } from '@angular/core/testing';

import { SEATFirebaseService } from './seatfirebase.service';

describe('SEATFirebaseService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SEATFirebaseService]
    });
  });

  it('should be created', inject([SEATFirebaseService], (service: SEATFirebaseService) => {
    expect(service).toBeTruthy();
  }));
});
