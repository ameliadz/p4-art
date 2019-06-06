import React, { Component } from 'react';
import Events from './Events';

class Home extends Component {
  render() {
    return (
      <div>
        <Events events={this.props.events}/>
      </div>
    )
  }
}

export default Home
