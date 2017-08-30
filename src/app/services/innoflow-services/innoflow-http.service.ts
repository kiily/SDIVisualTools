import { HttpDataService } from './../http-data.service';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

/*This Service handles the connection to Innoflow's REST API for the data relevant to innovation.

It provides methods with HTTP requests to two endpoinst - students and innovations. One method is #
created to retrieve the JSON objects at each one of them. 

Requires a CORS Plugin on Google Chrome (or this needs to be added to the Innoflow API)*/
@Injectable()
export class InnoflowHttpService extends HttpDataService {


  constructor(http : Http) { 
    super('http://innoflow.herokuapp.com/api/users/1/innovations', http);
  }

  /*This method retrieves the innovations for a specified user. */
  retrieveUserInnovations(userID){
    let url = 'http://innoflow.herokuapp.com/api/users/'+userID+'/innovations';
    this.setUrl(url);
    return this.getAll();
  }

  /*This method retrieves all the userIDs of the users registered in the Innoflow
  Server. */
  retrieveAllUsers(){
    let url = 'http://innoflow.herokuapp.com/api/users/search?string=an';
    this.setUrl(url);
    return this.getAll();

  }


}
 