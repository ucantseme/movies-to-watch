export const getWatchListStart = () => ({ type: 'GET_WATCH_LIST_START' });

export const getWatchListDone = () => ({ type: 'GET_WATCH_LIST_DONE' });

export const getWatchListFail = () => ({ type: 'GET_WATCH_LIST_FAIL' });

export const addWatchList = (movie) => ({ type: 'ADD_WATCH_LIST', payload: movie });

export const removeWatchList = (id) => ({ type: 'REMOVE_WATCH_LIST', payload: id });
