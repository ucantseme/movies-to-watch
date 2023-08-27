import { useEffect } from 'react';
import Title from '../Title';
import MovieList from './MovieList';
import useMovieListStore from '../../store/useMovieListStore';

const Movies = () => {
  const { movies, getMovieList, setPage } = useMovieListStore((state) => ({
    movies: state.movies,
    getMovieList: state.getMovieList,
    setPage: state.setPage,
  }));
  useEffect(() => {
    setPage();
    getMovieList();
  }, [getMovieList, setPage]);

  return (
    <>
      <Title />
      <MovieList list={movies} />
    </>
  );
};

export default Movies;
