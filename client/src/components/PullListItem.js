import React, { Component } from 'react';
import api from '../api';



class Pull extends Component {
  constructor(props) {
    super(props)
    this.state = {
      likedByUser: false,
      numberVotes: 0
    }
  }


  handleClick = () => {
    this.props.click(this.props.pull)
  }



  toggleVote() {
    this.setState({
      likedByUser: !this.state.likedByUser
    })
    api.castVote({
      _user: this.props.user._id,
      _pull: this.props.pull._id
    })
  }


  render() {
    let buttonText = "Like"
    if (this.state.likedByUser) buttonText = "Unlike"
    return (
      <div className="Pull" >
        <p >{this.props.pull.title}</p>
        <button onClick={()=> this.toggleVote()}>{buttonText}</button>
        <button onClick={() => this.handleClick()}>Details</button>
        {this.state.likedByUser && <p>Liked by user!</p>}
        {/* <p>{props.repoName}</p> */}
  
      </div>
    )

  }
}


export default Pull;