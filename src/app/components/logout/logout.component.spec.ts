import { RouterTestingModule } from '@angular/router/testing';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { firebaseConfig } from './../../app.module';
import { FirebaseApp } from 'angularfire2/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthService } from '../../services/auth.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LogoutComponent } from './logout.component';
import { AngularFireModule } from "angularfire2";

describe('LogoutComponent', () => {
  let component: LogoutComponent;
  let fixture: ComponentFixture<LogoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogoutComponent ],
      providers: [AuthService, AngularFireAuth, FirebaseApp],
      imports: [AngularFireModule.initializeApp(firebaseConfig), AngularFireDatabaseModule,
        RouterTestingModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
