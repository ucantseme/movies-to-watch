import ImageList from '@mui/material/ImageList';
import MovieCard from '../MovieCard';

const MovieList = (props) => {
  const { list } = props;
  return (
    <ImageList gap={12} sx={{ mt: 0, pt: 1, gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr)) !important' }}>
      {list.map((item) => (
        <MovieCard
          key={item.id}
          id={item.id}
          posterPath={item.poster_path}
          title={item.title}
          overview={item.overview}
        />
      ))}
    </ImageList>
  );
};
export default MovieList;
