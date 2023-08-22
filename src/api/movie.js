import axios from 'axios';

const request = axios.create({
  baseURL: 'http://127.0.0.1:3000',
});

export const getMovies = () => request.get('/discover/movie');

export const getMovie = (id) => request.get(`/movie/${id}`);
