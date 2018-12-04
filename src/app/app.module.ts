import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MaterialModule} from './material/material.module';
import { AppComponent } from './app.component';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {LoginComponent} from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    MaterialModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: LoginComponent }
    ]),
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
