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
  selectedUser;

  constructor(private innoflowService: InnoflowService) {

  }
 
  ngOnInit() {
  
    //  this.innoflowService.setUrl(this.usersUrl);
   
    //Get the innovations for the given url (hard coded at the moment)
   // this.innoflowService.getAll()
   this.innoflowService.retrieveAllUsers()
      .subscribe(users => {
        this.innoflowUsers = users;
        console.log(users);
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

    this.innoflowService.retrieveUserInnovations(userID)
     .subscribe(innovations => {
        this.innovations = innovations;
        console.log(this.innovations);
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

}
