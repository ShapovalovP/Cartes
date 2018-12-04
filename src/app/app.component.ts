import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public User: string = localStorage.getItem('User') ;



  logout(): void {
    localStorage.removeItem('Token');
    localStorage.removeItem('User');
    this.User = null;
  }
}
