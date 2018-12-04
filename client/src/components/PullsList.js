import React, { Component } from 'react';
import api from '../api';
import Pull from './PullListItem'
import CommentsContainer from './CommentsContainer'
import { Table } from 'reactstrap';


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
  }

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.repo !== prevProps.repo) {
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
        this.setState({comments})
      })
  }

  render() {          
    return (
      <div className="PullsPage">
        <h1>{this.props.repo.name}</h1>
        <CommentsContainer getComments={()=>this.getComments()} comments={this.state.comments} repo={this.props.repo} user={this.props.user}/>
        <Table>
          <tbody>  
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
            </tbody>
        </Table>
      </div>
    );
  }
}

export default PullsPage;
