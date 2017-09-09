import { AngularFireDatabase } from 'angularfire2/database';
import { firebaseConfig } from './../../app.module';
import { FirebaseApp } from 'angularfire2/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthService } from '../../services/auth.service';
import { LogoutComponent } from '../../components/logout/logout.component';
import * as console from 'console';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { Router, RouterLinkWithHref } from '@angular/router';
import { HexagonMenuComponent } from '../../components/hexagon-menu/hexagon-menu.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { AngularFireModule } from "angularfire2";


describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeComponent, HexagonMenuComponent, LogoutComponent ],
      imports: [RouterTestingModule, AngularFireModule.initializeApp(firebaseConfig)],
      providers: [AuthService, AngularFireAuth, FirebaseApp, AngularFireDatabase]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  
});
