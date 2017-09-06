import { HttpDataService } from '../http-data.service';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';


/*This Service can be used in the future to link-up with the a potential Discovery Data Gathering tool.
It is currently not in user
*/
@Injectable()
export class DiscoveryHttpService extends HttpDataService{

  constructor(http : Http) { 
    super( "https://jsonplaceholder.typicode.com/posts", http);
  }
  
}
