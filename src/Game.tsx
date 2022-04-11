import React, { Component } from "react";
import fullDeckImg from './assets/fullDeckCards.png';
import {Popup} from './Popup';
import {RoundRequest} from './RoundRequest';
import {Card} from './Card';

interface MyState{
    data:any;
    isDataLoaded:boolean;
    showSecondCard:boolean;
    roundData:any;
    showPopup:boolean;
    txtData:string;
    bet:string;
    
}

interface MyProps {
    message: string;
}

export class Game extends React.Component<MyProps, MyState> {


    
    constructor(props:any) {
        super(props);

        this.state = {
             data:null,
            isDataLoaded:true,
            showSecondCard:false,
            roundData:null,
            showPopup:false,
            txtData:"",
            bet:"HIGHER"
        };

        this.onRadioBtnChangeValue = this.onRadioBtnChangeValue.bind(this);
        this.playBtnClick = this.playBtnClick.bind(this);
        this.getData = this.getData.bind(this);
        this.getRoundResult = this.getRoundResult.bind(this);
        this.closePopup = this.closePopup.bind(this);
 }
 getData(){
    
    const apiUrl = 'http://localhost:9001/game/data';
    const headers = { 'Content-Type': 'application/json'}

    fetch(apiUrl, { headers })
        .then(response => response.json())
        .then((data) => 
        {
            this.setState({ data: data});
            this.setState({ isDataLoaded: false});

            let txt = '';

            for(let i=0; i<data.lastResults.length; i++){
                let tmpRow =    JSON.stringify(data.lastResults[i]);      
                txt +=   tmpRow + "\n";   
          
              
            }
            this.setState({ txtData:txt});

        });
        this.setState({ isDataLoaded: true});
        this.setState({ showSecondCard: false});
 }
 componentDidMount() {
   this.getData();    
  }
  onRadioBtnChangeValue(event:any) {
        this.setState({ bet: event.target.value});
  }
  playBtnClick(event:any){
    this.setState({ showSecondCard: true});
    this.getRoundResult();
  }

  async  getRoundResult(){

    const apiUrl = "http://localhost:9001/game/rounddata";

    const request:RoundRequest = new RoundRequest(this.state.bet,new Card(this.state.data.firstCard.name,
        this.state.data.firstCard.value,this.state.data.firstCard.suit),new Card(this.state.data.secondCard.name,
            this.state.data.secondCard.value,this.state.data.secondCard.suit));

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(request.getJson())
    };
    const response = await fetch(apiUrl, requestOptions);
    const data = await response.json();
    this.setState({ roundData: data });
    this.setState({ showPopup: true });
  }

  closePopup(){
    this.setState({ roundData: null });
    this.setState({ showPopup: false });
    this.setState({ isDataLoaded: false});
    this.setState({ showSecondCard: false});
    this.setState({ txtData:""});
    this.getData();
  }
  render() {

    const m = this.props.message;
    return (
      <div>
          <Popup showPopup={this.state.showPopup} message={ (this.state.showPopup)?this.state.roundData.isWin:"" } handleClose={this.closePopup}></Popup>
        <div className="top-images-holder">
                    <div className="first-card">
                    <p>{(this.state.isDataLoaded)?"": this.state.data.firstCard.name}</p>
                    <p>{(this.state.isDataLoaded)?"": this.state.data.firstCard.suit}</p>
                    </div>
                    <div >
                    <p>{(this.state.showSecondCard)?this.state.data.secondCard.name:""}</p>
                    <p>{(this.state.showSecondCard)?this.state.data.secondCard.suit:""}</p>
                    </div>
                    <div >
                        <img className="fullDeckImg" src={fullDeckImg} alt="full Deck Cards"></img>
                    </div>
            </div><br></br>
            <div className="radio-buttons-holder" onChange={this.onRadioBtnChangeValue}>
                <input type="radio" value="HIGHER" name="r" defaultChecked /> Higher Value
                <input type="radio" value="LOWER" name="r"  /> Lower Value
                <input type="radio" value="SAME" name="r" /> Same
                <input type="radio" value="SUIT" name="r" /> Suit
            </div><br></br>
            <div className="btn-and-txt-area-holder">
                <div>
                <button className="playBtn" onClick={this.playBtnClick} disabled={this.state.isDataLoaded} >Play</button>
                </div>
                <div>
                <textarea  className="textArea" value={this.state.txtData} readOnly></textarea>
                </div>
            </div>
      </div>
    );
  }
}