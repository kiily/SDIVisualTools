import { AlertGenerator } from './../../../components/alerts/alert-generator';
import { AuthService } from './../../../services/auth.service';
import { Router } from '@angular/router';
import { AuthValidator } from './../../../common/validators/auth.validator';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  loginForm : FormGroup;
  
  constructor( private formBuilder: FormBuilder, private router: Router, private authService: AuthService, 
    private alertGenerator : AlertGenerator, private authValidator : AuthValidator) { 

    
    this.loginForm = formBuilder.group({
      email: ["", Validators.required],
      password: ["", Validators.required]
    });
  }

  ngOnInit() {
  }

   /*This method is triggered when pressing the login button. It extracts,
  the values of the email and password fields and compares them against the Firebase
  database. If the user's email has been verified, login proceeds. Errors are thrown
  for different cases*/
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
