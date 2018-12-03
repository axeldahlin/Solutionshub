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
    let data = {
      _user: this.props.user._github,
      _pull: this.props.pull.pullRequestID
    }
    if (!this.state.likedByUser) {
      console.log("castVote called",data)
      api.castVote(data)
    } else {
      console.log("removeVote called",data)
      api.removeVote(data)
    }  
    this.setState({
      likedByUser: !this.state.likedByUser
    })
  }

  updateVotes() {
    console.log("PullListItem component did Mount")
    let data = {
      _user: this.props.user._github,
      _pull: this.props.pull.pullRequestID
    }
    api.checkVote(data)
    .then(result => {

      this.setState({
        likedByUser: result.state
      })
    })
    .catch(err=> {
      console.log("error at PullListItem", err)
    })
  }


  componentDidMount() {
    this.updateVotes()
  }

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.pull !== prevProps.pull) {
      console.log('componentdidupdate')
      this.updateVotes()
    }
  }
    
  


  render() {
    let buttonText = "Like"
    if (this.state.likedByUser) buttonText = "Unlike"
    return (
      <div className="Pull" >
        <p >{this.props.pull.title} -- ID: {this.props.pull.pullRequestID}</p>
        

        <button onClick={()=> this.toggleVote()}>{buttonText}</button>
        <button onClick={() => this.handleClick()}>Details</button>
        {this.state.likedByUser && <p>Liked by user!</p>}
        {/* <p>{props.repoName}</p> */}
  
      </div>
    )

  }
}


export default Pull;