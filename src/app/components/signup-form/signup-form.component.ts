import { AuthValidator } from './../../common/validators/auth.validator';
import { Router } from '@angular/router';
import { AlertGenerator } from './../alerts/alert-generator';
import { AuthService } from './../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.scss']
})
export class SignupFormComponent implements OnInit {

  signUpForm : FormGroup;
  
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
