import React, { Component } from 'react';


class CommentForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
  
    }
  }





  render() {          
    return (

      <form>
      <label>
        Name:
        <input type="text" name="name" />
      </label>
      <input type="submit" value="Submit" />
    </form>
      
    );
  }
}

export default CommentForm;