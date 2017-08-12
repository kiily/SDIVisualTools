import { HttpDataService } from './http-data.service';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class InnoflowService extends HttpDataService {

  constructor(http : Http) { 
    super('http://innoflow.herokuapp.com/api/users/2/innovations', http);
  }

}
