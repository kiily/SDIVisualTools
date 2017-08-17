import { AngularFireDatabaseModule } from 'angularfire2/database';
import { firebaseConfig } from '../app.module';

import { FirebaseApp, FirebaseAppConfigToken } from 'angularfire2/app';
import { AngularFireAuth, AngularFireAuthModule } from 'angularfire2/auth';
import { TestBed, inject } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { AngularFireModule } from "angularfire2";

describe('AuthService', () => {

  let fakeConfig = {
  apiKey: " ",
  authDomain: " ",
  databaseURL: " ",
  projectId: " ",
  storageBucket: " ",
  messagingSenderId: " "
}

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthService, AngularFireAuth, FirebaseApp],
      imports: [AngularFireModule.initializeApp(firebaseConfig), AngularFireAuthModule,
         AngularFireDatabaseModule]
    });
  });

  it('should be created', inject([AuthService], (service: AuthService) => {
    expect(service).toBeTruthy();
  }));
});
