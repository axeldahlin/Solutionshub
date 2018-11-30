import React from 'react';

function Repo (props) {
  return (
    <div className="Repo">
      <p>{props.name}</p>
      <p>{props.url}</p>
    </div>
  )
}


export default Repo;
