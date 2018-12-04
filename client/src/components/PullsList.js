import React, { Component } from 'react';
import api from '../api';
import Pull from './PullListItem'
import CommentsContainer from './CommentsContainer'
import { Table, InputGroup, InputGroupAddon, InputGroupText, Input } from 'reactstrap';


class PullsPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pulls: [],
      comments: null,
      searchValue: ""
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
        this.setState({ pulls, repoName })
        this.checkVotes()
        return api.updatePulls(repoName)
      })
      .then(res => {
        return api.getPulls(repoName)
      })
      .then(pulls => {
        this.setState({ pulls })
        return 
      })
      .then(_ => {
        console.log("check votes called in updatePulls()")
        this.checkVotes()
      })
      .catch(err => console.log(err))
  }

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.repo !== prevProps.repo || this.props.pulls !== prevProps.pulls) {
      console.log('componentdidupdate')
      this.updatePulls()
      this.getComments()
    }
  }

  handleClick = (value) => {
    this.props.click(value)
  }

  handleChange = (event) => {
    console.log("handleChange called", event)
    const { name, value } = event.target;
    this.setState({[name]: value});
  }


  getComments() {
    api.getRepoComments(this.props.repo._id)
      .then(comments => {
        this.setState({comments})
      })
  }

  checkVotes() {
    console.log("check votes method called in PullsList")
    let data = {
      // pulls: this.state.pulls,
      _user: this.props.user._github,
      _repo: this.props.repo.githubID
    }
    api.checkVotes(data)
    .then(votes => {
      let pulls = [...this.state.pulls]
      let pullIds = votes.map(vote => vote._pull)
      let newPullsState = pulls.map(pull => {
        if (pullIds.includes(pull.pullRequestID)) pull.likedByUser = true
        return pull
      })
      this.setState({
        pulls: newPullsState
      })
    })
    .catch(err=> {
      console.log("Error at checkVotes PullList",err)
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

  toggleLike(clickedPull) {
    let allPulls = [...this.state.pulls]
    let data = {
      _user: this.props.user._github,
      _pull: clickedPull,
      _repo: this.props.repo.githubID
    }
    let [match] = allPulls.filter(pulls => {
      return pulls.pullRequestID === clickedPull
    })
    if (!match.likedByUser) {
      match.likedByUser = true
      api.castVote(data)
      .then(this.setState({
        pulls: allPulls
      }))
    } else {
      match.likedByUser = false
      api.removeVote(data)
      .then(this.setState({
        pulls: allPulls
      }))
    } 
  }

  // toggleVote() {
  //   let data = {
  //     _user: this.props.user._github,
  //     _pull: this.props.pull.pullRequestID,
  //     _repo: this.props.pull._githubRepo
  //   }
  //   if (!this.state.likedByUser) {
  //     console.log("castVote called",data)
  //     api.castVote(data)
  //   } else {
  //     console.log("removeVote called",data)
  //     api.removeVote(data)
  //   }  
  //   this.setState({
  //     likedByUser: !this.state.likedByUser
  //   })
  // }






  render() {   
    let filteredPulls;
    if (this.state.pulls) {
      filteredPulls = this.state.pulls.filter(pull=>{
        return pull.title.toUpperCase().includes(this.state.searchValue.toUpperCase())
      }); 
    }   
    
    return (
      <div className="PullsPage">
        <h1>{this.props.repo.name}</h1>
        <CommentsContainer getComments={()=>this.getComments()} comments={this.state.comments} repo={this.props.repo} user={this.props.user}/>
        <InputGroup>
        <InputGroupAddon addonType="prepend">
          <InputGroupText>Search</InputGroupText>
        </InputGroupAddon>
        <Input name="searchValue" onChange={e => this.handleChange(e)} value={this.state.searchValue} />
      </InputGroup>
        <Table>
          <tbody>  
            {!this.state.pulls && <div>Loading...</div>}
              {filteredPulls && filteredPulls.map((pull, index) => {
                return <Pull
                  key={index} 
                  user={this.props.user}
                  // likedByUser={likedByUser}
                  pull={pull}
                  click={(value)=> this.handleClick(value)}
                  handleLike={()=>this.toggleLike(pull.pullRequestID)}
                  />
              })}
            </tbody>
        </Table>
      </div>
    );
  }
}

export default PullsPage;
