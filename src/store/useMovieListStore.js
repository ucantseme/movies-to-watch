import { create } from 'zustand';
import {
  getMovieListStart,
  getMovieListDone,
  getMovieListFail,
  resetMovieList,
  resetMovieStore,
  setPage,
  setTotalPage,
  setSortType,
  setSearchText,
} from './actions/MovieList';
import { getMovies, getSearchMovies } from '../api/movie';

const getDiscoverMovieList = (query) => new Promise((resolve, reject) => {
  getMovies(query).then((res) => {
    resolve(res);
  }).catch((error) => {
    reject(error);
  });
});

const getSearchMovieList = async (query) => new Promise((resolve, reject) => {
  getSearchMovies(query).then((res) => {
    resolve(res);
  }).catch((error) => {
    reject(error);
  });
});

const initState = {
  movies: [],
  isGetMoviesLoading: false,
  isGetMoviesError: false,
  page: 0,
  sortType: 'popularity.desc',
  searchText: '',
  totalPage: 0,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'GET_MOVIE_LIST_START':
      return {
        ...state,
        isGetMoviesLoading: true,
        isGetMoviesError: false,
      };
    case 'GET_MOVIE_LIST_DONE': {
      const movies = state.page === 1 ? action.payload : [...state.movies, ...action.payload];
      return {
        ...state,
        movies,
        isGetMoviesLoading: false,
      };
    }
    case 'GET_MOVIE_LIST_FAIL':
      return {
        ...state,
        isGetMoviesLoading: false,
        isGetMoviesError: true,
      };
    case 'SET_PAGE_NUM':
      return {
        ...state,
        page: action.payload,
      };
    case 'SET_SORT_TYPE':
      return {
        ...state,
        sortType: action.payload,
      };
    case 'SET_SEARCH_TEXT':
      return {
        ...state,
        searchText: action.payload,
      };
    case 'SET_TOTAL_PAGE':
      return {
        ...state,
        totalPage: action.payload,
      };
    case 'RESET_MOVIE_LIST':
      return {
        ...state,
        movies: [],
      };
    case 'RESET_MOVIE_STORE':
      return initState;
    default:
      return state;
  }
};

const useMovieListStore = create((set, get) => {
  const dispatch = (args) => {
    set((state) => reducer(state, args));
  };
  return {
    ...initState,
    async getMovieList() {
      const {
        searchText, sortType, totalPage, page,
      } = get();
      if (totalPage && page === totalPage) return;
      dispatch(getMovieListStart());
      const querySearchText = searchText ? `&query=${searchText}` : '';
      const querySortType = sortType ? `&sort_by=${sortType}` : '';
      const queryPage = `&page=${page}`;
      let queryString = queryPage;
      console.log(queryString);
      if (querySearchText) {
        queryString += querySearchText;
        try {
          const {
            data:
            { results, total_pages: movieTotalPage },
          } = await getSearchMovieList(queryString);
          dispatch(setTotalPage(movieTotalPage));
          dispatch(getMovieListDone(results));
        } catch (error) {
          dispatch(getMovieListFail());
        }
      } else {
        queryString += querySortType;
        try {
          const { data: { results } } = await getDiscoverMovieList(queryString);
          dispatch(getMovieListDone(results));
        } catch (error) {
          dispatch(getMovieListFail());
        }
      }
    },
    setPage(num) {
      const { page } = get();
      const currentPage = num || page + 1;
      dispatch(setPage(currentPage));
    },
    setSortType(type) {
      dispatch(setSortType(type));
    },
    setSearchText(text) {
      dispatch(setSearchText(text));
    },
    resetMovieList() {
      dispatch(resetMovieList());
    },
    resetMovieStore() {
      dispatch(resetMovieStore());
    },
  };
});

export default useMovieListStore;
