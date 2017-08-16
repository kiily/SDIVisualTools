import { NotFoundError } from '../common/error-handling/not-found-error';
import { BadInputRequestError } from '../common/error-handling/bad-input-request';
import { AppError } from '../common/error-handling/app-error';
import { InnoflowService } from './../services/innoflow.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-innovation',
  templateUrl: './innovation.component.html',
  styleUrls: ['./innovation.component.css'],
  
})
export class InnovationComponent implements OnInit {

  innovations: any[];

  constructor(private innoflowService: InnoflowService) {

  }
 
  ngOnInit() {

    //Get the innovations for the given url (hard coded at the moment)
    this.innoflowService.getAll()
      .subscribe(innovations => {
        this.innovations = innovations;
        console.log(innovations);
      }, (error: AppError) => {

        if (error instanceof BadInputRequestError) {
          //display toaster for this
        }
        if (error instanceof NotFoundError) {
          //display toaster for this
          console.log("Not found indeed");
        }
        //Propagate error to error handler
        else {
          throw error;
        }

      });
  }

}
