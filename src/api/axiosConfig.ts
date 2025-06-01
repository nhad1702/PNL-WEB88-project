import axios from "axios";

const token = localStorage.getItem('token');
if (token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

const API = axios.create({
  baseURL: 'http://localhost:3001/api', // or from .env
  withCredentials: true, // if using cookies/session
  headers: {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` })
  },
});

export default API;
