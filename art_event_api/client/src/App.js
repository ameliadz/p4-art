import React, { Component } from 'react';
import './App.css';
import Header from './components/Header';
import Login from './components/Login';
import Home from './components/Home';
import Register from './components/Register';
import SingleEvent from './components/SingleEvent';
import Venues from './components/Venues';
import SingleVenue from './components/SingleVenue';
import AccountPage from './components/AccountPage';
import decode from 'jwt-decode';
import { loginUser, registerUser, getVenues, getEvents, getUser, deleteEvent } from './services/apiHelper';
import { Route, Switch, withRouter } from 'react-router-dom';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      venues: [],
      events: [],
      user: null,
      authFormData: {
        email: "",
        password: ""
      },
      registerFormData: {
        email: "",
        password: "",
        first_name: "",
        last_name: "",
      },
      venueForm: {
        name: "",
        category: "",
        area: "",
        address: "",
        opening_time: "",
        closing_time: "",
        days: []
      },
      eventForm: {
        name: "",
        description: "",
        images: [],
        price: "",
        start_date: "",
        end_date: "",
        permanent: "",
        latitude: "",
        longitude: "",
        venue: "",
        media: []
      }
    }
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.loginHandleChange = this.loginHandleChange.bind(this);
    this.handleLoginButton = this.handleLoginButton.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.checkLogin = this.checkLogin.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
    this.registerHandleChange = this.registerHandleChange.bind(this);
    this.handleRegisterButton = this.handleRegisterButton.bind(this);
  }

  async componentDidMount() {
    await this.checkLogin();
    const venues = await getVenues();
    const events = await getEvents();
    this.setState({ venues, events });
    console.log(this.state);
  }

  async checkLogin() {
    try {
      const checkUser = localStorage.getItem("jwt")
      console.log(checkUser);
      if (checkUser) {
        const currentUser = decode(checkUser);
        const user = await getUser(checkUser, currentUser.venue_owner_id);
        await this.setState({
          user: user
        });
      } else {
        this.props.history.push('/login')
      }
    } catch (err) {console.log(err.message)}
  }

  async handleLogin() {
    const userData = await loginUser(this.state.authFormData)
    if (userData) {
      localStorage.setItem("jwt", userData.token);
      await this.checkLogin();
    } else {
      this.props.history.push('/login');
    }
  }

  async handleRegister(e) {
    e.preventDefault()
    const userData = await registerUser({ "venue_owner": this.state.registerFormData })
    this.handleLogin();
  }

  handleRegisterButton(e) {
    e.preventDefault();
    console.log('ta-da');
  }

  handleLogout() {
    localStorage.removeItem("jwt")
    this.setState({
      user: null
    })
  }

  loginHandleChange(e) {
    const { name, value } = e.target;
    this.setState(prevState => ({
      authFormData: {
        ...prevState.authFormData,
        [name]: value
      }
    }))
  }

  registerHandleChange(e) {
    const { name, value } = e.target;
    this.setState(prevState => ({
      registerFormData: {
        ...prevState.registerFormData,
        [name]: value
      }
    }))
  }

  handleLoginButton(e) {
    e.preventDefault();
    if (this.handleLogin()) {
      this.props.history.push('/');
    }
  }

  async handleDelete(id) {
    await deleteEvent(id);
    const events = await getEvents();
    this.setState({events})
    this.props.history.push('/');
  }

  render() {
    return (
      <div className="App">
        <Header user={this.state.user} />
        <Switch>
          <Route exact path="/" render={() => <Home events={this.state.events} />}/>
          <Route path="/login" render={() => <Login handleLogin={this.handleLogin} handleChange={this.loginHandleChange} formData={this.state.authFormData} handleLoginButton={this.handleLoginButton} />} />
          <Route path="/register" render={() => <Register handleRegister={this.handleRegister} handleChange={this.registerHandleChange} formData={this.state.registerFormData} handleRegisterButton={this.handleRegisterButton} venueForm={this.state.venueForm} />} />
          <Route path="/account" render={() => <AccountPage user={this.state.user} handleLogout={this.handleLogout} />} />
          <Route path="/events/:id" render={(props) => <SingleEvent {...props} handleDelete={this.handleDelete} />} />
          <Route exact path="/venues" render={() => <Venues venues={this.state.venues} />} />
          <Route path="/venues/:id" render={(props) => <SingleVenue {...props} />} />

        </Switch>
      </div>
    );
  }
}

export default withRouter(App);


// <Route exact path="/users" render={() => <Register handleRegister={this.handleRegister} handleChange={this.authHandleChange} formData={this.state.authFormData} />} />
