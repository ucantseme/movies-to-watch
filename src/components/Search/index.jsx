import { useEffect, useState, useCallback } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Title from '../Title';
import MovieList from '../Movies/MovieList';
import useMovieListStore from '../../store/useMovieListStore';

const Search = () => {
  const {
    movies,
    getMovieList,
    isGetMoviesLoading,
    resetMovieStore,
    setSearchText,
    setPage,
    page,
    totalPage,
  } = useMovieListStore((state) => ({
    movies: state.movies,
    getMovieList: state.getMovieList,
    isGetMoviesLoading: state.isGetMoviesLoading,
    resetMovieStore: state.resetMovieStore,
    setSearchText: state.setSearchText,
    setPage: state.setPage,
    page: state.page,
    totalPage: state.totalPage,
  }));
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const queryString = searchParams.get('queryString');
  const [scrollDom, setScrollDom] = useState(null);

  const handleScroll = useCallback(() => {
    if (totalPage && page === totalPage) {
      scrollDom.removeEventListener('scroll', handleScroll);
      return;
    }
    if (scrollDom.scrollTop + scrollDom.offsetHeight !== scrollDom.scrollHeight
      || isGetMoviesLoading) return;
    setPage();
    getMovieList();
  }, [getMovieList, isGetMoviesLoading, page, scrollDom, setPage, totalPage]);

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

  useEffect(() => {
    setScrollDom(document.querySelector('.main'));
    if (scrollDom) {
      scrollDom.addEventListener('scroll', handleScroll);
    }
    return () => {
      if (scrollDom) {
        scrollDom.removeEventListener('scroll', handleScroll);
      }
    };
  }, [scrollDom, handleScroll]);

  return (
    <>
      <Title />
      <MovieList list={movies} />
      {isGetMoviesLoading
      && (
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </Box>
      ) }
    </>
  );
};

export default Search;
