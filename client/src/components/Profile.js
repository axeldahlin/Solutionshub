import React, { Component } from 'react';
import { Table, InputGroup, InputGroupAddon, InputGroupText, Input } from 'reactstrap';
import api from '../api';



class Profile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userPulls: null,
      totalLikes: 0
    }
  }

  handleClick = () => {
    this.props.click(this.props.pull)
  }

  getUserPulls() {
    api.getUserPulls(this.props.user.githubUsername)
    .then(response=>{
      this.setState({
        userPulls: response.userPullsWithVotes,
        totalLikes: response.totalVotes
      })
    })
    .catch(err=>{
      console.log("error at User Component did Mount",err)
    })
  }

  componentDidMount() {
    this.getUserPulls()
  }

  render() {
    return (
      <div className="Profile">
        <div className="profile-header">
      <img src={this.props.user.githubImageUrl} alt="profile_picture"></img>
      <div>
      {this.state.userPulls &&
      <div>
      <h2>Hello, {this.props.user.githubName}</h2>
      <h3>@{this.props.user.githubUsername}</h3>
      <div>Likes: {this.state.totalLikes}</div>
      </div>
      }

        </div>

      </div>
  
     

      <br></br>

      <h3>My Pulls: </h3>
      <div className="profile-container">
        <Table>
            <thead>
              <tr>
                <th>Pull</th>
                <th>Repo</th>
                <th>Likes</th>
                <th>Date</th>

              </tr>
            </thead>
            <tbody>  
              {!this.state.userPulls && <div>Loading...</div>}
                {this.state.userPulls && this.state.userPulls.map((pull, index) => {
                  return <tr className="Pull">
                  <td>{pull.title}</td>
                  <td>{pull.repoName}</td>
                  <td>{pull.nbOfVotes}</td>
                  <td>{new Date(pull.updated_at).toUTCString()}</td>
                </tr>
                })}
              </tbody>
          </Table>

      </div>

      </div>
    )
  }
}


export default Profile;


