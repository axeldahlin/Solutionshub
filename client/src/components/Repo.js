import React, { Component } from 'react';
import { Route, Switch, NavLink, Link } from 'react-router-dom';

class Repo extends Component {
  constructor(props) {
    super(props)
    this.state = {
 
    }
  }

  handleClick = (repo) => {
    this.props.click(repo)
  }

  render() {
    return (
      <tr className="Repo">
            {/* <td><button onClick={() => this.handleClick(this.props.repo)}>See Pulls</button></td> */}
            <td className="repo-cell"><NavLink to={"/" + this.props.repo.name} > {this.props.repo.name} </NavLink> </td>
        {/* <p>{this.props.url}</p> */}
      </tr>
    )
  }
}

export default Repo;
