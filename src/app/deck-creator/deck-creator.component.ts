import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Carte} from '../carte/carte';
import {CarteUser} from '../marche/marche.component';

@Component({
  selector: 'app-deck-creator',
  templateUrl: './deck-creator.component.html',
  styleUrls: ['./deck-creator.component.css']
})
export class DeckCreatorComponent implements OnInit {

  // public carte: Carte[] = [];
  public carte: CarteUser[] = [];
  public carteUser: CarteUser[] = [];
  public carteDeck: CarteUser[] = [];
  public delCarteUser: CarteUser[] = [];
  public carteNouveauDeck: CarteUser[] = [];
  public carteEvoyer: Carte[] = [];
  constructor(public router: Router, public http: HttpClient) { }



  ngOnInit() {


    const token = localStorage.getItem('Token');

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    };

    this.http.get<any>('api/Cartes/GetCartesUser', httpOptions ). subscribe( response2 => {
      for (const carte of response2) {
        this.carteUser.push(new CarteUser(carte.id, carte.valeurAttaque, carte.valeurDefense,
          carte.prixAchat, carte.prixVendre, carte.image, carte.imageDerier, 0, true));
      }
      this.http.get<any>('api/Cartes', httpOptions ). subscribe( response => {
        console.log(response);
        for (const carte of response) {
          let carteuserbool = false;
          for (const carteuser of this.carteUser) {
            if (carteuser.id === carte.id) {
              carteuserbool = true;
            }
          }
          this.carte.push(new CarteUser(carte.id, carte.valeurAttaque, carte.valeurDefense,
            carte.prixAchat, carte.prixVendre, carte.image,
            carte.imageDerier, 0, carteuserbool));
        }


      });

    });
  }

  addCardToDeck(carteCourrant: CarteUser) {
    if (this.carteDeck.length >= 5) {
      return;
    }
    this.delCarteUser = [];
    for (const CarteUserss of this.carteUser) {
      if (CarteUserss !==  carteCourrant) {
        this.delCarteUser.push(CarteUserss);
      }
    }
    this.carteUser = this.delCarteUser;
    this.carteDeck.push(carteCourrant);
  }
  removeCardFromDeck(carteCourrant: CarteUser) {
    this.carteNouveauDeck = [];
   for (const CarteUserss of this.carteDeck) {
      if (CarteUserss !==  carteCourrant) {
        this.carteNouveauDeck.push(CarteUserss);
      }
   }
   this.carteDeck = this.carteNouveauDeck;
   this.carteUser.push(carteCourrant);
  }
  createDeck() {
    const token = localStorage.getItem('Token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    };
    for (const carte of this.carteDeck) {
      this.carteEvoyer.push(new Carte(carte.id, carte.valeurAttaque, carte.valeurDefense,
        carte.prixAchat, carte.prixVendre, carte.image, carte.imageDerier, 0, ));
    }
    return this.http.post('api/CreateDeck', JSON.stringify(this.carteEvoyer), httpOptions).subscribe( response => this.ngOnInit());
  }



}
