import { Observable } from 'rxjs/Rx';
import { MarkdownComponent } from 'angular2-markdown';
import { Http, HttpModule, Response } from '@angular/http';
import * as http from 'http';
import { InnoflowHttpService } from './../../services/innoflow-services/innoflow-http.service';
import { SDINavbarComponent } from './../../components/sdinavbar/sdinavbar.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { InnovationComponent } from './innovation.component';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/map';


describe('InnovationComponent', () => {
  let component: InnovationComponent;
  let fixture: ComponentFixture<InnovationComponent>;

  let service : InnoflowHttpService;
  

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InnovationComponent, SDINavbarComponent, MarkdownComponent ], 
      providers: [InnoflowHttpService],
      imports: [HttpModule]
    })
    .compileComponents().then(() => {
       
    service = TestBed.get(InnoflowHttpService);
    });
  }));


  beforeEach(() => {
    fixture = TestBed.createComponent(InnovationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();   

  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('calls the service to retrieve innovations', () => {
    let innovations = [1,2,3];

    //fake function needs to have the same signature as getAll in the
    //Innoflow Service
    spyOn(service, 'getAll').and.callFake( () => {
        return Observable.from([innovations]);
    });

    component.ngOnInit();

    expect(component.innovations).toBe(innovations);
  });

 

});
 