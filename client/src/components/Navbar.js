import React, { Component } from 'react';
import { Route, Link, NavLink, Switch } from 'react-router-dom';


function Navbar (props) {
  return (
    <div className="Navbar">

      <Link to="/repos">Repos</Link>

      <Link to="/auth/github">Github</Link>




    </div>

  )
}


export default Navbar;
