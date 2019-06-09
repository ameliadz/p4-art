import React, { Component } from 'react';
import Event from './Event';

class Events extends Component {
  render() {
    return (
      <div>
      {this.props.home ? null : <h2>All Events</h2>}
        <div className="all-events">
        { this.props.events.map(event => <Event event={event} key={event.id}/>) }
        </div>
      </div>
    )
  }
}

export default Events;
