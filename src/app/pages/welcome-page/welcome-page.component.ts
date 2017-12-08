
import { AuthService } from '../../services/auth.service';
import { Component, OnInit } from '@angular/core';

/*This class acts as the controller for the WelcomePage component. It is associated with an HTML template
that renders the welcome page. Current features: user login and password reset, and navigation to the sign up page. 

References:
 - https://codepen.io/iamnbutler/pen/clrDk - Accessed July 2017
 - https://codepen.io/boltaway/pen/afpow - Accessed July 2017
 - https://www.freshdesignweb.com/css-login-form-templates/ - Accessed July 2017 */
 
@Component({
  selector: 'welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss']
})
export class WelcomePageComponent implements OnInit {

  // true --> LOGIN; false --> SIGN UP
  authMode: boolean = true;
  
  constructor(private authService : AuthService) {
  }

  ngOnInit() {
    // Checking whether last session was terminated
      this.authService.userScan();
  }

 
  toggleAuth(){
    this.authMode = !this.authMode;
  }


}


