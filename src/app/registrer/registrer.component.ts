import { Component, OnInit } from '@angular/core';
import {Register} from 'ts-node';
import {Registrer} from './registrer';
import {Router} from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {log} from 'util';
import {catchError} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-registrer',
  templateUrl: './registrer.component.html',
  styleUrls: ['./registrer.component.css']
})
export class RegistrerComponent implements OnInit {
  public userr: Registrer = new Registrer('', '', '');

  public error: string = null;
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
    this.error = null;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
      })
    };
    return this.http.post('/api/Account/Register', JSON.stringify(this.userr), httpOptions)
     .pipe(catchError((response: any) => {
     console.log(response);
     if ( response.error.ModelState['model.Password'] != null) {
       this.error = response.error.ModelState['model.Password']['0']; }
//       console.log('VOT!! ' + response.error.ModelState['']['0']);
    if ( response.error.ModelState[''] != null) {
       this.error = response.error.ModelState['']['0']; }
    if ( this.error == null) {
       this.error = response.statusText; }
       return Observable.throw(response.statusText);
   }))
     .subscribe( response => {
      this.router.navigate(['/']);
      }
    );
  }
}
