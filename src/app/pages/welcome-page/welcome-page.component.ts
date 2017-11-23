
import { AuthValidator } from '../../common/validators/auth.validator';
import { AlertGenerator } from '../../components/alerts/alert-generator';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

/*This class acts as the controller for the WelcomePage component. It is associated with an HTML template
that renders the welcome page. Current features: user login and password reset, and navigation to the sign up page. 

References:
 - https://codepen.io/iamnbutler/pen/clrDk - Accessed July 2017
 - https://codepen.io/boltaway/pen/afpow - Accessed July 2017
 - https://www.freshdesignweb.com/css-login-form-templates/ - Accessed July 2017 */
 
@Component({
  selector: 'welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.css']
})
export class WelcomePageComponent implements OnInit {

  loginForm;

  constructor(private router: Router, private formBuilder: FormBuilder,
    private authService: AuthService, private alertGenerator : AlertGenerator,
  private authValidator : AuthValidator) {


    this.loginForm = formBuilder.group({
      email: ["", Validators.required],
      password: ["", Validators.required]
    });

  }

  ngOnInit() {
    //Checking whether last session was terminated
      this.authService.userScan();
  }

  /*This method is triggered when pressing the login button. It extracts,
  the values of the email and password fields and compares them against the Firebase
  database. If the user's email has been verified, login proceeds. Errors are thrown
  for differebt cases*/
  login() {

    let email = this.loginForm.controls.email.value;
    let password = this.loginForm.controls.password.value;

    //Catch the loginPromise
    this.authService.login(email, password)
      .then(authState => {
        //check whether email is verified
        if (authState.emailVerified) {
          //Reset the login form
          this.loginForm.reset();

          //If everything is okay then navigate to home page
          this.router.navigate(['/home']);
        } else {
          this.alertGenerator.generateAuthAlert("Please verify your email");
        }

      }).catch(error => {
        this.authValidator.handleAuthErrors(error);
      });
    
  }

  /*This method is triggered when pressing the sign-up button */
  goToSignUp(){
    this.router.navigate(['/sign-up-page']);
  }


  /* This method sends a password reset email to the user. (Preliminary implementation
  - the email that the password reset is sent to needs to be in the login form) */
  resetPassword(){
   let email = this.loginForm.controls.email.value;
   this.authService.resetPassword(email)
   .then(() => {
    //  console.log("EMAIL SENT");
   })
    .catch( error =>{
      // console.log(error);
    });
  }


}


