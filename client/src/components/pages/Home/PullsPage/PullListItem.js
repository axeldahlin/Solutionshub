import React, { Component } from 'react';

import { Route, Link, NavLink, Switch } from 'react-router-dom';
import { log } from 'util';


class Pull extends Component {
  constructor(props) {
    super(props)
    this.state = {
  
    }
  }


  handleClick = () => {
    this.props.click(this.props.id)


   




  }

  render() {
    return (
      <div className="Pull" >
        <p >{this.props.title}</p>
        <button onClick={()=> this.handleClick()}>Test</button>
        {/* <p>{props.repoName}</p> */}
  
     
      </div>
    )

  }
}


export default Pull;