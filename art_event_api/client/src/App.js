import React, { Component } from 'react';
import './App.css';
import Header from './components/Header';
import Home from './components/Home';
import SingleEvent from './components/SingleEvent';
import Venues from './components/Venues';
import SingleVenue from './components/SingleVenue';
import AccountPage from './components/AccountPage';
import decode from 'jwt-decode';
import { loginUser, registerUser, getVenues, getEvents } from './services/apiHelper';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      venues: [],
      events: [],
      loggedIn: false,
      user: null,
      event: null,
      venue: null
    }
    this.handleLogin = this.handleLogin.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.authHandleChange = this.authHandleChange.bind(this);
    this.handleLoginButton = this.handleLoginButton.bind(this);
    this.selectEvent = this.selectEvent.bind(this);
    this.selectVenue = this.selectVenue.bind(this);
  }

  async componentDidMount() {
    const venues = await getVenues();
    const events = await getEvents();
    this.setState({ venues, events });
    console.log(this.state)
  }

  checkLogin() {
      const checkUser = localStorage.getItem("jwt")
      if (checkUser) {
        const user = decode(checkUser)
        this.setState({ user })
      }
  }

  async handleLogin() {
    const userData = await loginUser(this.state.authFormData)
    if (userData) {
      this.setState({
        currentUser: decode(userData.token)
      })
      localStorage.setItem("jwt", userData.token);
    } else {
      this.props.history.push('/auth/login');
    }
  }

  async handleRegister(e) {
    e.preventDefault()
    const userData = await registerUser({ "user": this.state.authFormData })
    this.handleLogin();
  }

  handleLogout() {
    localStorage.removeItem("jwt")
    this.setState({
      currentUser: null
    })
  }

  authHandleChange(e) {
    const { name, value } = e.target;
    this.setState(prevState => ({
      authFormData: {
        ...prevState.authFormData,
        [name]: value
      }
    }))
  }

  handleLoginButton(e) {
    e.preventDefault();
    this.handleLogin();
    this.props.history.push('/');
  }

  selectEvent(event) {
    this.setState({ event })
    this.props.history.push(`/events/${event.id}`)
  }

  selectVenue(venue) {
    this.setState({ venue })
    this.props.history.push(`/venues/${venue.id}`)
  }

  render() {
    return (
      <div className="App">
        <Header />
        <Switch>
          <Route exact path="/" render={() => <Home events={this.state.events} selectEvent={this.selectEvent} />}/>
          <Route path="/account" render={() => <AccountPage user={this.user} />} />
          <Route path="/events/:id" render={() => <SingleEvent event={this.state.event} />} />
          <Route exact path="/venues" render={() => <Venues venues={this.state.venues} selectVenue={this.selectVenue} />} />
          <Route path="/venues/:id" render={() => <SingleVenue venue={this.state.venue} />} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
