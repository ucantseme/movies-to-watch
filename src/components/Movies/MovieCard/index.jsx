import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import style from './MovieCard.module.scss';

const MovieCard = (props) => {
  const { posterPath, title, overview } = props;
  const imageUrl = `https://image.tmdb.org/t/p/original${posterPath}`;
  return (
    <ImageListItem className={style.movieCard}>
      <img src={imageUrl} alt="poster" loading="lazy" />
      <ImageListItemBar
        className={style.movieCardBar}
        title={title}
        subtitle={overview}
        position="below"
      />
    </ImageListItem>
  );
};

export default MovieCard;