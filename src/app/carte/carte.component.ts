import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {Carte} from './carte';

@Component({
  selector: 'app-carte',
  templateUrl: './carte.component.html',
  styleUrls: ['./carte.component.css']
})
export class CarteComponent implements OnInit {
  public  tabCartAletoir: Carte [] = [];
  public  tabCartUser: Carte [] = [];


  constructor(public router: Router, public http: HttpClient) { }

  ngOnInit() {
   this.getAletoir();
   this.getCartsUser();
  }
  getAletoir() {
    const token = localStorage.getItem('Token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    };
    return this.http.get<Carte[]> ('api/Cartes/Aletoir', httpOptions ). subscribe( r => this.tabCartAletoir = r);
  }
  getCartsUser() {
    const token = localStorage.getItem('Token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    };
    return this.http.get<Carte[]> ('api/Cartes/Aletoir', httpOptions ). subscribe( r => this.tabCartUser = r);
  }
}
