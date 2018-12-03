import React, { Component } from 'react';
import api from '../api';
import Pull from './PullListItem'
import CommentsContainer from './CommentsContainer'

class PullsPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pulls: [],
      comments: null
  
    }
  }

  componentDidMount() {
    this.updatePulls()
    this.getComments()
  }

  updatePulls() {
    const repoName = this.props.repo.name
      this.setState({
        pulls: null
      })

    api.getPulls(repoName)
      .then(pulls => {
        console.log("getPulls!!!!!!!!")
        this.setState({ pulls, repoName })

        return api.updatePulls(repoName)
      })
      .then(res => {
        return api.getPulls(repoName)
      })
      .then(pulls => {
        this.setState({ pulls })
      })
      .catch(err => console.log(err))


    // api.getPulls(repoName)
    //       .then(pulls => {
    //         this.setState({pulls})
    //       })
    //       .catch(err => console.log('DEBUG err:', err))
  }

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.repo !== prevProps.repo) {

      console.log('componentdidupdate')
      this.updatePulls()
      this.getComments()
    }
  }

  handleClick = (value) => {
    this.props.click(value)
  }


  getComments() {
    api.getRepoComments(this.props.repo._id)
      .then(comments => {
        console.log('DEBUG comments:', comments)
        this.setState({comments})
      })
  }


  // componentDidMount() {
  //   console.log("PullListItem component did Mount")

  //   api.checkVote(data)
  //   .then(result => {
  //     this.setState({
  //       likedByUser: result.state
  //     })
  //   })
  //   .catch(err=> {
  //     console.log("error at PullListItem", err)
  //   })
  // }





  render() {          
    return (
      <div className="PullsPage">
        <h1>Pulls List</h1>
        <h2>{this.props.repo.name}</h2>
        <CommentsContainer comments={this.state.comments}/>

        {!this.state.pulls && <div>Loading...</div>}
          {this.state.pulls && this.state.pulls.map((pull, index) => {
            return <Pull
              key={index} 
              user={this.props.user}
              // likedByUser={likedByUser}
              pull={pull}
              click={(value)=> this.handleClick(value)}
              />
          })}
      </div>
    );
  }
}

export default PullsPage;
