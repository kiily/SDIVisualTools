import { PowerBILink } from './../../common/models/scaffolding/powerbi-link.model';
import { SEATFirebaseService } from './../../services/seat-services/seat-firebase.service';
import { AuthService } from './../../services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

/*This class acts as the controller for the Scaffolding component. It is associated with an HTML template that renders 
the scaffolding page. This page presents the PowerBI reports and the relevant buttons to navigate
around them. It also provides links to acces PowerBI related data such as the PowerBI SDI VisualTools
app.

References:
- http://callmenick.com/post/stylish-css-buttons -Accessed July 2017.
- https://bootsnipp.com/snippets/Oeo2N - Accessed July 2017  */
@Component({
  selector: 'app-scaffolding',
  templateUrl: './scaffolding.component.html',
  styleUrls: ['./scaffolding.component.scss']
})
export class ScaffoldingComponent implements OnInit {

  phase : string;

  //New Tab Toggle
  blankToggle : boolean = false;

  //PowerBI app and related links
  powerBIAppLinks : PowerBILink[] = [];

  //Report links
  reportLinks : PowerBILink[] = [];

  constructor(private seatFirebaseService : SEATFirebaseService, 
    private route : ActivatedRoute,  private authService : AuthService) {
      
     }

  ngOnInit() {
    //Checking that a user is logged in
    this.authService.userScan();

    //Handling the changes of phase
    this.route.queryParamMap
    .subscribe(params => {
      
      if(params){
        let phaseNumber = params.get('phaseNumber');
        this.phase =  phaseNumber;
      }
    });
  

    //Getting PowerBI related links (App, Dashboard)
    this.seatFirebaseService.getAppLink().subscribe( (appLinks) => {
      this.powerBIAppLinks = appLinks;

    });

    //Get links for the reports
    this.seatFirebaseService.getReportEmbedLinks().subscribe(reportLinks => {

    this.reportLinks = reportLinks;  
    console.log(this.reportLinks[0]);    
    });

  }

  /* This method changes the phase variable to the phase corresponding to the clicked button*/
  togglePhase(phaseNumber){
    this.phase= phaseNumber;   
  }

  /* Utility method to track the status of the blankToggle variable */
  private toggleBlank(){
    console.log(this.blankToggle);
  }



}
