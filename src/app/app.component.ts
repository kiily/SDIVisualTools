import { MdDialog } from '@angular/material';
import { Observable } from 'rxjs/Rx';
import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
    title = 'SDIVisualTools';
  // //stores firebase no-SQL list
  // items : FirebaseListObservable<any>;
  // //accesses the user state
  // user: Observable<firebase.User>;

}
