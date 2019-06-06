import React from 'react';
import { Link } from 'react-router-dom';

export default function Venue(props) {
  const { venue } = props;
  return (
    <div className="venue">
      <p className="venue-name"><Link to={`venues/${venue.id}`}>{venue.name}</Link></p>
    </div>
  )
}
