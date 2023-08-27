import { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Title from '../Title';
import MovieList from '../Movies/MovieList';
import useMovieListStore from '../../store/useMovieListStore';

const Search = () => {
  const {
    movies, getMovieList, resetMovieStore, setSearchText, setPage,
  } = useMovieListStore((state) => ({
    movies: state.movies,
    getMovieList: state.getMovieList,
    resetMovieStore: state.resetMovieStore,
    setSearchText: state.setSearchText,
    setPage: state.setPage,
  }));
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const queryString = searchParams.get('queryString');

  useEffect(() => {
    if (!queryString) {
      navigate('/movies');
    }
  }, [navigate, queryString]);

  useEffect(() => {
    setSearchText(queryString);
    setPage();
    getMovieList();
    return () => resetMovieStore();
  }, [getMovieList, queryString, resetMovieStore, setPage, setSearchText]);
  return (
    <>
      <Title />
      <MovieList list={movies} />
    </>
  );
};

export default Search;
