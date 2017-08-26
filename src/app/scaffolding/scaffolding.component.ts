import { SEATService } from '../services/seat-services/seat.service';
import { FirebaseObjectObservable } from 'angularfire2/database/firebase_object_observable';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-scaffolding',
  templateUrl: './scaffolding.component.html',
  styleUrls: ['./scaffolding.component.css']
})
export class ScaffoldingComponent implements OnInit {
  phaseNumber : number;
  appLink : string;
  appDashboardLinkPro : string;
  appDashboardLink : string;

  constructor(private seatService : SEATService) { }

  ngOnInit() {

    this.seatService.getAppLink().subscribe( appLink => {
    
      this.appLink = appLink.link;
      this.appDashboardLinkPro = appLink.dashboardLinkPro;
      this.appDashboardLink = appLink.dashboardLink;
      console.log(this.appDashboardLinkPro);
      console.log(this.appLink);
    });
  }

  togglePhase(phaseNumber : number){
    this.phaseNumber= phaseNumber;
    console.log(this.phaseNumber);
    console.log(phaseNumber);
  }


}
