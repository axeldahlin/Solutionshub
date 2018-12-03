import React, { Component } from 'react';
import CommentForm from './CommentForm'



class CommentsContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
  
    }
  }





  render() {          
    return (
      <div className="CommentsContainer">

        <h1>Comments</h1>
        <CommentForm />
        

      
        {this.props.comments && this.props.comments.map((comment, index) => {
          return (
            <div key={index}>
              <p>Comment: {comment.comment}</p>
              <p>User: {comment._user}</p>

            </div>
          )
        })}

      
    

        


      </div>
    );
  }
}

export default CommentsContainer;