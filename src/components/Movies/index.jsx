import { useEffect } from 'react';
import Title from '../Title';
import MovieList from './MovieList';
import useMovieListStore from '../../store/useMovieListStore';

const Movies = () => {
  const {
    movies, getMovieList, setPage, resetMovieStore,
  } = useMovieListStore((state) => ({
    movies: state.movies,
    getMovieList: state.getMovieList,
    setPage: state.setPage,
    resetMovieStore: state.resetMovieStore,
  }));

  useEffect(() => {
    setPage();
    getMovieList();
    return () => resetMovieStore();
  }, [getMovieList, resetMovieStore, setPage]);

  return (
    <>
      <Title />
      <MovieList list={movies} />
    </>
  );
};

export default Movies;
