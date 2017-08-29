import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'logout-button',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private authService : AuthService, private router : Router) {
        
   }

  ngOnInit() {
  }

  logout(){
    this.authService.logout()
    .then(auth => {
      console.log(auth);
      this.router.navigate(['/welcome-page']);
    })
  }

}
