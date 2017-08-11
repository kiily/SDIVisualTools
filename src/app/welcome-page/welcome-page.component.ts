import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { SignInValidators } from './sign-in.validators';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import * as pbi from 'powerbi-client';

@Component({
  selector: 'welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.css']
})
export class WelcomePageComponent implements OnInit {

  // loginForm = new FormGroup({
  //   email: new FormControl('', Validators.required),
  //   password: new FormControl('', Validators.required)
  // });

  loginForm;
  signUpForm;

  // signupForm = new FormGroup({
  //   email: new FormControl('', [Validators.required,
  //   Validators.minLength(6),
  //   SignInValidators.cannotContainSpace],
  //     SignInValidators.shouldBeUnique),
  //   password: new FormControl('', Validators.required),
  //   repeatPassword: new FormControl('', Validators.required),
  //   firstName: new FormControl('', Validators.required),
  //   lastName: new FormControl('', Validators.required)

  // });

  constructor(private router: Router, private formBuilder: FormBuilder,
    private authService: AuthService) {

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

        //check whether email is verified
        if (authState.auth.emailVerified) {
          this.loginForm.reset();
          //If everything is okay then navigate to home page
          this.router.navigate(['/home']);
        } else {
          console.log("email is not verified");
        }

      }).catch(error => {
        console.log(error);

      });

    //  //set errors at the form level (can call at individual
    // //form control object too)
    // this.loginForm.setErrors({
    //   invalidLogin: true
    // });
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

          console.log("sending email");
          //Email verification
          authState.auth.sendEmailVerification();

          this.signUpForm.reset();

          //Extract unique user id
          let uid = authState.uid;
          this.authService.registerUser(uid, email, firstName, lastName);

          //NAVIGATION (if any) SHOULD BE ADDED HERE
        }).catch(error => {
          console.log(error);
        });

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
