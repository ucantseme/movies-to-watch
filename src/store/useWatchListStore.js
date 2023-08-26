import { create } from 'zustand';
import { addWatchList, removeWatchList } from './actions/WatchList';

const initState = {
  movies: [],
  isGetMoviesLoading: false,
  isGetMoviesError: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_WATCH_LIST': {
      const { id } = action.payload;
      const index = state.movies.findIndex((movie) => movie.id === id);
      const movies = index < 0 ? [...state.movies, action.payload] : [...state.movies];
      return {
        ...state,
        movies,
        isGetMoviesLoading: false,
      };
    }
    case 'REMOVE_WATCH_LIST': {
      const id = action.payload;
      const movies = state.movies.filter((movie) => movie.id !== id);
      return {
        ...state,
        movies,
      };
    }
    default:
      return state;
  }
};

const useMovieList = create((set) => {
  const dispatch = (args) => {
    set((state) => reducer(state, args));
  };
  return {
    ...initState,
    addWatchList(movie) {
      dispatch(addWatchList(movie));
    },
    removeWatchList(id) {
      dispatch(removeWatchList(id));
    },
    dispatch,
  };
});

export default useMovieList;
