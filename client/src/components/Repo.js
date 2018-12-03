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
      <div className="Repo">
        <p>{this.props.repo.name}</p>
        {/* <p>{this.props.url}</p> */}
        <button onClick={() => this.handleClick(this.props.repo)}>See Pulls</button>
      </div>
    )

  }
}


export default Repo;
