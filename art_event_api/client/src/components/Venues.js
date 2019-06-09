import React from 'react';
import Venue from './Venue';

export default function Venues(props) {
  return (
    <div>
      <h2>All Venues</h2>
      <div className="all-venues">
        { props.venues.map(venue => <Venue venue={venue} key={venue.id} />) }
      </div>
    </div>
  )
}
