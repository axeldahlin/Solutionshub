import React, { Component } from 'react';
import { Route, Link, NavLink, Switch } from 'react-router-dom';


class Repo extends Component {
  constructor(props) {
    super(props)
    this.state = {
 
    }
  }


  handleClick = (name) => {

    this.props.click(name)

    // console.log(name)

  }

  render() {
    return (
      <div className="Repo">
        <p>{this.props.name}</p>
        {/* <p>{this.props.url}</p> */}
        <button onClick={() => this.handleClick(this.props.name)}>See Pulls</button>
      </div>
    )

  }
}


export default Repo;
