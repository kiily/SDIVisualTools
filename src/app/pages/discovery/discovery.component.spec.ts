import { FirebaseListObservable } from 'angularfire2/database/firebase_list_observable';
import { RouterTestingModule } from '@angular/router/testing';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthService } from '../../services/auth.service';
import { MD_DIALOG_DATA, MdDialog, MdDialogRef } from '@angular/material';
import { AlertGenerator } from '../../common/alerts/alert-generator';
import { firebaseConfig } from './../../app.module';
import { AngularFireDatabase } from 'angularfire2/database';
import { DiscoveryFirebaseService } from '../../services/discovery-services/discovery-firebase.service';
import { ReactiveFormsModule } from '@angular/forms';
import { LogoutComponent } from '../../components/logout/logout.component';
import { SDINavbarComponent } from './../../components/sdinavbar/sdinavbar.component';
import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { DiscoveryComponent } from './discovery.component';
import { AngularFireModule } from "angularfire2";

describe('DiscoveryComponent', () => {
  let component: DiscoveryComponent;
  let fixture: ComponentFixture<DiscoveryComponent>;




  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiscoveryComponent, SDINavbarComponent, LogoutComponent ],
      imports: [ReactiveFormsModule, AngularFireModule.initializeApp(firebaseConfig),
      RouterTestingModule],
      providers: [DiscoveryFirebaseService, AngularFireDatabase, AlertGenerator, AuthService, AngularFireAuth,
        { provide: MD_DIALOG_DATA, useValue: {} },
        { provide: MdDialog, useValue: {} },
        { provide: MdDialogRef, useValue: {} }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscoveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });


});
