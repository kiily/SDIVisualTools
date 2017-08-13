import { AuthValidator } from '../common/validators/sign-up.validator';
import { AlertGenerator } from '../common/alerts/alert-generator';
import { AuthDialogComponent } from './../auth-dialog/auth-dialog.component';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.css']
})
export class WelcomePageComponent implements OnInit {

  loginForm;
  signUpForm;



  constructor(private router: Router, private formBuilder: FormBuilder,
    private authService: AuthService, private alertGenerator : AlertGenerator,
  private AuthValidator : AuthValidator) {


    this.loginForm = formBuilder.group({
      email: ["", Validators.required],
      password: ["", Validators.required]
    });

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

  login() {

    let email = this.loginForm.controls.email.value;
    let password = this.loginForm.controls.password.value;

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
        this.AuthValidator.handleAuthErrors(error);

      });
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
          console.log("user should have been registered");

          //NAVIGATION (if any) SHOULD BE ADDED HERE
        }).catch(error => {
          console.log(error);
          this.AuthValidator.handleAuthErrors(error);
        });

    }else{
      //PASSWORDS DO NOT MATCH
      this.alertGenerator.generateAuthAlert("Passwords do not match");
    }
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
  //create a property (getter) this is similar to a method
  get username() {
    return this.loginForm.get('username');
  }

 

}


