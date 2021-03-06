import { environment } from '../../environments/environment';
import { RouterTestingModule } from '@angular/router/testing';
import { AngularFireDatabaseModule } from 'angularfire2/database';

// import { FirebaseApp, FirebaseAppConfigToken } from 'angularfire2/app';
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
      providers: [AuthService, AngularFireAuth],
      imports: [AngularFireModule.initializeApp(environment.firebaseConfig), AngularFireAuthModule,
         AngularFireDatabaseModule, RouterTestingModule]
    });
  });

  it('should be created', inject([AuthService], (service: AuthService) => {
    expect(service).toBeTruthy();
  }));
});
