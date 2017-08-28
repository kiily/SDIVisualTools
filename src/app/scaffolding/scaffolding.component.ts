import { ActivatedRoute } from '@angular/router';
import { SEATService } from '../services/seat-services/seat.service';
import { FirebaseObjectObservable } from 'angularfire2/database/firebase_object_observable';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-scaffolding',
  templateUrl: './scaffolding.component.html',
  styleUrls: ['./scaffolding.component.css']
})
export class ScaffoldingComponent implements OnInit {
  phase : string;
  appLink : string;
  appDashboardLinkPro : string;
  appDashboardLink : string;
  excelLink : string;

  blankToggle : boolean = false;

  constructor(private seatService : SEATService, private route : ActivatedRoute) { }

  ngOnInit() {
    
    this.route.queryParamMap
    .subscribe(params => {
      console.log(params);
      if(params){
        let phaseNumber = params.get('phaseNumber');
        console.log("phase from params: "+phaseNumber);
        this.phase =  phaseNumber;
      }
    })

    this.seatService.getAppLink().subscribe( appLink => {
    
      this.appLink = appLink.link;
      this.appDashboardLinkPro = appLink.dashboardLinkPro;
      this.appDashboardLink = appLink.dashboardLink;
      this.excelLink = appLink.excelLink;
    });

    console.log("phase: "+this.phase);

    console.log(this.blankToggle);
  }

  togglePhase(phaseNumber){
    this.phase= phaseNumber;
    console.log("ethod");
    console.log(this.phase);
    console.log(phaseNumber);
    console.log("after method");
    
  }

  /*Utility method to track the status of the blankToggle variable */
  toggleBlank(){
    console.log(this.blankToggle);
  }



}
