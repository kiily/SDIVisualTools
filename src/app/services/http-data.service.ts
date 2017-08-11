import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class HttpDataService {

    //This is the parent class of all the data services in the application
    //This data service enables the application to communicate via HTTP requests (e.g. RESTFul)
    //This Service contains all CRUD methods - some are currently not in use but may be useful in the future

    constructor(private url : string, private http : Http) {

    }

    //All the methods of this HttpDataService return observables

    getAll(){
        return this.http.get(this.url)
        .map(response => response.json());
    }

    postResource(resource){
        return this.http.post(this.url, JSON.stringify(resource))
        .map(response => response.json());
    }

    updateResource(resource){
        //Use put by default to update the
        return this.http.put(this.url, JSON.stringify(resource))
        .map(response => response.json());
    }

    removeResource(id){
        return this.http.delete(this.url + '/'+ id)
        .map(response => response.json());
    }
}