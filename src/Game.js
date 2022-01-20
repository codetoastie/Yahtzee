import React, { Component } from "react";
import Dice from "./Dice";
import ScoreTable from "./ScoreTable";
import "./Game.css";

//! Structure 
//* Game Component -> Stateful Component 
//*   |--> Dice Component (Dumb) : Render=>  Die Component
//*   |--> Score Table Component (Dumb) : Render => Rule Row + Some logic
//*
//*

const NUM_DICE = 5;  //* They are Fixed.
const NUM_ROLLS = 3;

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dice: Array.from({ length: NUM_DICE }), //* It will make a Array of size 5. so that we can loop over it & Generate the 5 Dice
      locked: Array(NUM_DICE).fill(false),  //* BY Default they all are unlocked so we set it to 0.
      //! dice = [false,false,false,false,false]
      rollsLeft: NUM_ROLLS,  //* In this we are updating the No. of rolls left\
      rolling:false,
      scores: {
        ones: undefined,
        twos: undefined,
        threes: undefined,
        fours: undefined,
        fives: undefined,
        sixes: undefined,
        threeOfKind: undefined,
        fourOfKind: undefined,
        fullHouse: undefined,
        smallStraight: undefined,
        largeStraight: undefined,
        yahtzee: undefined,
        chance: undefined
      }
    };
    //So we have Made 2 Function.
    this.roll = this.roll.bind(this);
    //* The functions below are passed as a Props at 2 level 
    this.doScore = this.doScore.bind(this);  //! Ussed to update the score
    this.toggleLocked = this.toggleLocked.bind(this);  //! For setting a particular die to Locked.
    this.animateRoll = this.animateRoll.bind(this);  
    // this.updateRoll = this.updateRoll.bind(this);  
  }

  componentDidMount(){
    this.animateRoll();
  }

  animateRoll(){
    this.setState({rolling:true},()=>{
      setTimeout(this.roll,1000);
    });
  }

  // updateRoll(){
  //   this.setState({rolling:false});
  // }

  roll(evt) {
    // roll dice whose indexes are in reroll
    this.setState(st => ({
      dice: st.dice.map((d, i) =>
        st.locked[i] ? d : Math.ceil(Math.random() * 6)
      ),           //* this was checked that if the st.locked means the dice is locked so doesn't update the value of the that particular Dice.
      locked: st.rollsLeft > 1 ? st.locked : Array(NUM_DICE).fill(true),
      //! If our Rolls get less than 1 then all Dices were Disabled.
      rollsLeft: st.rollsLeft - 1,
      rolling:false
    }));
  }

  toggleLocked(idx) {
    // toggle whether idx is in locked or not
    if(this.state.rollsLeft>0 && !this.state.rolling){
        this.setState(st => ({
        locked: [
          ...st.locked.slice(0, idx),
          !st.locked[idx],
          ...st.locked.slice(idx + 1)
        ]
      }));
  }
  }

  doScore(rulename, ruleFn) {
    // evaluate this ruleFn with the dice and passs this rulename
    this.setState(st => ({
      scores: { ...st.scores, [rulename]: ruleFn(this.state.dice) },
      rollsLeft: NUM_ROLLS,
      locked: Array(NUM_DICE).fill(false)
    }));
    this.animateRoll();
    //AS soon as we Updated the Score we want it to make all the disabled button enabled and the dice to Re-roll and roll-left should also be changed.
  }

  render() {
    return (
      <div className='Game'>
        <header className='Game-header'>
          <h1 className='App-title'>Yahtzee!</h1>

          <section className='Game-dice-section'>
            <Dice
              dice={this.state.dice}  //Gives us the Full Array 
              locked={this.state.locked}
              handleClick={this.toggleLocked}
              rolling={this.state.rolling}
              // updateRoll={this.updateRoll}
            />
            <div className='Game-button-wrapper'>
              <button
                className='Game-reroll'
                // disabled={this.state.locked.every(x => x)}
                disabled = {this.state.rollsLeft > 0 ? false : true || this.state.rolling}
                onClick={this.animateRoll}
              >
                {this.state.rollsLeft} Rerolls Left
              </button>
            </div>
          </section>
        </header>
        <ScoreTable doScore={this.doScore} scores={this.state.scores} />
      </div>
    );
  }
}

export default Game;
