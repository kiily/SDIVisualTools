import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Component, OnInit } from '@angular/core';


/*This class acts as the controller for the Lougout component; this is the button
that logs the user out of the application. It is associated with an HTML template that renders the logout button.
*/
@Component({
  selector: 'logout-button',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(private authService : AuthService, private router : Router) {
        
   }

  ngOnInit() {
  }

  logout() {
    this.authService.logout()
    .then(auth => {
      console.log(auth);
      this.router.navigate(['/welcome-page']);
    });
  }

  
}
