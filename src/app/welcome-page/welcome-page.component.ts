import { SignInValidators } from './sign-in.validators';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.css']
})
export class WelcomePageComponent implements OnInit {
  form = new FormGroup({
    username: new FormControl('',[Validators.required, 
      Validators.minLength(3),
      SignInValidators.cannotContainSpace], 
      SignInValidators.shouldBeUnique),
    password: new FormControl('', Validators.required)
  });

  constructor() { }
  ngOnInit() {
  }

  login(){
       //set errors at the form level (can call at individual
      //form control object too)
      this.form.setErrors({
        invalidLogin: true
      });
    }
  

  //create a property (getter) this is similar to a method
  get username(){
    return this.form.get('username');
  }

}
