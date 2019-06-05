import axios from 'axios';

const BASE_URL = "http://localhost:4567"

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
