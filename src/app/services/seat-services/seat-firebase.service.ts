import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';

/*This Service handles the connection to Firebase for the data relevant to scaffolding. It provides
methods retrieve the links for the PowerBI reports as well as the links for the PowerBI app, dashboard
and Excel data source.

This Service may be extended in the future once an appropriate connection with SEAT is established */
@Injectable()
export class SEATFirebaseService {

  constructor(private afdb : AngularFireDatabase) { 

  }

  /*This method retrieves a FirebaseObjectObservable that contains the links for the PowerBI
  app, dahsboard and Excel data source */
  getAppLink(){
     let appLinks = this.afdb.object("/scaffolding/powerBIApp");
     return appLinks;
   }

   /* This method retrieves a FirebaseObjectObservable that contains the links for the PowerBI reports
   that are embedded within the app */
   getReportEmbedLinks(){
     let reportEmbedLinks = this.afdb.object("/scaffolding/powerBIReports");
     return reportEmbedLinks;
   }

}
 
