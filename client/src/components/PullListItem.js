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






  test() {
    return 'ber'

  }





  render() {
    let buttonText = "Like"
    if (this.props.pull.likedByUser) buttonText = "Unlike"

    let countryCode = this.test()

    return (
      <tr className="Pull">
        <td><img src={require(`../${countryCode}.png`)} alt="flag"></img></td>
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