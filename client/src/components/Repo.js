import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class Repo extends Component {

  handleClick = (repo) => {
    this.props.click(repo)
  }

  render() {
    return (
      <tr className="Repo">
        <td className="repo-cell"><NavLink to={"/" + this.props.repo.name} > {this.props.repo.name} </NavLink> </td>
      </tr>
    )
  }
}

export default Repo;
