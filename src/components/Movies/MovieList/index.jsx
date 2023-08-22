import ImageList from '@mui/material/ImageList';
import MovieCard from '../MovieCard';

const MovieList = (props) => {
  const { list } = props;
  return (
    <ImageList cols={5} gap={8} sx={{ py: 2 }}>
      {list.map((item) => (
        <MovieCard
          key={item.id}
          posterPath={item.poster_path}
          title={item.title}
          overview={item.overview}
        />
      ))}
    </ImageList>
  );
};
export default MovieList;
