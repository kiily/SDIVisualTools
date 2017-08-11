import { InnoflowService } from './../services/innoflow.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-innovation',
  templateUrl: './innovation.component.html',
  styleUrls: ['./innovation.component.css']
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
        
      });
  }

}
