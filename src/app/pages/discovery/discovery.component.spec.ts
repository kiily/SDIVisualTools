import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { ErrorDialogComponent } from '../../common/alerts/error-dialog/error-dialog.component';
import { DiscoveryFirebaseService } from './../../services/discovery-services/discovery-firebase.service';
import { FirebaseListObservable } from 'angularfire2/database/firebase_list_observable';
import { RouterTestingModule } from '@angular/router/testing';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthService } from '../../services/auth.service';
import { MD_DIALOG_DATA, MdDialog, MdDialogRef, MdDialogModule } from '@angular/material';
import { AlertGenerator } from '../../common/alerts/alert-generator';
import { firebaseConfig } from './../../app.module';
import { AngularFireDatabase } from 'angularfire2/database';
import { ReactiveFormsModule } from '@angular/forms';
import { LogoutComponent } from '../../components/logout/logout.component';
import { SDINavbarComponent } from './../../components/sdinavbar/sdinavbar.component';
import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { DiscoveryComponent } from './discovery.component';
import { AngularFireModule } from "angularfire2";
import {NgModule} from '@angular/core';

@NgModule({
  declarations: [ErrorDialogComponent],
  exports: [ErrorDialogComponent],
  entryComponents: [ErrorDialogComponent],
  imports: [MdDialogModule],
})
class DialogTestModule { }

describe('DiscoveryComponent', () => {
  let dialog: MdDialog;


  let component: DiscoveryComponent;
  let fixture: ComponentFixture<DiscoveryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiscoveryComponent, SDINavbarComponent, LogoutComponent ],
      imports: [ReactiveFormsModule, AngularFireModule.initializeApp(firebaseConfig),RouterTestingModule, DialogTestModule,
      MdDialogModule],
      providers: [DiscoveryFirebaseService, AngularFireDatabase, AlertGenerator, AuthService, AngularFireAuth,
        { provide: MD_DIALOG_DATA, useValue: {} },
        { provide: MdDialog, useValue: {} },
        { provide: MdDialogRef, useValue: {} }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscoveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

   

    
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should add a link to the database', () => {
      let service = TestBed.get(DiscoveryFirebaseService);

      expect(service).toBeDefined();
      let spy = spyOn(service, 'addDiscoveryLink');

      component.addNewLink();

      expect(spy).toHaveBeenCalled();


  });

//   it('should remove a link to the database', () => {
//     let service = TestBed.get(DiscoveryFirebaseService);

//     expect(service).toBeDefined();
//     let spy = spyOn(service, 'deleteLink');


//     component.removeLink("link");

//     expect(spy).toHaveBeenCalled();


// });


});
