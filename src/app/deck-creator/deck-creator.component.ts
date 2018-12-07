import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {Carte} from '../carte/carte';

@Component({
  selector: 'app-deck-creator',
  templateUrl: './deck-creator.component.html',
  styleUrls: ['./deck-creator.component.css']
})
export class DeckCreatorComponent implements OnInit {

  public carte: Carte[] = [];
  constructor(public router: Router, public http: HttpClient) { }


  ngOnInit() {

    this.http.get<any>('api/Cartes'). subscribe( response => {
      console.log(response);
      for (const carte of response) {
        this.carte.push(new Carte(carte.Id, carte.ValeurAttaque,
          carte.ValeurDefense, carte.prixAchat, carte.prixVendre,
          carte.image, carte.imageDerier, 0));
      }
    });
  }

}
