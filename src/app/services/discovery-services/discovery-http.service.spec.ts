import { TestBed, inject } from '@angular/core/testing';

import { DiscoveryHttpService } from './discovery-http.service';

describe('DiscoveryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DiscoveryHttpService]
    });
  });

  it('should be created', inject([DiscoveryHttpService], (service: DiscoveryHttpService) => {
    expect(service).toBeTruthy();
  }));
});
