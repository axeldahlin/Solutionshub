import React, { Component } from 'react';
import api from '../api';
import Pull from './Pull'
import CommentsContainer from './CommentsContainer'
import { Table, InputGroup, Input } from 'reactstrap';

class PullsPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      repo: null,
      pulls: [],
      comments: null,
      searchValue: "",
      columnToSort: "",
      sortDirection: "desc",
    }
  }

  componentDidMount() {
    this.fetchRepoInfo()
  }

  fetchRepoInfo() {
    let repoName = this.props.match.params.repo
    api.fetchRepoInfo(repoName)
    .then(repo=>{
      this.setState({
        repo:repo[0]
      })
      return
    })
    .then(_=>{
      return this.updatePulls() 
    })
    .then(_=>{
      return this.getComments()
    })
    .catch(err=>{
      console.log("error at fetchRepoInfo",err)
    })
  }

  updatePulls() {
    const repoName = this.state.repo.name
    const repoId = this.state.repo.githubID
      this.setState({
        pulls: null
      })

    api.getPulls(repoName,repoId)
      .then(pulls => {
        this.setState({ pulls })
        return api.updatePulls(repoName)
      })
      .catch(err => console.log(err))
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.repo !== prevProps.match.params.repo ) {
      this.fetchRepoInfo()
    } 
  }

  getComments() {
    api.getRepoComments(this.state.repo._id)
      .then(comments => {
        this.setState({comments})
      })
  }

  toggleLike(clickedPull) {
    let allPulls = [...this.state.pulls]
    let data = {
      _user: this.props.user._github,
      _pull: clickedPull,
      _repo: this.state.repo.githubID
    }
    let [match] = allPulls.filter(pulls => {
      return pulls.pullRequestID === clickedPull
    })
    if (!match.likedByUser) {
      match.likedByUser = true
      match.nbOfVotes++;
      api.castVote(data)
      .then(this.setState({
        pulls: allPulls
      }))
    } else {
      match.likedByUser = false
      match.nbOfVotes--;
      api.removeVote(data)
      .then(this.setState({
        pulls: allPulls
      }))
    } 
  }


  handleClick = (value) => {
    this.props.click(value)
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({[name]: value});
  }

  handleSort = (columnName) => {
    const invertDirection = {
      asc: "desc",
      desc: "asc"
    }
    this.setState({
      columnToSort: columnName,
      sortDirection: 
        this.state.columnToSort === columnName 
        ? invertDirection[this.state.sortDirection] 
        : "asc"
    })
  }

  sortAscending = (a,b) =>{
    return b[this.state.columnToSort] < a[this.state.columnToSort] ? 1 : -1
  }

  sortDescending = (a,b) =>{
    return b[this.state.columnToSort] > a[this.state.columnToSort] ? 1 : -1
  }


  render() {   
    let filteredPulls;
    //Sorts and filters before the render
    if (this.state.pulls) {
      filteredPulls = this.state.pulls.filter(pull=>{
        return pull.title.toUpperCase().includes(this.state.searchValue.toUpperCase()) || pull._githubUsername.toUpperCase().includes(this.state.searchValue.toUpperCase())
      })
      if (this.state.sortDirection === "asc") filteredPulls.sort(this.sortAscending)
      else filteredPulls.sort(this.sortDescending)
    }

    if (!this.state.repo) {
      return <h1>Loading....</h1>
    } else {
        return (
          <div className="PullsPage">
            <div className="pullspage-header">
             <CommentsContainer getComments={()=>this.getComments()} comments={this.state.comments} repo={this.state.repo} user={this.props.user}/>
              <h1 className="pull-list-header">{this.state.repo.name}</h1>
            </div>
          <div className="pull-table">
            <img className="octo-pulls" src="Octocat-low.png" alt="octo"/>
            <InputGroup className="pull-input">
            <Input style={{boxShadow: 'none'}} 
            className="search-input"
            name="searchValue" onChange={e => this.handleChange(e)}
            placeholder="Filter solutions..."
             value={this.state.searchValue} />
            <img className="input-img"src="zoom-tool.png" alt="search"/>
          </InputGroup>
            <Table hover>
              <thead>
                <tr>
                  <th scope="col">Campus</th>
                  <th scope="col">Pull Request</th>
                  <th scope="col">
                  <div style={{"cursor": "pointer"}} onClick={()=>this.handleSort("_githubUsername")}>User 
                  {this.state.columnToSort === "_githubUsername" ? (
                  this.state.sortDirection === "asc" 
                  ? (<span class="material-icons"> ⬆ </span> )             
                  : (<span class="material-icons"> ⬇</span>)
                  ) : null}
                  </div>
                  </th> 
                  <th scope="col" style={{"cursor": "pointer"}} onClick={()=>this.handleSort("updated_at")} >Date
                  {this.state.columnToSort === "updated_at" ? (
                  this.state.sortDirection === "asc" 
                  ? (<span class="material-icons"> ⬆ </span> )             
                  : (<span class="material-icons"> ⬇</span>)
                  ) : null}
                  </th>
                  <th scope="col"><div style={{"cursor": "pointer"}} onClick={()=>this.handleSort("nbOfVotes")} >Likes
                  {this.state.columnToSort === "nbOfVotes" ? (
                  this.state.sortDirection === "asc" 
                  ? (<span class="material-icons"> ⬆ </span> )             
                  : (<span class="material-icons"> ⬇</span>)
                  ) : null}
                  </div></th>
                  </tr>
              </thead>
              <tbody>  
                {!this.state.pulls && <div>Loading...</div>}
                  {filteredPulls && filteredPulls.map((pull, index) => {
                    return <Pull
                      repo={this.state.repo}
                      key={index} 
                      user={this.props.user}
                      pull={pull}
                      click={(value)=> this.handleClick(value)}
                      handleLike={()=>this.toggleLike(pull.pullRequestID)}
                      />
                  })}
                </tbody>
            </Table>
          </div>
          </div>
        );
    }
  }
}

export default PullsPage;
