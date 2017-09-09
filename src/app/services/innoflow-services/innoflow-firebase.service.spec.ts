import { FirebaseApp } from 'angularfire2/app';
import { AngularFireDatabase } from 'angularfire2/database';
import { TestBed, inject } from '@angular/core/testing';

import { InnoflowFirebaseService } from './innoflow-firebase.service';
import { firebaseConfig } from "../../app.module";
import { AngularFireModule } from "angularfire2";

describe('InnoflowFirebaseService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InnoflowFirebaseService, AngularFireDatabase, FirebaseApp],
      imports: [ AngularFireModule.initializeApp(firebaseConfig)]
    });
  });

  it('should be created', inject([InnoflowFirebaseService], (service: InnoflowFirebaseService) => {
    expect(service).toBeTruthy();
  }));
});
