import React, { Component } from 'react';
import { Link } from 'react-router-dom';


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
            <td>{this.props.repo.name}</td>
            <td><Link to={`/${this.props.repo.name}`}>PULLS</Link></td>
        {/* <p>{this.props.url}</p> */}
      </tr>
    )
  }
}

export default Repo;
