import React, { Component } from 'react';
import api from '../api'



class CommentsContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      comment: ''
  
    }
  }

  handleChange = (e) => {
    this.setState({comment: e.target.value})
  }

  handleSubmit = (e) => {
    e.preventDefault()
    let date = new Date()
    let day = date.getDate();
    let month = date.getMonth();
    let year = date.getFullYear();
    date = `${day}-${month}-${year}`
    
    let data = {
      comment: this.state.comment,
      date,
      _repo: this.props.repo._id,
      githubName: this.props.user.githubName,
      _user: this.props.user._id,
      imgUrl: this.props.user.githubImageUrl
    }

    api.postRepoComment(data)
    .then(res => {
      this.props.getComments()
    })
    .catch(err => console.log(err))
    this.setState({comment: ''})


  }

  handleDeleteComment = (id) => {
    api.deleteRepoComment(id)
      .then(_ => {
        this.props.getComments()
      })
      .catch(err => console.log(err))
      this.setState({comment: ''})
  }


  render() {          
    return (
      <div className="comments-modal" id="textarea_id">
        <div className="comments-container">
        <h5>Comments</h5>
          {this.props.comments && this.props.comments.map((comment, index) => {
            return (
                  <div className="comment" key={index}>  
                      <div className="comment-header">
                      <img src={comment.imgUrl} alt="user"/>
                        <p className="comment-name">{comment.githubName}</p>
                        <p className="comment-date">{comment.date}</p>
                        {this.props.user._id === comment._user && <span className="delete-comment" onClick={() => this.handleDeleteComment(comment._id)}>[delete]</span>}
                      </div>
                      
                  
                      <p className="comment-text">{comment.comment}</p>
                  </div>
            )
          })}
        </div>

  
        
        <form className="comment-form" onSubmit={(e) => this.handleSubmit(e)}>
            <input placeholder="Leave a comment... [ENTER]" className="comment-input" type="text" value={this.state.comment}name="comment" onChange={(e) => this.handleChange(e)}/>
        </form>
        
      </div>
    );
  }
}

export default CommentsContainer;