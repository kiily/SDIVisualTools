import { FirebaseApp } from 'angularfire2/app';
import { AngularFireDatabase } from 'angularfire2/database';
import { TestBed, inject } from '@angular/core/testing';

import { SEATFirebaseService } from './seat-firebase.service';
import { AngularFireModule } from "angularfire2";
import { firebaseConfig } from "../../app.module";

describe('SEATFirebaseService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SEATFirebaseService, AngularFireDatabase, FirebaseApp],
      imports: [AngularFireModule.initializeApp(firebaseConfig)]
    });
  });

  it('should be created', inject([SEATFirebaseService], (service: SEATFirebaseService) => {
    expect(service).toBeTruthy();
  }));
});
