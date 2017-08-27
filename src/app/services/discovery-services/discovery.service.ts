import { HttpDataService } from '../http-data.service';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class DiscoveryService extends HttpDataService{

  constructor(http : Http) { 
    super( "url to be determined", http);
  }
  
}
