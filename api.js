import axios from "axios";
require('dotenv').config()

const api = axios.create({
  baseURL: "https://graph.facebook.com/v8.0",
  headers: {
    Authorization: `Bearer ${process.env.ACCESS_TOKEN}`
  },
});

export default api;