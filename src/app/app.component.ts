import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Angular App';

  tweet = {
    body: "hello",
    likesCount: 10,
    isLiked: true
  }
}
