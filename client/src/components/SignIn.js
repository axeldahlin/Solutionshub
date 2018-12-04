import React, { Link, Component } from 'react';
import api from '../api'

class SignIn extends Component {
  constructor(props) {
    super(props)
    this.state = {
 
    }
  }



  render() {
    return (
     <div>

       <div className="signed-out-container">


         <div className="logo-container">
            <img src="logo.png" alt="logo" className="logo"/>

            <div className="signin-modal">
           <a href={api.service.defaults.baseURL + "/auth/github"}>Login</a>

          
            </div>

         </div>

       
       <div className="Img-container">

         <div>
            <img src="Octocat-low.png" alt="cat"/>
         </div>

         <div>
          <img src="ironhack.png" alt="iron"/>
         </div>

         <div>
            <img src="idea.png" alt="idea"/>

         </div>

       </div>


       <h1>What is the thing?</h1>
       <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc luctus tempor mauris, vitae feugiat justo rhoncus at. Aliquam pretium, nisl eu dapibus tincidunt, massa diam dignissim enim, non eleifend risus orci nec ex. In hendrerit aliquam suscipit. Pellentesque semper vestibulum justo ac accumsan. Nullam mattis pretium mauris in placerat. Phasellus molestie tincidunt tempor. Maecenas venenatis id ipsum venenatis vehicula. Nunc volutpat tortor vel arcu varius fermentum. Praesent suscipit volutpat ipsum.

Ut mi sem, viverra sit amet turpis laoreet, sagittis pharetra dui. Aliquam sodales erat sit amet elit mollis eleifend. Cras sed luctus purus. Etiam eleifend mollis erat gravida pulvinar. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque eu arcu nunc. Nunc auctor enim vitae justo venenatis imperdiet. Cras sed sollicitudin felis. </p>


       </div>


     </div>
    )
  }
}

export default SignIn;
