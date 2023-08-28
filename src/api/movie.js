import axios from 'axios';

const request = axios.create({
  baseURL: 'https://asia-east1-practice-397007.cloudfunctions.net',
});

export const getMovies = (query) => request.get(`/tmdb-discover?language=zh-TW${query}`);

export const getSearchMovies = (query) => request.get(`/tmdb-search?language=zh-TW${query}`);

export const getMovie = (id) => request.get(`/tmdb-movie/${id}?language=zh-TW`);
