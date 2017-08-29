
import { AuthValidator } from '../../common/validators/auth.validator';
import { AlertGenerator } from '../../common/alerts/alert-generator';
import { AuthDialogComponent } from '../../common/alerts/auth-dialog/auth-dialog.component';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

/*This class acts as the controller for the WelcomePage component. It is associated with an HTML template
that renders the welcome page. Current features: user login and password reset, and navigation to the sign up page. */
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
      this.authService.userScan();
  }

  /*This function is triggeret */
  login() {

    let email = this.loginForm.controls.email.value;
    let password = this.loginForm.controls.password.value;

    //Enabled a temp offline login for demos
    if(email ==="admin" && password=="admin"){
         this.router.navigate(['/home']);
    }else{
    //Catch the loginPromise
    this.authService.login(email, password)
      .then(authState => {

          console.log(authState);
        //check whether email is verified
        if (authState.emailVerified) {

          this.loginForm.reset();
          //If everything is okay then navigate to home page
          this.router.navigate(['/home']);
        } else {

          this.alertGenerator.generateAuthAlert("Please verify your email");

        }

      }).catch(error => {
        console.log(error);
        this.authValidator.handleAuthErrors(error);


      });
    }
  }

  goToSignUp(){
    this.router.navigate(['/sign-up-page']);
  }


  resetPassword(){
   let email = this.loginForm.controls.email.value;
   this.authService.resetPassword(email)
   .then(() => {
     console.log("emairu sent");
   })
    .catch( error =>{
      console.log(error);
    });
  }


}


