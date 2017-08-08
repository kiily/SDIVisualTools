import { Observable } from 'rxjs/Rx';
import { Component } from '@angular/core';
import {AngularFire, AuthProviders, AuthMethods, FirebaseListObservable} from 'angularfire2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  //stores firebase no-SQL list
  items : FirebaseListObservable<any>;
  //accesses the user state
  user: Observable<firebase.User>;

}
