export class Carte {
  constructor( public id: number ,
               public valeurAttaque: number ,
               public valeurDefense: number,
               public prixAchat: number,
               public prixVendre: number,
               public image: string,
               public  imageDerier: string,
               public  rezBatail: number) {

  }
}
