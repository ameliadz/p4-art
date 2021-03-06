import React from 'react';
import Nav from './Nav';
import { Link } from 'react-router-dom';

export default function Header(props) {
  return (
    <header>
      <Link to="/"><h1>Where Art Thou - NYC</h1></Link>
      <Nav user_id={props.user_id} />
    </header>
  )
}
