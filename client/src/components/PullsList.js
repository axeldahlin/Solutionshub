import React, { Component } from 'react';
import api from '../api';
import Pull from './PullListItem'
import RepoComments from './RepoComments'

class PullsPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pulls: []
  
    }
  }

  componentDidMount() {

    this.updatePulls()
    

  }


  updatePulls() {

    const repoName = this.props.repoName
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


  render() {          
    return (
      <div className="PullsPage">

        <h1>Pulls Page</h1>

        <h2>{this.props.repoName}</h2>


        <RepoComments />

       
          {this.state.pulls.map((pull, index) => {
            return <Pull
              key={index} 
              title={pull.title}
              url={pull.url}
              repoName={pull.repoName}
              id={pull._id}
              click={(value)=> this.handleClick(value)}
              
              
              />

          })}




      </div>
    );
  }
}

export default PullsPage;
