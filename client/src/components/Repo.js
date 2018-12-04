import React, { Component } from 'react';

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
            <td><button onClick={() => this.handleClick(this.props.repo)}>See Pulls</button></td>
        {/* <p>{this.props.url}</p> */}
      </tr>
    )
  }
}

export default Repo;
