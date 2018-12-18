import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {Carte} from '../carte/carte';
import {Deck} from './Deck';

@Component({
  selector: 'app-deck',
  templateUrl: './deck.component.html',
  styleUrls: ['./deck.component.css']
})
export class DeckComponent implements OnInit {
  public decks: Deck[] = [];
  constructor(public router: Router, public http: HttpClient) { }

  ngOnInit() {
    const token = localStorage.getItem('Token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    };

    this.http.get<any>('api/Decks', httpOptions). subscribe( response => {
      console.log(response);
      for (const dbDecks of response) {
        this.decks.push(new Deck(dbDecks.Id, dbDecks.name));
      }
    });
  }


}
