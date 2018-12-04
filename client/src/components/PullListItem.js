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
        <td><img src={require("../ber.png")} width="60" height="50" alt="flag"></img></td>
        <td>{this.props.pull.title}</td>
        <td>{new Date(this.props.pull.updated_at).toUTCString()}</td>
        <td><button onClick={()=> this.props.handleLike()}>{buttonText}</button></td>
        <td><button onClick={() => this.handleClick()}>Details</button></td>
        <td>{this.props.pull.nbOfVotes}</td>
      </tr>
    )

  }
}


export default Pull;