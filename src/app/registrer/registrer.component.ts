import { Component, OnInit } from '@angular/core';
import {Register} from 'ts-node';
import {Registrer} from './registrer';
import {Router} from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-registrer',
  templateUrl: './registrer.component.html',
  styleUrls: ['./registrer.component.css']
})
export class RegistrerComponent implements OnInit {
  public userr: Registrer = new Registrer('', '', '');
  constructor(public router: Router, public http: HttpClient) { }

  ngOnInit() {
  }
  valider(): boolean {
    if (this.userr.Email !== '' && this.userr.Password !== '' && this.userr.Password === this.userr.ConfirmPassword) {
      return true;
    }
    return false;
  }

  validerEmail(): boolean {
    if (this.userr.Email !== '') {
      return true;
    }
    return false;
  }

  validerPW(): boolean {
    if (this.userr.Password !== '') {
      return true;
    }
    return false;
  }

  validerCPW(): boolean {
    if (this.userr.ConfirmPassword === this.userr.Password) {
      return true;
    }
    return false;
  }

  public Register() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
      })
    };
    return this.http.post('/api/Account/Register', JSON.stringify(this.userr), httpOptions).
    subscribe( r => { this.router.navigate(['/']); }
    );
  }
}
