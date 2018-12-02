import React, { Component } from 'react';




class PullDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
  
    }
  }




  render() {
    return (
      <div className="PullDetail" >


        <h1>Pull detail</h1>

        <p>{this.props.pull._id}</p>
        <p>{this.props.pull.repoName}</p>
        <p>{this.props.pull.title}</p>



     
     
      </div>
    )

  }
}


export default PullDetail;