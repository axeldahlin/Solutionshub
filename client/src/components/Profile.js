import React, { Component } from 'react';
import { Table, InputGroup, InputGroupAddon, InputGroupText, Input } from 'reactstrap';
import api from '../api';



class Profile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userPulls: null
    }
  }

  handleClick = () => {
    this.props.click(this.props.pull)
  }

  getUserPulls() {
    api.getUserPulls(this.props.user.githubUsername)
    .then(userPulls=>{
      this.setState({
        userPulls
      })
    })
    .catch(err=>{
      console.log("error at User Component did Mount")
    })
  }

  componentDidMount() {
    this.getUserPulls()
  }

  render() {
    return (
      <div className="Profile">
      <br></br>
      <h2>Hello, {this.props.user.githubName}</h2>
      <h3>@{this.props.user.githubUsername}</h3>
      <img src={this.props.user.githubImageUrl} alt="profile_picture"></img>

      <h3>My Pulls: </h3>

      <Table>
          <tbody>  
            {!this.state.userPulls && <div>Loading...</div>}
              {this.state.userPulls && this.state.userPulls.map((pull, index) => {
                return <tr className="Pull">
                <td>{pull.title}</td>
                <td>{pull.repoName}</td>
                <td>{new Date(pull.updated_at).toUTCString()}</td>
              </tr>
              })}
            </tbody>
        </Table>

      </div>
    )
  }
}


export default Profile;


