import React, { Component } from 'react';
import api from '../api';
import Pull from './PullListItem'
import CommentsContainer from './CommentsContainer'

class PullsPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pulls: []
  
    }
  }

  componentDidMount() {
    this.updatePulls()
    this.getComments()
  }
  updatePulls() {

    const repoName = this.props.repo.name
    api.getPulls(repoName)
    .then(pulls => {
      this.setState({pulls, repoName})
    })
    .then(res => {
      api.updatePulls(repoName)
        .then(res => {
              api.getPulls(repoName)
            .then(pulls => {
              this.setState({pulls})
            })
            .catch(err => console.log('DEBUG err:', err))
        })
        .catch(err => console.log(err))
    })

    api.getPulls(repoName)
          .then(pulls => {
            this.setState({pulls})
          })
          .catch(err => console.log('DEBUG err:', err))
  }
  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.repoName !== prevProps.repoName) {

      console.log('componentdidupdate')
      this.updatePulls()
    }
  }
  handleClick = (value) => {
    this.props.click(value)
  }


  getComments() {


      // console.log('getComments', this.props.repo._id)


    api.getRepoComments(this.props.repo._id)
      .then(comments => {
        console.log('DEBUG comments:', comments)
      })

  }



  render() {          
    return (
      <div className="PullsPage">
        <h1>Pulls List</h1>
        <h2>{this.props.repo.name}</h2>
        <CommentsContainer/>
          {this.state.pulls.map((pull, index) => {
            return <Pull
              key={index} 
              user={this.props.user}
              pull={pull}
              click={(value)=> this.handleClick(value)}
              />
          })}
      </div>
    );
  }
}

export default PullsPage;
