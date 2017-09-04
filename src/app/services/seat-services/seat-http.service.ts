import { AngularFireDatabase } from 'angularfire2/database';import { HttpDataService } from '../http-data.service';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

/*This class can be used in the future to link-up with the SEAT REST API.
Currently this class is only use to retrieve the PowerBI App link so that it can be
accessed from inside the app. If necessary, the link can be changed directly in the firebase 
console. (the same was done for the dashboard)
*/
@Injectable()
export class SEATHttpService extends HttpDataService {

  constructor(http : Http) {
    super('https://sdi-visual-tools.firebaseio.com/.json?print=pretty&format=export&download=sdi-visual-tools-export.json&auth=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1MDQyODcwNzcsImV4cCI6MTUwNDI5MDY3NywiYWRtaW4iOnRydWUsInYiOjB9.FBtPv8CpJbSjWqA1vxvAS-NvpYyzH9PpNqL6un6X-To ', http);
   }


}
 