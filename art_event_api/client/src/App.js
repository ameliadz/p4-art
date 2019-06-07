import React, { Component } from 'react';
import './App.css';
import Header from './components/Header';
import Login from './components/Login';
import Home from './components/Home';
import Events from './components/Events';
import Register from './components/Register';
import SingleEvent from './components/SingleEvent';
import Venues from './components/Venues';
import SingleVenue from './components/SingleVenue';
import AccountPage from './components/AccountPage';
import decode from 'jwt-decode';
import { loginUser, registerUser, getVenues, getEvents, deleteEvent, deleteVenue, newVenue } from './services/apiHelper';
import { Route, Switch, withRouter } from 'react-router-dom';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      venues: [],
      events: [],
      user_id: null,
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
        days: [],
        venue_owner_id: null
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
    this.handleDeleteEvent = this.handleDeleteEvent.bind(this);
    this.checkLogin = this.checkLogin.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
    this.registerHandleChange = this.registerHandleChange.bind(this);
    this.handleRegisterButton = this.handleRegisterButton.bind(this);
    this.venueHandleChange = this.venueHandleChange.bind(this);
    this.addVenue = this.addVenue.bind(this);
    this.handleDaySelect = this.handleDaySelect.bind(this);
    this.handleDeleteVenue = this.handleDeleteVenue.bind(this);
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
      if (checkUser) {
        const currentUser = decode(checkUser);
        console.log(currentUser);
        await this.setState({
          user_id: currentUser.venue_owner_id
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
      return true;
    } else {
      this.props.history.push('/login');
    }
  }

  async handleRegister(e) {
    e.preventDefault()
    await registerUser({ "venue_owner": this.state.registerFormData })
    this.handleLogin();
  }

  handleLogout() {
    localStorage.removeItem("jwt")
    this.setState({
      user_id: null
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
      this.props.history.push('/account');
    }
  }

  handleRegisterButton(e) {
    e.preventDefault();
    if (this.handleLogin()) {
      this.props.history.push('/account');
    }
  }

  async handleDeleteEvent(id) {
    await deleteEvent(id);
    const events = await getEvents();
    this.setState({events})
    this.props.history.push('/');
  }

  async handleDeleteVenue(id) {
    await deleteVenue(id);
    const venues = await getVenues();
    this.setState({venues})
    this.props.history.push('/');
  }

  venueHandleChange(e) {
    const { name, value } = e.target;
    this.setState(prevState => ({
      venueForm: {
        ...prevState.venueForm,
        [name]: value
      }
    }))
  }

  async addVenue(e) {
    e && e.preventDefault();
    console.log(this.state.user)
    await this.setState(prevState => ({
      venueForm: {
        ...prevState.venueForm,
        venue_owner_id: this.state.user.id
      }
    }))
    console.log(this.state.venueForm);
    let response = await newVenue({"venue": this.state.venueForm})
    console.log('resp', response);
  }

  handleDaySelect(e) {
    const { days } = this.state.venueForm;
    console.log(days);
    let checked = e.target.checked;
    console.log(e.target.value);
    let selectedDay = e.target.value;
    if (checked) {
      this.setState(prevState => ({
        venueForm: {
          ...prevState.venueForm,
          days: [...days, selectedDay]
        }
      }));
    } else {
      let index = days.indexOf(selectedDay);
      if (index > -1) {
        days.splice(index, 1);
        this.setState(prevState => ({
          venueForm: {
            ...prevState.venueForm,
            days: days
          }
        }));
      }
    }
  }

  render() {
    return (
      <div className="App">
        <Header user_id={this.state.user_id} />
        <Switch>
          <Route exact path="/" render={() => <Home events={this.state.events} />} />
          <Route exact path="/events" render={() => <Events events={this.state.events} />} />
          <Route path="/login" render={() => <Login handleLogin={this.handleLogin} handleChange={this.loginHandleChange} formData={this.state.authFormData} handleLoginButton={this.handleLoginButton} />} />
          <Route path="/register" render={() => <Register handleRegister={this.handleRegister} handleChange={this.registerHandleChange} formData={this.state.registerFormData} handleRegisterButton={this.handleRegisterButton} venueHandleChange={this.venueHandleChange} venueForm={this.state.venueForm} handleDaySelect={this.handleDaySelect} />} />
          <Route path="/account" render={() => <AccountPage user_id={this.state.user_id} handleLogout={this.handleLogout} venueHandleChange={this.venueHandleChange} addVenue={this.addVenue} handleDaySelect={this.handleDaySelect} />} />
          <Route path="/events/:id" render={(props) => <SingleEvent {...props} handleDelete={this.handleDeleteEvent} />} />
          <Route exact path="/venues" render={() => <Venues venues={this.state.venues} />} />
          <Route path="/venues/:id" render={(props) => <SingleVenue {...props} handleDelete={this.handleDeleteVenue} />} />

        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
