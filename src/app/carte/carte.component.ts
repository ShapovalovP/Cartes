import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {Carte} from './carte';
import {forEach} from '@angular/router/src/utils/collection';
import {Cartindex} from './cartindex';

@Component({
  selector: 'app-carte',
  templateUrl: './carte.component.html',
  styleUrls: ['./carte.component.css']
})
export class CarteComponent implements OnInit {
  public IA: boolean = false;
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
  computerStart() {
    if (this.IA === true) {
      this.getComputersCartAI();
    }
    else {
      this.getComputersCart();
    }
    this.votreTour = true;
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
    this.IA = false;
   this.ngOnInit();
  }
  setNewGameAI() {
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
    this.IA = true;
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
    return this.http.get<string> ('api/Cartes/AddUsersPoint/' + this.point,  httpOptions ). subscribe( r => { this.usersPoint = r;


    });
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
    return this.http.get<Carte[]> ('api/Cartes/Aletoir', httpOptions ). subscribe( r => {this.tabCartUser = r;
      this.votreTour = this.tabCartAletoir[0].valeurAttaque >  this.tabCartUser[0].valeurAttaque; /// tak mozhno sdelat slychainim pervii hod
      if ( !this.votreTour) {
        //// sdes computer dolgen zaiti pervim!!!!!
        this.computerStart();
      }
    });
  }
  selectFromDeck( cart: Carte ) {
    if (this.point === 0 && this.votreTour === true) {
      this.suprimCartTab(cart, this.tabCartUser);
       const kart: Carte = new Carte( this.tabCartUser.length + 5, cart.valeurAttaque, cart.valeurDefense,
         cart.prixAchat, cart.prixVendre, cart.image, cart.imageDerier, cart.rezBatail );
      this.tabCartUserParti.push(kart);
      if (this.tabCartComputerParti.length === 0) { /////////zdes computer podymaet nado li dobavliat carty i kakyu
        if (this.IA === true) {
          this.getComputersCartAI();
        }
        else {
          this.getComputersCart();
        }
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
  selectFromDeckOrdi( cart: Carte, i: number ) {
    const kart: Carte = new Carte( this.tabCartAletoir.length + 5, cart.valeurAttaque, cart.valeurDefense,
      cart.prixAchat, cart.prixVendre, cart.image, cart.imageDerier, cart.rezBatail );
    this.tabCartComputerParti.push(kart);
    this.tabCartAletoir.splice(i, 1);
  }
  //////////////////////////////// AI////////////////////////////////////////
  getComputersCartAI() {
    let choxFait: boolean = false;
    if ( this.tabCartAletoir.length > 0) {

      if (this.tabCartUserParti.length === 1) {     //////// eto esli y usera 1 karta
        choxFait = this.verifImage(this.tabCartUserParti[0]);
        if (choxFait === false) {
          choxFait = this.verifValeur(this.tabCartUserParti[0]);
        }

      }
      else if (this.tabCartUserParti.length === 0) { //////// eto esli y usera 0 karta
        this.selectFromDeckOrdi (this.tabCartAletoir[0], 0);

        choxFait = true;
      }
      else {
        choxFait = this.verifImagTabl ();
      }
    }
  }
  verifImagTabl (): boolean {
    let rez: boolean = false;
    for (const cartU of this.tabCartUserParti) {
      rez = this.verifImage(cartU);
      if (rez) {
        return rez;
      }
    }
    this.selectFromDeckOrdi (this.tabCartAletoir[0], 0);
    return true;
  }
  verifImage (cart: Carte): boolean {
    if ( cart.image === '/assets/feu.jpg' ) {
      for (let i = 0 ; i < this.tabCartAletoir.length; i++)  {
        if ( this.tabCartAletoir[i].image === '/assets/water.jpg' ) {
          this.selectFromDeckOrdi (this.tabCartAletoir[i], i);
          return true;
        }
      }
    }
    else if ( cart.image === '/assets/water.jpg' ) {
      for (let i = 0 ; i < this.tabCartAletoir.length; i++)  {
        if ( this.tabCartAletoir[i].image === '/assets/terre.jpg' ) {
          this.selectFromDeckOrdi (this.tabCartAletoir[i], i);
          return true;
        }
      }
    }
    else if ( cart.image === '/assets/terre.jpg' ) {
      for (let i = 0 ; i < this.tabCartAletoir.length; i++)  {
        if ( this.tabCartAletoir[i].image === '/assets/feu.jpg' ) {
          this.selectFromDeckOrdi (this.tabCartAletoir[i], i);
          return true;
        }
      }
    }
    return false;
  }
  verifValeur (cart: Carte): boolean {
    if (cart.rezBatail > 0) {
      cart.valeurDefense = cart.rezBatail;
    }

    let indPlusGrangAtak: number = 0 ;
    let indAtakMinNesesair: number = 0 ;
    const tabCartIndex: Cartindex [] = [];

    let atakMax = 0;
    let atakMinNes = 10000;

    for (let i = 0; i < this.tabCartAletoir.length; i++) {///// Zaschita bolshe ataki
      if ( atakMax < this.tabCartAletoir[i].valeurAttaque) {
        atakMax = this.tabCartAletoir[i].valeurAttaque;
        indPlusGrangAtak = i;
      }
      if (this.tabCartAletoir[i].valeurDefense > cart.valeurAttaque) {
        const newC: Cartindex = new Cartindex( i, this.tabCartAletoir[i] );
        tabCartIndex.push(newC);
      }
    }
    if ( tabCartIndex.length === 0) {

      for (let i = 0; i < this.tabCartAletoir.length; i++) {///// Ataka bolshe ili ravna zachite
        if (this.tabCartAletoir[i].valeurAttaque >= cart.valeurDefense) {
          const newC: Cartindex = new Cartindex(i, this.tabCartAletoir[i] );
          tabCartIndex.push(newC);
          if ( atakMinNes >  this.tabCartAletoir[i].valeurAttaque) {
            atakMinNes = this.tabCartAletoir[i].valeurAttaque;
            indAtakMinNesesair = i;
          }
        }
      }
    }
    else{///// est to chto  Zaschita bolshe ataki
      for (let i = 0; i < tabCartIndex.length; i++) {   ///// Zaschita bolshe ataki i Ataka bolshe ili ravna zachite
        if (tabCartIndex[i].carte.valeurAttaque >= cart.valeurDefense ) {
          this.selectFromDeckOrdi (this.tabCartAletoir[i], i);
          return true;
        }
      }
    }
    if ( tabCartIndex.length === 0) { ///// s samoi bolshoi Atakoi
      this.selectFromDeckOrdi (this.tabCartAletoir[indPlusGrangAtak], indPlusGrangAtak);

      return true;
    }
    else {  ///////////// Zaschita menche ataki no Ataka bolshe ili ravna zachite
      if ( indAtakMinNesesair <= this.tabCartAletoir.length - 1 ) {
        this.selectFromDeckOrdi (this.tabCartAletoir[indAtakMinNesesair], indAtakMinNesesair);

        return true;
      }
      else {
        this.selectFromDeckOrdi (this.tabCartAletoir[0], 0);

      }
    }

  }


  setBatail( cart: Carte ) { /////// sdes v konce komputer vibiraet s kem dratsia
    if (this.point === 0) {
      if (this.tabCartTour[0] == null && this.tabCartComputerParti.length !== 0) {
        this.tabCartTour.push(cart);
      }
      if (this.tabCartComputerParti.length === 0 && this.tabCartAletoir.length > 0) {
        if (this.IA === true) {
          this.getComputersCartAI();
        }
        else {
          this.getComputersCart();
        }
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

      /////// dobavliau / Ogon woda zemlia////////////////////////////////
      if (userCart.image === '/assets/feu.jpg' && compCart.image === '/assets/water.jpg' ||
        userCart.image === '/assets/terre.jpg' && compCart.image === '/assets/feu.jpg' ||
        userCart.image === '/assets/water.jpg' && compCart.image === '/assets/terre.jpg') {
        // User proigral CompVigral
        this.tabCartTour[0].rezBatail = 0;
        this.tabCartUserBatu.push(this.tabCartTour[0]);
        this.suprimCartTab(this.tabCartTour[0], this.tabCartUserParti);
        this.tabCartTour[1].valeurDefense = 1;
      }
      else if (userCart.image === '/assets/water.jpg' && compCart.image === '/assets/feu.jpg' ||
        userCart.image === '/assets/feu.jpg' && compCart.image === '/assets/terre.jpg' ||
        userCart.image === '/assets/terre.jpg' && compCart.image === '/assets/water.jpg'

      ) {
        // UserVigral  Compproigral
        this.tabCartTour[1].rezBatail = 0;
        this.tabCartComputerBatu.push(this.tabCartTour[1]);
        this.suprimCartTab(this.tabCartTour[1], this.tabCartComputerParti);
        this.tabCartTour[0].valeurDefense = 1;
      }
      else {

        ///////////////////////////////////////////////////////////////////////
        let dCart1: number;
        if (this.tabCartTour[0].rezBatail == null) {
          dCart1 = this.tabCartTour[0].valeurDefense - this.tabCartTour[1].valeurAttaque;
        } else {
          dCart1 = this.tabCartTour[0].rezBatail - this.tabCartTour[1].valeurAttaque;
        }

        let dCart2: number;
        if (this.tabCartTour[1].rezBatail == null) {
          dCart2 = this.tabCartTour[1].valeurDefense - this.tabCartTour[0].valeurAttaque;
        } else {
          dCart2 = this.tabCartTour[1].rezBatail - this.tabCartTour[0].valeurAttaque;
        }
        this.tabCartTour[0].rezBatail = dCart1;
        this.tabCartTour[1].rezBatail = dCart2;

        if (dCart1 <= 0) {
          this.tabCartTour[0].image = '/assets/perdu.jpg';
          this.tabCartUserBatu.push(this.tabCartTour[0]);
          this.suprimCartTab(this.tabCartTour[0], this.tabCartUserParti);
          this. computerStart();
        } else {
//// user proigral bitvy pervim zahodit Computer
        // zdes mozho  this.votreTour =  false;

        }

        if (dCart2 <= 0) {
          this.tabCartTour[1].image = '/assets/perdu.jpg';
          this.tabCartComputerBatu.push(this.tabCartTour[1]);
          this.suprimCartTab(this.tabCartTour[1], this.tabCartComputerParti);
        } else {
//// computer proigral bitvy pervim zahodit User
          // this.tabCartComputerParti.push(this.tabCartTour[1]);
          // zdes mozho  this.votreTour = true;
        }
        if ( dCart1 > 0 && dCart2 > 0 ) {
///// Obe karti zhivi posle bitvi
// zdes mozho  this.votreTour = !this.votreTour;
        }

      }
      this.tabCartTour.splice(0, 2);
      if (this.tabCartComputerParti.length === 0 && this.tabCartAletoir.length === 0) {
        this.point = 1000; ///// Game over!!!!
        this.getUsersPoint();
      }
      if (this.tabCartUserParti.length === 0 && this.tabCartUser.length === 0) {
        this.point = 1; ///// Game over!!!!
      }
      this.votreTour = true; ///// togda zdes ybrat
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
