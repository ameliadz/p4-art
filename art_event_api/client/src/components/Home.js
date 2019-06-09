import React, { Component } from 'react';
import Events from './Events';

class Home extends Component {
  render() {
    return (
      <div>
        <h2>Events Around the City</h2>
        <Events home={true} events={this.props.events}/>
      </div>
    )
  }
}

export default Home
