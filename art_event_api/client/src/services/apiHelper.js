import axios from 'axios';

const BASE_URL = "http://localhost:4567";

export const getUser = async(token, id) => {
  try {
    const config = {
      headers: { 'Authorization': token }
    };
    const response = await axios.get(`${BASE_URL}/venue_owners/${id}`, config);
    return response.data
  } catch (e) {
    console.log(e);
  }
}

export const loginUser = async (loginData) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/login/`, loginData)
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

export const deleteEvent = async (id) => {
  try {
    await axios.delete(`${BASE_URL}/events/${id}`)
  } catch (e) {
    console.log(e);
  }
}

export const deleteVenue = async (id) => {
  try {
    await axios.delete(`${BASE_URL}/venues/${id}`);
  } catch (e) {
    console.log(e);
  }
}

export const newVenue = async (data) => {
  console.log(data)
  const response = await axios.post(`${BASE_URL}/venues`, data)
  return response.data
}
