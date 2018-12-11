import React, { Component } from 'react';

class Welcome extends Component {
  render() {
    return (
      <div className="Welcome">
       <div className="Welcome-Container-Grid">
         <div className="octocat">
            <img src="Octocat-low.png" alt="cat"/>
         </div>
         <div className="ironhack">
          <img src="ironhack.png" alt="iron"/>
         </div>
         <div className="maintext">
         <div className="intro-text">
       <h2>What is Solutions Hub?</h2>
       <p>Solutions Hub is a tool for Ironhackers–students and teachers–to have access to good quality solutions to the Ironhack labs.  </p>
       </div>
       </div>
       </div>
      </div>
    );
  }
}

export default Welcome;