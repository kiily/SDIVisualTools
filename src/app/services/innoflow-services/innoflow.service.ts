import { HttpDataService } from './../http-data.service';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class InnoflowService extends HttpDataService {


  constructor(http : Http) { 
    super('http://innoflow.herokuapp.com/api/users/1/innovations', http);
  }

  retrieveUserInnovations(userID){
    let url = 'http://innoflow.herokuapp.com/api/users/'+userID+'/innovations';
    this.setUrl(url);
    return this.getAll();
  }

  retrieveAllUsers(){
    let url = 'http://innoflow.herokuapp.com/api/users/search?string=an';
    this.setUrl(url);
    return this.getAll();

  }


}
 