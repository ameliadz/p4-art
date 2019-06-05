import React, { Component } from 'react';
import './App.css';
import { getVenues, getEvents } from './services/apiHelper';
import { Route, Link } from 'react-router-dom';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      venues: null,
      events: null,
      loggedIn: false,
      user: null
    }
  }

  async componentDidMount() {
    const venues = await getVenues();
    const events = await getEvents();
    this.setState({ venues, events });
    console.log(this.state)
  }

  render() {
    return (
      <div className="App">
        happening
      </div>
    );
  }
}

export default App;
