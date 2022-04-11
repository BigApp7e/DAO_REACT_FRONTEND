import React, { Component } from "react";
import fullDeckImg from './assets/fullDeckCards.png';
import axios from 'axios';

interface MyState{

   
}

interface MyProps {
    showPopup: boolean;
    message:string;
    handleClose:any;
}

export class Popup extends React.Component<MyProps, MyState> {


    
    constructor(props:any) {
        super(props);
 }

  render() {
    return (
        <div className='alert-container'>
        {this.props.showPopup &&     
        <div className='alert-holder'>      
          <div className='text-holder'>
          <p>{ (Number(this.props.message)>0)?"You win. Try again!":"You lose. Try again!"}</p>
          <button onClick={this.props.handleClose}>OK</button>
          </div>        
        </div>
      }
      </div>
    );
  }
}