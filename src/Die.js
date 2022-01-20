import React, { Component } from "react";
import "./Die.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faDiceOne,faDiceTwo,faDiceThree,faDiceFour,faDiceFive,faDiceSix } from '@fortawesome/free-solid-svg-icons'

class Die extends Component {
  static defaultProps ={
    val:5
  }
  constructor(props){
    super(props);
    this.handleToggle= this.handleToggle.bind(this);
  }
  handleToggle(){ 
    this.props.handleClick(this.props.idx);
  }
  render() {
    const {locked,val,rolling} = this.props;
    let  Classes = `Die `;
    if(locked) Classes+="Die-locked ";
    console.log(this.props);
    if(rolling) Classes+=" Die-rolling";
    // this.props.updateRoll;
    const Num = [<FontAwesomeIcon icon={faDiceOne}  className={Classes} 
        onClick={this.handleToggle}/>,
    <FontAwesomeIcon icon={faDiceTwo}  className={Classes}
        onClick={this.handleToggle}/>,
    <FontAwesomeIcon icon={faDiceThree}  className={Classes}
        onClick={this.handleToggle}/>,
    <FontAwesomeIcon icon={faDiceFour}  className={Classes}
        onClick={this.handleToggle}/>,
    <FontAwesomeIcon icon={faDiceFive}  className={Classes}
        onClick={this.handleToggle}/>,
    <FontAwesomeIcon icon={faDiceSix}  className={Classes}
        onClick={this.handleToggle}/>
    ]
    return (
      <div>
        {Num[val-1]}
      </div>
    );
  }
}

export default Die;
