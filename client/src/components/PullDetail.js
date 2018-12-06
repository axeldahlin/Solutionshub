import React, { Component } from 'react';
import api from '../api';




class PullDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pull: null
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
  }



  render() {
    console.log("this.props.user PULL DETAIL",this.props.user)

    if(this.state.pull) {
      return (
        <div className="PullDetail" >
           <h1>Pull detail</h1>
           <p>{this.state.pull._id}</p>
           <p>{this.state.pull.repoName}</p>
           <p>{this.state.pull.title}</p>
         
        <pre>{JSON.stringify(this.state.pull)}</pre>
        <h1>This is the pull details page</h1>
        <h2><a href={this.state.pull.url}>Find this solution on Github</a></h2>
        </div>
      )
    } else {
      return <h1>Loading...</h1>
    }

    

  }
}


export default PullDetail;