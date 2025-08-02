const axios = require('axios');
require('dotenv').config();

const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  headers: {
    Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
    Accept: 'application/json'
  }
});

module.exports = api;
    