import { AppError } from './../common/error-handling/app-error';
import { NotFoundError } from '../common/error-handling/not-found-error';
import { BadInputRequestError } from './../common/error-handling/bad-input-request';
import { Observable } from 'rxjs/Rx';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

//reference MOSH TUTORIAL

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
        .map(response => response.json())
        .catch(this.handleError);
    }

    postResource(resource){
        return this.http.post(this.url, JSON.stringify(resource))
        .map(response => response.json())
        .catch(this.handleError);
    }

    updateResource(resource){
        //Use put by default to update the
        return this.http.put(this.url, JSON.stringify(resource))
        .map(response => response.json())
        .catch(this.handleError);
    }

    removeResource(id){
        return this.http.delete(this.url + '/'+ id)
        .map(response => response.json())
        .catch(this.handleError);
    }

    //Private error handling method to respond to different HTTP errors
    private handleError(error : Response){
        //Account for 400 Error
        if(error.status === 400){
            return Observable.throw(new BadInputRequestError(error.json()));
        }
        if(error.status === 404){
            return Observable.throw(new NotFoundError(error.json()));
        }

        return Observable.throw(new AppError(error.json()))

    }
}