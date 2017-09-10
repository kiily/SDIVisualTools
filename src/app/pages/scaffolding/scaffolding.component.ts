import { SEATFirebaseService } from './../../services/seat-services/seat-firebase.service';
import { AuthService } from './../../services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { FirebaseObjectObservable } from 'angularfire2/database/firebase_object_observable';
import { Component, OnInit } from '@angular/core';

/*This class acts as the controller for the Scaffolding component. It is associated with an HTML template that renders 
the scaffolding page. This page presents the PowerBI reports and the relevant buttons to navigate
around them. It also provides links to acces PowerBI related data such as the PowerBI SDI VisualTools
app.

References:
-  http://callmenick.com/post/stylish-css-buttons -Accessed July 2017.
- https://bootsnipp.com/snippets/Oeo2N - Accessed July 2017  */
@Component({
  selector: 'app-scaffolding',
  templateUrl: './scaffolding.component.html',
  styleUrls: ['./scaffolding.component.css']
})
export class ScaffoldingComponent implements OnInit {

  phase : string;

  //New Tab Toggle
  blankToggle : boolean = false;

  //PowerBI app and related links
  powerBIAppLinks : any[] = [];

  //Report links
  reportLinks : any[] = [];

  constructor(private seatFirebaseService : SEATFirebaseService, 
    private route : ActivatedRoute,  private authService : AuthService) {
      
     }

  ngOnInit() {
    //Checking that a user is logged in
    this.authService.userScan();


    this.route.queryParamMap
    .subscribe(params => {
      
      if(params){
        let phaseNumber = params.get('phaseNumber');
        this.phase =  phaseNumber;
      }
    });
  

    //Getting PowerBI related links (App, Dashboard)
    this.seatFirebaseService.getAppLink().subscribe( appLink => {
    
      let app = appLink.link;
      let appDashboardPro = appLink.dashboardLinkPro;
      
      this.powerBIAppLinks.push(app,appDashboardPro);

    });

    //Get links for the reports
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
