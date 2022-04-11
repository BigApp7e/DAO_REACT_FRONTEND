import {Card} from './Card';

export class RoundRequest{

    private bet:string;
    private firstCard:Card;
    private secondCard:Card;

    constructor(bet:string, firstCard:Card, secondCard:Card) {

        this.bet = bet;
        this.firstCard = firstCard;
        this.secondCard = secondCard;

      }
      getJson(){
          return {
              "bet":this.bet,
              "cards":[
                {
                    "value":this.firstCard.getValue(),
                    "name":this.firstCard.getName(),
                    "suit":this.firstCard.getSuit()
                },
                {
                    "value":this.secondCard.getValue(),
                    "name":this.secondCard.getName(),
                    "suit":this.secondCard.getSuit()
                }
            ]
          }
      }
}