import React from 'react';
import Venue from './Venue';

export default function Venues(props) {
  return (
    <div>
    { props.venues.map(venue => <Venue venue={venue} key={venue.id} />) }
    </div>
  )
}
