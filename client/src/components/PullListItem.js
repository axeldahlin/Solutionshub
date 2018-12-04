import React, { Component } from 'react';
import api from '../api';



class Pull extends Component {
  constructor(props) {
    super(props)
    // this.state = {
    //   likedByUser: false,
    //   numberVotes: 0
    // }
  }


  handleClick = () => {
    this.props.click(this.props.pull)
  }



  


  render() {
    let buttonText = "Like"
    if (this.props.pull.likedByUser) buttonText = "Unlike"
    return (
      <tr className="Pull">
        <td>{this.props.pull.title}</td>
        <td><button onClick={()=> this.props.handleLike()}>{buttonText}</button></td>
        <td><button onClick={() => this.handleClick()}>Details</button></td>
        <td>{this.props.pull.nbOfVotes}</td>
      </tr>
    )

  }
}


export default Pull;