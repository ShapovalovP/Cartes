import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {Carte} from './carte';
import {forEach} from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-carte',
  templateUrl: './carte.component.html',
  styleUrls: ['./carte.component.css']
})
export class CarteComponent implements OnInit {
  public  votreTour: boolean = true;
  public  tabCartAletoir: Carte [] = [];
  public  tabCartUser: Carte [] = [];

  public  tabCartTour: Carte [] = [];

  public  tabCartUserParti: Carte[] = [];
  public  tabCartComputerParti: Carte[] = [];

  public  tabCartUserBatu: Carte[] = [];
  public  tabCartComputerBatu: Carte[] = [];

  public  point: number = 0;
  public  usersPoint: string ;
  constructor(public router: Router, public http: HttpClient) { }

  ngOnInit() {
   this.getAletoir();
   this.getCartsUser();
   this.getUsersPoint();
  }
  setNewGame() {
    this.votreTour = true;
   this.tabCartAletoir  = [];
    this.tabCartUser = [];
    this.tabCartTour = [];
    this.tabCartUserParti = [];
    this.tabCartComputerParti = [];
    this.tabCartUserBatu = [];
    this.tabCartComputerBatu = [];
    this.point = 0;
    this.usersPoint = null ;
   this.ngOnInit();
  }
  getUsersPoint() {
    const token = localStorage.getItem('Token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    };
    return this.http.get<string> ('api/Cartes/AddUsersPoint/' + this.point,  httpOptions ). subscribe( r => this.usersPoint = r);
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
  selectFromDeck( cart: Carte ) {
    if (this.point === 0 && this.votreTour === true) {
      this.suprimCartTab(cart, this.tabCartUser);
       const kart: Carte = new Carte( this.tabCartUser.length + 5, cart.valeurAttaque, cart.valeurDefense,
         cart.prixAchat, cart.prixVendre, cart.image, cart.imageDerier, cart.rezBatail );
      this.tabCartUserParti.push(kart);
      if (this.tabCartComputerParti.length === 0) {
        this.getComputersCart();
      }
      this.votreTour = false;
    }
  }
  getComputersCart() {
    const token = localStorage.getItem('Token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    };
    return this.http.get<Carte>('api/Cartes/AletoirCarte', httpOptions).subscribe(r => {
      this.tabCartComputerParti.push(r);
      this.tabCartAletoir.splice(0, 1);
    });
  }
  setBatail( cart: Carte ) {
    if (this.point === 0) {
      if (this.tabCartTour[0] == null && this.tabCartComputerParti.length !== 0) {
        this.tabCartTour.push(cart);
      }
      if (this.tabCartComputerParti.length === 0 && this.tabCartAletoir.length > 0) {
        this.getComputersCart();
      }
      if (this.tabCartComputerParti.length === 0 && this.tabCartAletoir.length === 0) {
        this.point = 1000; ///// Game over!!!!
        this.getUsersPoint();
      }
    }
  }
  getBatail( cart: Carte ) {
   if ( this.tabCartTour[0] !== null) {
   this.tabCartTour.push(cart);
   } else {return; }


    if ( this.tabCartTour[0] !== null && this.tabCartTour[1] !== null ) {
     const userCart: Carte = this.tabCartTour[0];
      const compCart: Carte = this.tabCartTour[1];

      let dCart1: number ;
      if ( this.tabCartTour[0].rezBatail == null) {
        dCart1 = this.tabCartTour[0].valeurDefense - this.tabCartTour[1].valeurAttaque; } else {
        dCart1 = this.tabCartTour[0].rezBatail - this.tabCartTour[1].valeurAttaque;
      }

      let dCart2: number ;
      if ( this.tabCartTour[1].rezBatail == null) {
        dCart2 = this.tabCartTour[1].valeurDefense - this.tabCartTour[0].valeurAttaque; } else {
        dCart2 = this.tabCartTour[1].rezBatail - this.tabCartTour[0].valeurAttaque;
      }
      this.tabCartTour[0].rezBatail = dCart1;
      this.tabCartTour[1].rezBatail = dCart2;

      if ( dCart1 <= 0) {
        this.tabCartTour[0].image = '/assets/perdu.jpg';
        this.tabCartUserBatu. push(this.tabCartTour[0]);
       this.suprimCartTab(this.tabCartTour[0], this.tabCartUserParti);
      } else {

      }


      if ( dCart2 <= 0) {
        this.tabCartTour[1].image = '/assets/perdu.jpg';
        this.tabCartComputerBatu.push(this.tabCartTour[1]);
        this.suprimCartTab(this.tabCartTour[1], this.tabCartComputerParti);
      } else {

       // this.tabCartComputerParti.push(this.tabCartTour[1]);
      }

      this.tabCartTour.splice(0, 2);
      if (this.tabCartComputerParti.length === 0 && this.tabCartAletoir.length === 0) {
        this.point = 1000; ///// Game over!!!!
        this.getUsersPoint();
      }
      if (this.tabCartUserParti.length === 0 && this.tabCartUser.length === 0) {
        this.point = 1; ///// Game over!!!!
      }
      this.votreTour = true;
   }
  }
  suprimCartTab (cart: Carte, tab: Carte[]) {
    for (let i = 0; i < tab.length; i++) {
      if (tab[i].id === cart.id) {
        tab.splice(i, 1);
        return;
      }
    }
  }


}
