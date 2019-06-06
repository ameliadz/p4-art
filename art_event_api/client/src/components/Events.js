import React, { Component } from 'react';
import Event from './Event';

class Events extends Component {
  render() {
    return (
      <div>
      { this.props.events.map(event => <Event event={event} key={event.id}/>) }
      </div>
    )
  }
}

export default Events;
