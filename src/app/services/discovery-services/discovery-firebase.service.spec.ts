import { FirebaseApp } from 'angularfire2/app';
import { AngularFireDatabase } from 'angularfire2/database/';
import { TestBed, inject } from '@angular/core/testing';

import { DiscoveryFirebaseService } from './discovery-firebase.service';
import { firebaseConfig } from "../../app.module";
import { AngularFireModule } from "angularfire2";

describe('DiscoveryFirebaseService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DiscoveryFirebaseService, AngularFireDatabase, FirebaseApp],
      imports: [AngularFireModule.initializeApp(firebaseConfig)]
      
    });
  });

  it('should be created', inject([DiscoveryFirebaseService], (service: DiscoveryFirebaseService) => {
    expect(service).toBeTruthy();
  }));
});
