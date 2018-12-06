import React, { Component } from 'react';
import api from '../api';



class PullDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pull: null,
      repo: null
    }
  }

  componentDidMount() {
    api.getPull(this.props.match.params.pull)
      .then(pull => {
        console.log("pull",pull)
        this.setState({
          pull
        })
      })
      .catch(err => {
        console.log("Error at apiGetPull",err)
      })

      this.getRepo()


  }

  getRepo() {
    api.fetchRepoInfo(this.props.match.params.repo)
      .then(repo => {
        this.setState({repo: repo[0]})
      })
  }



  render() {
    if(this.state.pull && this.state.repo) {
      return (
        <div id="test" className="PullDetail" >
          <img className="octo-detail" src="../Octocat-low.png" alt="cat"/>
          <div className="detail-container">
            <div className="detail-header">
            <img className="detail-img" src="../idea.png" alt="hey"/>
            <div className="title-container">
              <p className="detail-title">{this.state.pull.title}</p>
              <p>{this.state.pull.repoName}</p>
            </div>
            </div>

            <div className="detail-body">
              <div className="terminal">
                <div className="bar-terminal"></div>
                <div className="text-terminal">
                    <p>git clone {this.state.repo.url}</p>
                    <p>cd {this.state.pull.repoName}</p>
                    <p>git fetch origin '+refs/pull/*/head:refs/remotes/origin/pr/*'</p>
                    <p>git checkout pr/{this.state.pull.number}</p>

                
                </div>
              </div>
              <div className="detail-details">
                <p>Likes: {this.state.pull.nbOfVotes}</p>
                <a className="detail-link" target="_blank" href={this.state.pull.url}>See on Github <i className="far fa-angle-right"></i></a>

              </div>

            </div>

            <h2>Play with the code!</h2>
            <p>Write the commands above in your terminal to clone this solution to your own computer.</p>
          

                    {/* <pre>{JSON.stringify(this.state.pull)}</pre> */}

          </div>
        </div>
      )
    } else {
      return <h1>Loading...</h1>
    }

    

  }
}


export default PullDetail;