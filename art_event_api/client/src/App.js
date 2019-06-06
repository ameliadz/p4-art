import React, { Component } from 'react';
import './App.css';
import Header from './components/Header';
import Login from './components/Login';
import Home from './components/Home';
import SingleEvent from './components/SingleEvent';
import Venues from './components/Venues';
import SingleVenue from './components/SingleVenue';
import AccountPage from './components/AccountPage';
import decode from 'jwt-decode';
import { loginUser, registerUser, getVenues, getEvents, getUser } from './services/apiHelper';
import { Route, Switch, withRouter } from 'react-router-dom';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      venues: [],
      events: [],
      loggedIn: false,
      user: null,
    }
    this.handleLogin = this.handleLogin.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.authHandleChange = this.authHandleChange.bind(this);
    this.handleLoginButton = this.handleLoginButton.bind(this);
  }

  async componentDidMount() {
    const user = await getUser();
    const venues = await getVenues();
    const events = await getEvents();
    this.setState({ venues, events, user });
    this.setState({
      loggedIn: true
    })
    console.log(this.state);
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
      user: null
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

  render() {
    return (
      <div className="App">
        <Header loggedIn={this.state.loggedIn} />
        <Switch>
          <Route exact path="/" render={() => <Home events={this.state.events} />}/>
          <Route path="/login" render={() => <Login handleLogin={this.handleLogin} handleChange={this.authHandleChange} formData={this.state.authFormData} handleLoginButton = {this.handleLoginButton} />} />
          <Route path="/account" render={() => <AccountPage user={this.state.user} />} />
          <Route path="/events/:id" render={(props) => <SingleEvent {...props} />} />
          <Route exact path="/venues" render={() => <Venues venues={this.state.venues} />} />
          <Route path="/venues/:id" render={(props) => <SingleVenue {...props} />} />

        </Switch>
      </div>
    );
  }
}

export default withRouter(App);


//
// <Route exact path="/" render={() => this.state.currentUser ? <button className="button" type="button" onClick={this.handleLogout}>Log Out</button> : <button className="button" type="button" onClick={() => this.props.history.push('/auth/login')}>Log In</button>} />
// <Route exact path="/auth/login" render={() => <Login handleLogin={this.handleLogin} handleChange={this.authHandleChange} formData={this.state.authFormData} handleLoginButton={this.handleLoginButton} />} />
// <Route exact path="/users" render={() => <Register handleRegister={this.handleRegister} handleChange={this.authHandleChange} formData={this.state.authFormData} />} />
