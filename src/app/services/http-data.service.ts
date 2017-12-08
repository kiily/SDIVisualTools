import { Url } from 'url';
import { Observable } from 'rxjs/Rx';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


/* This Service acts as a parent class for all other HTTP services as it provides the mthods
which enable the application to communicate via HTTP requests (e.g. REST API). 
This Service contains all CRUD methods - some are currently 
not in use but may be useful in the future*/
@Injectable()
export class HttpDataService {
    constructor(private url : string, private http : Http) {

    }

    //All the methods of this HttpDataService return observables; MISSING HTTP ERROR CATCHING

    //RETRIEVE
    getAll(){
        return this.http.get(this.url)
       .map(response => response.json())
    }

    //CREATE
    postResource(resource){
        return this.http.post(this.url, JSON.stringify(resource))
        .map(response => response.json())
    }

    //UPDATE
    updateResource(resource){
        //Use put by default to update the
        return this.http.put(this.url, JSON.stringify(resource))
        .map(response => response.json())
    }

    //DELETE
    removeResource(id){
        return this.http.delete(this.url + '/'+ id)
        .map(response => response.json())
    }

    //Private error handling method to respond to different HTTP errors
    private handleError(error : Response){
        //Account for 400 Error
         console.log(error);

    }


    setUrl(url:string){
        this.url = url;
    }
}