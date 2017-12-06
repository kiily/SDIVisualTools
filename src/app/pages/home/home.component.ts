import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

/*This class acts as the controller for the Home component. It is associated with an HTML template that renders 
the home page.*/
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  pageTitle = "home";
  
  constructor(private authService : AuthService) {

   }

  ngOnInit() {

    //Checking that a user is logged in
    this.authService.userScan();

  }

}

