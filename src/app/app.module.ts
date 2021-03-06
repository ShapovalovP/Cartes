import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MaterialModule} from './material/material.module';
import { AppComponent } from './app.component';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {LoginComponent} from './login/login.component';
import { RegistrerComponent } from './registrer/registrer.component';
import { PartieComponent } from './partie/partie.component';
import { CarteComponent } from './carte/carte.component';
import { DeckCreatorComponent } from './deck-creator/deck-creator.component';
import {MarcheComponent} from './marche/marche.component';
import { DeckComponent } from './deck/deck.component';
import { ChoisirDeckComponent } from './chosirDeck/choisir-deck.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrerComponent,
    PartieComponent,
    CarteComponent,
    DeckCreatorComponent,
    MarcheComponent,
    DeckComponent,
    ChoisirDeckComponent,
  ],
  imports: [
    MaterialModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: LoginComponent },
      { path: ':register', component: RegistrerComponent },
      { path: ':login/cartes', component: CarteComponent },
      { path: ':login/partie', component: PartieComponent },
      { path: ':login/marche', component: MarcheComponent },
      { path: ':login/deckcreator', component: DeckCreatorComponent },
      { path: ':login/cartesUtilisateur', component: ChoisirDeckComponent },
      { path: ':login/decks', component: DeckComponent }
    ]),
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent, DeckCreatorComponent ]
})
export class AppModule { }
