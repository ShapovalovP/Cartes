import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Router} from '@angular/router';
import {AppComponent} from '../app.component';
import {Login} from './login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginUser: Login = new Login( '' , '');
  constructor(public http: HttpClient, public router: Router, public app: AppComponent) { }
  public User: string = localStorage.getItem('User') ;
  ngOnInit() {
  }
  validerLog(): boolean {
    if (this.loginUser.username !== ''  ) {
      return true;
    }
    return false;
  }
  validerPw(): boolean {
    if (this.loginUser.password !== ''  ) {
      return true;
    }
    return false;
  }
  login() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
      })
    };

    const body = new HttpParams()
      .set('username', this.loginUser.username)
      .set('password', this.loginUser.password)
      .set('grant_type', this.loginUser.grant_type);

    this.http.post<any>('/api/Token', body.toString(), httpOptions)
      .subscribe(response => {
        localStorage.setItem('Token', response.access_token);
        localStorage.setItem('User', response.userName);
        this.app.User = localStorage.getItem('User') ;
        this.router.navigate(['login/cartes']);

      });
  }
}
