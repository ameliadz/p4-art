import axios from 'axios';

const BASE_URL = "http://localhost:4567"

export const loginUser = async (loginData) => {
  try {
    const resp = await axios.post(`${URL}/auth/login/`, loginData)
    console.log(resp);
    return resp.data
  } catch (e) {
    console.log(e)
  }
}

export const registerUser = async (registerData) => {
  try {
    const resp = await axios.post(`${URL}/users`, registerData)
    return resp.data
  } catch (e) {
    console.log(e)
  }
}

export const getVenues = async () => {
  const response = await axios.get(`${BASE_URL}/venues`);
  const venues = response.data;
  return venues;
}

export const getEvents = async () => {
  const response = await axios.get(`${BASE_URL}/events`);
  const events = response.data;
  return events;
}
