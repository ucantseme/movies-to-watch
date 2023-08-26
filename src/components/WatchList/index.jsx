import useWatchListStore from '../../store/useWatchListStore';
import MovieList from '../Movies/MovieList';

const WatchList = () => {
  const movies = useWatchListStore((state) => state.movies);
  return (
    <MovieList list={movies} />
  );
};
export default WatchList;
