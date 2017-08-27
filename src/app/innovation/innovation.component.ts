import { FirebaseListObservable } from 'angularfire2/database/firebase_list_observable';
import { InnoflowFirebaseService } from '../services/innoflow-services/innoflow-firebase.service';
import { forEach } from '@angular/router/src/utils/collection';
import { NotFoundError } from '../common/error-handling/not-found-error';
import { BadInputRequestError } from '../common/error-handling/bad-input-request';
import { AppError } from '../common/error-handling/app-error';
import { InnoflowService } from './../services/innoflow-services/innoflow.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-innovation',
  templateUrl: './innovation.component.html',
  styleUrls: ['./innovation.component.css']
  
})
export class InnovationComponent implements OnInit {

  innovations: any[];
  innoflowUsers: any[];
  innoflowUsersFirebase : any[];

  selectedUser;

  constructor(private innoflowService: InnoflowService, private innoflowFirebaseService : InnoflowFirebaseService) {

  }
 
  ngOnInit() {

    this.innoflowFirebaseService.getUsers()
    .subscribe(users => {
      console.log("before users");
      console.log( users);
      
      this.innoflowUsersFirebase = users;
      console.log(this.innoflowUsersFirebase);
      
    });
     
   //Get the innovations for the given url (hard coded at the moment)
   //HTTP Implementation
   this.innoflowService.retrieveAllUsers()
      .subscribe(users => {
        this.innoflowUsers = users;
        // console.log(users);
      }, (error: AppError) => {

        if (error instanceof BadInputRequestError) {
          //display toaster for this
        }
        if (error instanceof NotFoundError) {
          //display toaster for this
          console.log("Not found indeed");
        }
        //Propagate error to error handler
        else {
          throw error;
        }

      });
  }

  //Activated by pressing the user
  getInnovations(userID, username){
    console.log(userID);
    console.log(username);

    this.selectedUser = {
      id: userID,
      username: username
    }

    this.innoflowFirebaseService.getUserInnovations(userID)
    .subscribe(innovations => {
      this.innovations = innovations;
      console.log(this.innovations);
    })

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
  }

//this function takes the http data and synchronizes it with Firebase
//THIS REQUIRES CORS BUT SHOULD NOW BE ABLE TO BYPASS THIS ISSUE once the data is on firebase
  syncInnovationData(){

    this.innoflowService.retrieveAllUsers()
    .subscribe(users =>{
      let innoflowUsers = users;
      for (let user of innoflowUsers){
        // console.log(user);
        this.innoflowFirebaseService.addInnovationUser(user);
     
    this.innoflowService.retrieveUserInnovations(user.id)
    .subscribe(innovationsHttp => {
          let innovations = innovationsHttp;
          for(let innovation of innovations){
          this.innoflowFirebaseService.addInnovation(innovation, user.id);
          }
      });
    }
    });

  }


}
