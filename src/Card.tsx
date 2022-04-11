export class Card{

    private name:string;
    private value:number;
    private suit:string;

    constructor(name:string, value:number,suit:string){
        this.name = name;
        this.value = value;
        this.suit = suit;
    }

    public getName():string{
        return this.name;
    }
    public getValue():number{
        return this.value;
    }
    public getSuit():string{
        return this.suit;
    }
}