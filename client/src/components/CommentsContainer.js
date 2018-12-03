import React, { Component } from 'react';


class CommentsContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
  
    }
  }



  getComments() {

    console.log('DEBUG this.props.repoId:', this.props)


    
  }

  componentDidMount() {
    this.getComments()
  }


  render() {          
    return (
      <div className="CommentsContainer">

        <h1>Comments</h1>


      </div>
    );
  }
}

export default CommentsContainer;