import { AuthService } from '../../services/auth.service';
import { InnoflowFirebaseService } from '../../services/innoflow-services/innoflow-firebase.service';
import { forEach } from '@angular/router/src/utils/collection';
import { InnoflowHttpService } from './../../services/innoflow-services/innoflow-http.service';
import { Component, OnInit } from '@angular/core';


/*This class acts as the controller for the Innovation component. It is associated with an HTML template that renders 
the innovation page. This page presents the student numbers and their attached innovations which are stored in the Firebase
database. A synchronisation function is provided to fetch the most recent data from Innoflow and automatically
update the Firebase schema

References:
 - Library used to render markdown with Prism.js: ttps://libraries.io/npm/angular2-markdown - July 2017
 */
@Component({
  selector: 'app-innovation',
  templateUrl: './innovation.component.html',
  styleUrls: ['./innovation.component.scss']
  
})
export class InnovationComponent implements OnInit {

  innovations: any[];
  innoflowUsers: any[];
  // innoflowUsersFirebase : FirebaseListObservable<any[]>;
  innoflowUsersFirebase;

  selectedUser;

  constructor(private innoflowHttpService: InnoflowHttpService, private innoflowFirebaseService : InnoflowFirebaseService,
  private authService : AuthService) {

  }
 
  /*User the Angular lifecyle hook to retrieve the innovation data */
  ngOnInit() {

    //Checking that a user is logged in
    this.authService.userScan();

    //Get the student numbers
    this.innoflowUsersFirebase = this.innoflowFirebaseService.getUsers();
    
  }
  
  //Activated by pressing a given student number. It loads of all that user's innovations
  getInnovations(userID, username){

    // this.selectedUser = {
    //   id: userID,
    //   username: username
    // }

    // this.innoflowFirebaseService.getUserInnovations(userID)
    // .subscribe(innovations => {
    //   this.innovations = innovations;
    // });    
  }

/*This method takes makes HTTP requests to Innoflow to retrieve data from the Innoflow Server
 and synchronizes it with Firebase */
  syncInnovationData(){

    //Retrieve all the student IDs
    this.innoflowHttpService.retrieveAllUsers()
    .subscribe(users =>{
      let innoflowUsers = users;
      //push each user to Firebase
      for (let user of innoflowUsers){
        
        this.innoflowFirebaseService.addInnovationUser(user);
     //Retrieve the innovations for each user
    this.innoflowHttpService.retrieveUserInnovations(user.id)
    .subscribe(innovationsHttp => {
          let innovations = innovationsHttp;
          for(let innovation of innovations){
            //Add the innovations to the relevant users on Firebase
          this.innoflowFirebaseService.addInnovation(innovation, user.id);
          }
      });
    }
    });

  }


}


/* DEPRECATED IMPLEMENTATIONS - For reference only 

This deprecated implementation required CORS - cross origin resource sharing is not
enabled in the Innoflow API - this implementation works using a plugin for Chrome - the
plugin needs to be enabled for the synchronisation to work. Once the data is on Firebase,
the plugin is no longer necessary.

CORS Toggle - https://chrome.google.com/webstore/detail/cors-toggle/omcncfnpmcabckcddookmnajignpffnh?utm_source=chrome-app-launcher-info-dialog

 //HTTP Implementation (DEPRECATED - kept this here just in case)
  //  this.innoflowService.retrieveAllUsers()
  //     .subscribe(users => {
  //       this.innoflowUsers = users;
  //       // console.log(users);
  //     }, (error: AppError) => {

  //       if (error instanceof BadInputRequestError) {
  //         //display toaster for this
  //       }
  //       if (error instanceof NotFoundError) {
  //         //display toaster for this
  //         console.log("Not found indeed");
  //       }
  //       //Propagate error to error handler
  //       else {
  //         throw error;
  //       }

  //     });*/

  //DEPRECATED IMPLEMENTATION FOR HTTP SERVICES
    // this.innoflowService.retrieveUserInnovations(userID)
    //  .subscribe(innovations => {
    //     this.innovations = innovations;
    //     console.log(this.innovations);
    //   }, (error: AppError) => {

    //     if (error instanceof BadInputRequestError) {
    //       //display toaster for this
    //     }
    //     if (error instanceof NotFoundError) {
    //       //display toaster for this
    //       console.log("Not found indeed");
    //     }
    //     //Propagate error to error handler
    //     else {
    //       throw error;
    //     }

    //   });
