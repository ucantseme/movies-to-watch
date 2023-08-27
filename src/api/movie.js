import axios from 'axios';

const request = axios.create({
  baseURL: 'http://127.0.0.1:3000',
});

export const getMovies = (query) => request.get(`/movie/popular?language=zh-TW${query}`);

export const getSearchMovies = (query) => request.get(`/search/movie?language=zh-TW${query}`);

export const getMovie = (id) => request.get(`/movie/${id}?language=zh-TW`);
