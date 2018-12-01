import React from 'react';
import { Route, Link, NavLink, Switch } from 'react-router-dom';


function Repo (props) {
  return (
    <div className="Repo">
      <p>{props.name}</p>
      <p>{props.url}</p>
      <Link to={`pulls/${props.name}`}>See pull requests</Link>
    </div>
  )
}


export default Repo;
