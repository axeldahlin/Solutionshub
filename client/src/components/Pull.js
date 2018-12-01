import React from 'react';
import { Route, Link, NavLink, Switch } from 'react-router-dom';


function Pull (props) {
  return (
    <div className="Pull">
      <p>{props.title}</p>
      <p>{props.url}</p>
      <p>{props.repoName}</p>
   
    </div>
  )
}


export default Pull;