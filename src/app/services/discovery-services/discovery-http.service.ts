import { HttpDataService } from '../http-data.service';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';


/*This Service can be used in the future to link-up with the a potential Discovery Data Gathering tool.
It is currently not in use and the URL passed to it is a "dummy".
*/
@Injectable()
export class DiscoveryHttpService extends HttpDataService{

  constructor(http : Http) { 
    super( "https://jsonplaceholder.typicode.com/posts", http);
  }
  
}
