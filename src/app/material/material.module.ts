import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MatToolbarModule,
  MatIconModule, MatCardModule,
  MatInputModule, MatButtonModule,
  MatFormFieldModule,
  MatCheckboxModule ,
  MatGridListModule,
  MatTabsModule,
  MatListModule} from '@angular/material';
@NgModule({ imports: [BrowserAnimationsModule,////////////////////2) material , teper dobavliaem v app.module.ts
    MatFormFieldModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatGridListModule,
    MatTabsModule,
    MatListModule],
  exports: [ BrowserAnimationsModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatTabsModule,
    MatListModule
  ],

  declarations: []  })
export class MaterialModule { }
