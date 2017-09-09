import { HttpModule } from '@angular/http';
import { TestBed, inject } from '@angular/core/testing';

import { DiscoveryHttpService } from './discovery-http.service';

describe('DiscoveryHttpService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DiscoveryHttpService],
      imports: [HttpModule]
    });
  });

  it('should be created', inject([DiscoveryHttpService], (service: DiscoveryHttpService) => {
    expect(service).toBeTruthy();
  }));
});
