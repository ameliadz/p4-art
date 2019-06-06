import axios from 'axios';

const BASE_URL = "http://localhost:4567";

export const getUser = async() => {
  try {
    const response = await axios.get(`${BASE_URL}/venue_owners/4`);
    return response.data
  } catch (e) {
    console.log(e);
  }
}

export const loginUser = async (loginData) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/login/`, loginData)
    console.log(response);
    return response.data
  } catch (e) {
    console.log(e)
  }
}

export const registerUser = async (registerData) => {
  try {
    const response = await axios.post(`${BASE_URL}/users`, registerData)
    return response.data
  } catch (e) {
    console.log(e);
  }
}

export const getVenues = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/venues`);
    const venues = response.data;
    return venues;
  } catch (e) {
    console.log(e);
  }
}

export const getEvents = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/events`);
    const events = response.data;
    return events;
  } catch (e) {
    console.log(e);
  }
}

export const getVenue = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/venues/${id}`)
    const venue = response.data;
    return venue;
  } catch (e) {
    console.log(e);
  }
}

export const getEvent = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/events/${id}`)
    const artEvent = response.data;
    return artEvent;
  } catch (e) {
    console.log(e);
  }
}
