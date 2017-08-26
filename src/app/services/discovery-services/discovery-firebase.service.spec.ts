import { TestBed, inject } from '@angular/core/testing';

import { DiscoveryFirebaseService } from './discovery-firebase.service';

describe('DiscoveryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DiscoveryFirebaseService]
    });
  });

  it('should be created', inject([DiscoveryFirebaseService], (service: DiscoveryFirebaseService) => {
    expect(service).toBeTruthy();
  }));
});
