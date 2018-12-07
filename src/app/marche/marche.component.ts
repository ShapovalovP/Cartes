import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Carte} from '../carte/carte';

@Component({
  selector: 'app-marche',
  templateUrl: './marche.component.html',
  styleUrls: ['./marche.component.css']
})
export class MarcheComponent implements OnInit {
  public carte: Carte[] = [];

  constructor(public router: Router, public http: HttpClient) { }

  ngOnInit() {
    const token = localStorage.getItem('Token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    };
    this.http.get<any>('api/Cartes', httpOptions ). subscribe( response => {
      console.log(response);
      for (const carte of response) {
          this.carte.push(new Carte(carte.Id, carte.ValeurAttaque, carte.ValeurDefense, carte.prixAchat, carte.prixVendre, carte.image, carte.imageDerier, 0));
        }
    });
  }

}
