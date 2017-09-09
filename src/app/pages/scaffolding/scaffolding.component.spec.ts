import { AngularFireAuth } from 'angularfire2/auth';
import { AuthService } from '../../services/auth.service';
import { FirebaseApp } from 'angularfire2/app';
import { firebaseConfig } from './../../app.module';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2';
import { SEATFirebaseService } from '../../services/seat-services/seat-firebase.service';
import { SafeURLPipe } from '../../pipes/safe-url.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { LogoutComponent } from '../../components/logout/logout.component';
import { By } from '@angular/platform-browser';
import { SDINavbarComponent } from './../../components/sdinavbar/sdinavbar.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ScaffoldingComponent } from './scaffolding.component';



describe('ScaffoldingComponent', () => {
  let component: ScaffoldingComponent;
  let fixture: ComponentFixture<ScaffoldingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScaffoldingComponent, SDINavbarComponent, LogoutComponent, SafeURLPipe],
      imports: [RouterTestingModule,FormsModule, ReactiveFormsModule, AngularFireModule.initializeApp(firebaseConfig),
        AngularFireDatabaseModule],
      providers: [SEATFirebaseService, FirebaseApp, AuthService, AngularFireAuth]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScaffoldingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle a different report when clicked', () => {
   let button =  fixture.debugElement.query(By.css('.button'));
   //explictly click button
   button.triggerEventHandler('click',null);

   expect(component.phase).toBeLessThanOrEqual(5);
  });

 

});
