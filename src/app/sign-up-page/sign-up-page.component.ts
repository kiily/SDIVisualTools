import { AuthValidator } from './../common/validators/sign-up.validator';
import { AlertGenerator } from '../common/alerts/alert-generator';
import { AuthService } from '../services/auth.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'sign-up-page',
  templateUrl: './sign-up-page.component.html',
  styleUrls: ['./sign-up-page.component.css']
})
export class SignUpPageComponent implements OnInit {

  signUpForm;
  
  constructor(private formBuilder : FormBuilder, private authService : AuthService,
    private alertGenerator : AlertGenerator, private authValidator : AuthValidator) {

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


  signUp() {

    //retrieve data from the form
    let email = this.signUpForm.controls.email.value;
    let password = this.signUpForm.controls.password.value;
    let repeatPassword = this.signUpForm.controls.repeatPassword.value;
    let firstName = this.signUpForm.controls.firstName.value;
    let lastName = this.signUpForm.controls.lastName.value;

    console.log(email);
    //check whether the passwords match
    if (password == repeatPassword) {
      //Catch the signup promise
      this.authService.signupUser(email, password)
        .then(authState => {
          console.log(authState);
         
          console.log("sending email");
          //Email verification
          authState.sendEmailVerification();

         
          this.signUpForm.reset();

          //Extract unique user id
          let uid = authState.uid;
          console.log(uid);
          this.authService.registerUser(uid, email, firstName, lastName);
          this.alertGenerator.generateRegistrationConfirm("Registration was successful. Please verify your email before logging in.")

          //NAVIGATION (if any) SHOULD BE ADDED HERE
        }).catch(error => {
          console.log(error);
          this.authValidator.handleAuthErrors(error);
        });

    }else{
      //PASSWORDS DO NOT MATCH
      this.alertGenerator.generateAuthAlert("Passwords do not match");
    }
  }


}
