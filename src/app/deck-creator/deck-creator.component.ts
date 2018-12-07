import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-deck-creator',
  templateUrl: './deck-creator.component.html',
  styleUrls: ['./deck-creator.component.css']
})
export class DeckCreatorComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit() {
  }

}
