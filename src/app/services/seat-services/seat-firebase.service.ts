import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';

@Injectable()
export class SEATFirebaseService {

  constructor(private afdb : AngularFireDatabase) { 

  }

  getAppLink(){
     let appLinks = this.afdb.object("/scaffolding/powerBIApp");
     return appLinks;
   }

   getReportEmbedLinks(){
     let reportEmbedLinks = this.afdb.object("/scaffolding/powerBIReports");
     return reportEmbedLinks;
   }

}
 
