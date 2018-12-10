import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Carte} from '../carte/carte';
import {forEach} from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-marche',
  templateUrl: './marche.component.html',
  styleUrls: ['./marche.component.css']
})
export class MarcheComponent implements OnInit {
  public carte: CarteUser[] = [];
  public carteUser: CarteUser[] = [];
  public listtoutecarte: CarteUser[] = [];

  constructor(public router: Router, public http: HttpClient) { }
  public listachete() {
    this.carte = this.listtoutecarte;
    let carte2: CarteUser[] = [];
    for (const c of this.carte){
      if (c.carteuser === false)
      {
        carte2.push(c);
      }
    }
    this.carte = carte2;

  }
  public listvendre() {
    this.carte = this.listtoutecarte;
    let carte2: CarteUser[] = [];
    for (const c of this.carte){
      if (c.carteuser === true)
      {
        carte2.push(c);
      }
    }
    this.carte = carte2;

  }

  public achete(cu:CarteUser){
    const c=new Carte(cu.id,cu.valeurAttaque,cu.valeurDefense,cu.prixAchat,cu.prixVendre,cu.image,cu.imageDerier,cu.rezBatail);
    const body = c;
    const token = localStorage.getItem('Token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    };
    this.http.post('api/Cartes/PostCartesUser',JSON.stringify(body), httpOptions).subscribe( response=> this.ngOnInit())

  }
  public vendre(cu:CarteUser){
    const c=new Carte(cu.id,cu.valeurAttaque,cu.valeurDefense,cu.prixAchat,cu.prixVendre,cu.image,cu.imageDerier,cu.rezBatail);
    const body = c;
    const token = localStorage.getItem('Token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    };
    this.http.post('api/Cartes/RemoveCartesUser',JSON.stringify(body), httpOptions).subscribe( response=> this.ngOnInit())

  }

  ngOnInit() {
    this.carteUser.length=0;
    this.carte.length=0;
    const token = localStorage.getItem('Token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    };
    this.http.get<any>('api/Cartes/GetCartesUser', httpOptions ). subscribe( response2 => {
      for (const carte of response2) {
        this.carteUser.push(new CarteUser(carte.id, carte.valeurAttaque, carte.valeurDefense, carte.prixAchat, carte.prixVendre, carte.image, carte.imageDerier, 0, true));
      }


      this.http.get<any>('api/Cartes', httpOptions ). subscribe( response => {
        console.log(response);
        for (const carte of response) {
          let carteuserbool=false;
          for(const carteuser of this.carteUser){
            if(carteuser.id===carte.id){
              carteuserbool=true;
            }
          }

          this.carte.push(new CarteUser(carte.id, carte.valeurAttaque, carte.valeurDefense, carte.prixAchat, carte.prixVendre, carte.image, carte.imageDerier, 0, carteuserbool));
        }
        this.listtoutecarte = this.carte;

      });

    })


  }

}
export class CarteUser {
    constructor(public id: number,
      public valeurAttaque: number,
      public valeurDefense: number,
      public prixAchat: number,
      public prixVendre: number,
      public image: string,
      public  imageDerier: string,
      public  rezBatail: number,
      public carteuser: boolean) {

  }
}
