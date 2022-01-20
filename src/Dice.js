import React, { Component } from 'react';
import Die from './Die';
import './Dice.css';

class Dice extends Component {
  render() {
    return <div className="Dice">
      {this.props.dice.map((d, idx) =>
        <Die handleClick={this.props.handleClick}   //* This handle Clicked function will toggle the classes. 
          val={d}
          locked={this.props.locked[idx]}   // So this.props.locked is  a array and we are accessing the value of each die value ?? is it Locked or not ??
          idx={idx}
          key={idx} 
          rolling={this.props.rolling && !this.props.locked[idx]}
          // updateRoll={this.props.updateRoll}

          />
      )}
    </div>
  }
}

export default Dice;