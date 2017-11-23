import { Router } from '@angular/router';
import { AuthValidator } from './../../common/validators/auth.validator';
import { AlertGenerator } from '../../components/alerts/alert-generator';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

/*This class acts as the controller for the SignUpPage component. It is associated with an HTML template that renders 
the sign up page. This includes a basic sign-up form with error validation so that the user
can register with the application.*/
@Component({
  selector: 'sign-up-page',
  templateUrl: './sign-up-page.component.html',
  styleUrls: ['./sign-up-page.component.scss']
})
export class SignUpPageComponent implements OnInit {

  signUpForm;
  
  constructor(private formBuilder : FormBuilder, private authService : AuthService,
    private alertGenerator : AlertGenerator, private authValidator : AuthValidator, 
  private router : Router) {

    this.signUpForm = formBuilder.group({
      email: ["", Validators.required],
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      password: ["", Validators.required],
      repeatPassword: ["", Validators.required]

    });

   }

  ngOnInit() {
  }


  /*This method retrieves the data from the signUpForm and validates this data
  before registering the user with the Firebase authentication service as well as creating
  a node for each user in the database (password is hidden). Note that email verification is
  required to complete registration */ 
  signUp() {

    //retrieve data from the form
    let email = this.signUpForm.controls.email.value;
    let password = this.signUpForm.controls.password.value;
    let repeatPassword = this.signUpForm.controls.repeatPassword.value;
    let firstName = this.signUpForm.controls.firstName.value;
    let lastName = this.signUpForm.controls.lastName.value;

    //check whether the passwords match
    if (password == repeatPassword) {
      //Catch the signup promise
      this.authService.signupUser(email, password)
        .then(authState => {
          
          //Send Email verification
          authState.sendEmailVerification();
          //Reset Form
          this.signUpForm.reset();

          //Extract unique user id
          let uid = authState.uid;
     
          //Register user and notify
          this.authService.registerUser(uid, email, firstName, lastName);
          this.alertGenerator.generateConfirmNotification("Registration was successful. Please verify your email before logging in.");
          this.router.navigate(['/welcome-page']);
          
        }).catch(error => {
     
          this.authValidator.handleAuthErrors(error);
        });

    }else{
      //PASSWORDS DO NOT MATCH
      this.alertGenerator.generateAuthAlert("Passwords do not match");
    }
  }


}
