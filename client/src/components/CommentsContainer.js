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

        console.log(id)
        this.props.getComments()
      })
      .catch(err => console.log(err))
      this.setState({comment: ''})
  }


  render() {          
    return (
      <div className="CommentsContainer">
        <h1>Comments</h1>

        {/* <pre>{JSON.stringify(this.props.user)}</pre> */}
        <form onSubmit={(e) => this.handleSubmit(e)}>
          <label>
            Comment:
            <input type="text" value={this.state.comment}name="comment" onChange={(e) => this.handleChange(e)}/>
          </label>
          <input type="submit" value="Submit" />
        </form>
        
        {this.props.comments && this.props.comments.map((comment, index) => {
          return (
            <div class="Comment"key={index}>
              <div className="Comment-header">
                <img src={comment.imgUrl} alt=""/>
                <div>
                  <p className="Comment-name">{comment.githubName}</p>
                  <p className="Comment-date">{comment.date}</p>
                </div>
              </div>
              <p>{comment.comment}</p>
              {this.props.user._id === comment._user && <button onClick={() => this.handleDeleteComment(comment._id)}>Delete</button>}
            </div>
          )
        })}
      </div>
    );
  }
}

export default CommentsContainer;