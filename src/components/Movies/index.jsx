import { useEffect, useState, useCallback } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Title from '../Title';
import MovieList from './MovieList';
import useMovieListStore from '../../store/useMovieListStore';

const Movies = () => {
  const {
    movies, isGetMoviesLoading, getMovieList, page, totalPage, setPage, resetMovieStore,
  } = useMovieListStore((state) => ({
    movies: state.movies,
    isGetMoviesLoading: state.isGetMoviesLoading,
    getMovieList: state.getMovieList,
    page: state.page,
    totalPage: state.totalPage,
    setPage: state.setPage,
    resetMovieStore: state.resetMovieStore,
  }));
  const [scrollDom, setScrollDom] = useState(null);

  const handleScroll = useCallback(() => {
    if (totalPage && page === totalPage) {
      console.log('a');
      scrollDom.removeEventListener('scroll', handleScroll);
      return;
    }
    if (scrollDom.scrollTop + scrollDom.offsetHeight !== scrollDom.scrollHeight
      || isGetMoviesLoading) return;
    setPage();
    getMovieList();
  }, [getMovieList, isGetMoviesLoading, scrollDom, setPage, page, totalPage]);

  useEffect(() => {
    setPage();
    getMovieList();
    return () => resetMovieStore();
  }, [setPage, getMovieList, resetMovieStore]);

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

export default Movies;
