import { TestBed, inject } from '@angular/core/testing';

import { InnoflowFirebaseService } from './innoflow-firebase.service';

describe('InnoflowFirebaseService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InnoflowFirebaseService]
    });
  });

  it('should be created', inject([InnoflowFirebaseService], (service: InnoflowFirebaseService) => {
    expect(service).toBeTruthy();
  }));
});
