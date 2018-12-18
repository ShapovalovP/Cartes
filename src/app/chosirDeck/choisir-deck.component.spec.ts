import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoisirDeckComponent } from './choisir-deck.component';

describe('ChoisirDeckComponent', () => {
  let component: ChoisirDeckComponent;
  let fixture: ComponentFixture<ChoisirDeckComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChoisirDeckComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChoisirDeckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
