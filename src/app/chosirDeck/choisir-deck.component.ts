import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Deck} from '../deck/Deck';
import {Carte} from '../carte/carte';

@Component({
  selector: 'app-choisir-deck',
  templateUrl: './choisir-deck.component.html',
  styleUrls: ['./choisir-deck.component.css']
})
export class ChoisirDeckComponent implements OnInit {

  ////////////////////// dlia igri
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



  ////////////////
  public deckPret: boolean = false;

  constructor(public router: Router, public http: HttpClient) { }
  public deck: Deck[] = [];
  public listcarte: CarteDeck[] = [];

  public choisir(d: Deck) {
    this.deckPret = true;
     for ( const r of this.listcarte ) {
       if ( r.deckId === d.id) {
         const c: Carte = new Carte(r.id, r.valeurAttaque, r.valeurDefense, 0, 0, r.image, r.imageDerier, 0 );
         this.tabCartUser.push(c);
       }
     }

  //  alert(d.name + ' choisi pour un futur combat contre un utilisateur');
  }
  ngOnInit() {
    if ( this.deckPret === false) {
      this.listDeckInical ();
    }
  }
  listDeckInical () {
    const token = localStorage.getItem('Token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    };

    this.http.get<any>('api/Cartes/GetDeckByUser', httpOptions).subscribe(response => {
      for (const d of response) {
        this.deck.push(new Deck(d.id , d.name));
        console.log(this.deck);
      }
    });

    this.http.get<any>('api/Cartes/GetAllCarteWithDeckId', httpOptions).subscribe(response2 => {
      for (const carte of response2) {
        this.listcarte.push(new CarteDeck(carte.id, carte.deckId, carte.valeurAttaque, carte.valeurDefense, carte.image, carte.imageDerier));
        console.log(this.listcarte);
      }
    });
  }

}
export class CarteDeck {
  constructor(public id: number,
              public deckId: number,
              public valeurAttaque: number,
              public valeurDefense: number,
              public image: string,
              public  imageDerier: string) {

  }
}
