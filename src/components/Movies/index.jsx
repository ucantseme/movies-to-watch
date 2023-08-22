import { useState, useEffect } from 'react';
import { getMovies } from '../../api/movie';
import MovieList from './MovieList';

const Movies = () => {
  const [list, setList] = useState([]);
  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await getMovies();
        setList(data.results);
      } catch (error) {
        console.error(error);
      }
    };
    getData();
  }, []);

  return (
    <MovieList list={list} />
  );
};

export default Movies;
