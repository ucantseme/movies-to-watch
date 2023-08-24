import ImageList from '@mui/material/ImageList';
import MovieCard from '../MovieCard';

const MovieList = (props) => {
  const { list } = props;
  return (
    <ImageList cols={5} gap={8} sx={{ mt: 0 }}>
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
