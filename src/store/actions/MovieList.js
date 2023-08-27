export const getMovieListStart = () => ({ type: 'GET_MOVIE_LIST_START' });

export const getMovieListDone = (list) => ({ type: 'GET_MOVIE_LIST_DONE', payload: list });

export const getMovieListFail = () => ({ type: 'GET_MOVIE_LIST_FAIL' });

export const resetMovieList = () => ({ type: 'RESET_MOVIE_LIST' });

export const setPage = (page) => ({ type: 'SET_PAGE_NUM', payload: page });

export const setTotalPage = (page) => ({ type: 'SET_TOTAL_PAGE', payload: page });

export const setSortType = (sortType) => ({ type: 'SET_SORT_TYPE', payload: sortType });

export const setSearchText = (text) => ({ type: 'SET_SEARCH_TEXT', payload: text });
