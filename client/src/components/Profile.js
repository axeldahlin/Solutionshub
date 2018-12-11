import React, { Component } from 'react';
import { Table } from 'reactstrap';
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
    let lightBulb = "../light_on.svg"
    return (
      <div className="Profile">
        <div className="profile-header">
            <img className="profile-pic" src={this.props.user.githubImageUrl} alt="profile_picture"></img>
            <div className="profile-info">
              {this.state.userPulls &&
                <div >
                <h2>Hello, {this.props.user.githubName}</h2>
                <h3>@{this.props.user.githubUsername}</h3>
                <div className="likes-container"><img className="profile-lightbulb" src={lightBulb} alt="bulb" />  <span className="profile-likes">: {this.state.totalLikes}</span></div>
                </div>
              }
        </div>
      </div>
  
      <br/>

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
                  return <tr key={index} className="Pull">
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