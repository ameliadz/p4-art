import React from 'react';
import Nav from './Nav';
import { Link } from 'react-router-dom';

export default function Header(props) {
  return (
    <header>
      <Link to="/"><h1>art events</h1></Link>
      <Nav user={props.user} />
    </header>
  )
}
