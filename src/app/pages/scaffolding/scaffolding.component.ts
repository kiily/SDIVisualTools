import { SEATFirebaseService } from './../../services/seat-services/seat-firebase.service';
import { AuthService } from './../../services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { SEATService } from '../../services/seat-services/seat.service';
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

  //report links
  reportLinks : string[] = [];

  constructor(private seatFirebaseService : SEATFirebaseService, private route : ActivatedRoute,
  private authService : AuthService) { }

  ngOnInit() {
    
    this.authService.userScan();

    this.route.queryParamMap
    .subscribe(params => {
      
      if(params){
        let phaseNumber = params.get('phaseNumber');
        this.phase =  phaseNumber;
      }
    })

    this.seatFirebaseService.getAppLink().subscribe( appLink => {
    
      this.appLink = appLink.link;
      this.appDashboardLinkPro = appLink.dashboardLinkPro;
      this.appDashboardLink = appLink.dashboardLink;
      this.excelLink = appLink.excelLink;
    });

    this.seatFirebaseService.getReportEmbedLinks().subscribe(reportLinks => {

      //Report links are accessed via Firebase key in the template -  name the variables accordingly here;
      //Page to open the report on is added to the URL
      let generalOverview = reportLinks.generalOverview+"&pageName=ReportSection0";
      let phase1 = reportLinks.phase1+"&pageName=ReportSection0";
      let phase2 = reportLinks.phase2+"&pageName=ReportSection0";
      let phase3 = reportLinks.phase3+"&pageName=ReportSection0";
      let phase4= reportLinks.phase4+"&pageName=ReportSection0";
      let timelineReport = reportLinks.generalOverview+"&pageName=ReportSection4";

      this.reportLinks.push(generalOverview, phase1 ,phase2 ,phase3, phase4, timelineReport);

    });

  }

  /* This method changes the phase variable to the phase corresponding to the clicked button*/
  togglePhase(phaseNumber){
    this.phase= phaseNumber;   
  }

  /* Utility method to track the status of the blankToggle variable */
  toggleBlank(){
    console.log(this.blankToggle);
  }



}
