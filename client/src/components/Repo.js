import React, { Component } from 'react';
import { Route, Switch, Link } from 'react-router-dom';

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
            <td className="repo-cell"><Link to={"/" + this.props.repo.name} > {this.props.repo.name} </Link> </td>
        {/* <p>{this.props.url}</p> */}
      </tr>
    )
  }
}

export default Repo;
