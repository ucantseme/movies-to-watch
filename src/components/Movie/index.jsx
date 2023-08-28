import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CircularProgress from '@mui/material/CircularProgress';
import { getMovie } from '../../api/movie';
import useWatchListStore from '../../store/useWatchListStore';
import style from './Movie.module.scss';

const Movie = () => {
  const [detail, setDetail] = useState({});
  const [loading, setLoading] = useState(true);
  const [showSnackbar, setShowSnackBar] = useState(false);
  const { movieId } = useParams();
  const addWatchList = useWatchListStore((state) => state.addWatchList);

  const handleAddToWatchList = () => {
    addWatchList(detail);
    setShowSnackBar(true);
  };

  const handleCloseSnackbar = () => {
    setShowSnackBar(false);
  };

  useEffect(() => {
    const getMovieDetail = async () => {
      try {
        const { data } = await getMovie(movieId);
        setDetail(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    getMovieDetail();
  }, [movieId]);
  return (
    loading ? (
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </Box>
    ) : (
      <>
        <div className={style.movieContainer}>
          <div
            className={style.movieBg}
            style={{
              backgroundImage: `linear-gradient(to right, 
            rgba(0, 0, 0, 0.8),
            rgba(0, 0, 0, 0.1)), 
            url(https://image.tmdb.org/t/p/w1280${detail.backdrop_path})`,
            }}
          />
          <div className={style.movieBody}>
            <Typography variant="h3" component="div">
              {detail.title}
            </Typography>
            <Typography
              component="div"
              sx={{
                display: 'flex', alignItems: 'center', color: '#d0d0d0', mt: 1,
              }}
            >
              <LocalFireDepartmentIcon />
              <Typography component="span">
                {`${Math.floor(detail.vote_average * 10)}`}
                ・
              </Typography>
              <Typography component="span">
                {detail.release_date}
                ・
              </Typography>
              <Typography component="span">{`${Math.floor(detail.runtime / 60)}h ${detail.runtime % 60}m`}</Typography>
            </Typography>
            <Box component="div" sx={{ color: '#d0d0d0' }}>
              {detail.genres.map((genre, index) => <Typography component="span" key={genre.name}>{`${genre.name}${index === detail.genres.length - 1 ? '' : '、'}`}</Typography>)}
            </Box>
            <Typography variant="h5" sx={{ mt: 10, mb: 2 }}>簡介</Typography>
            <Typography component="div" sx={{ width: '45%' }}>{detail.overview}</Typography>
            <Box component="div" sx={{ mt: 6 }}>
              <Button color="inherit" variant="outlined" size="large" startIcon={<PlayArrowIcon />} sx={{ mr: 2 }}>播放</Button>
              <Button color="inherit" variant="outlined" size="large" startIcon={<AddCircleOutlineIcon />} onClick={handleAddToWatchList}>稍後觀看</Button>
            </Box>
          </div>
        </div>
        <Snackbar
          open={showSnackbar}
          onClose={handleCloseSnackbar}
          autoHideDuration={3000}
          message="新增稍後觀看清單成功"
        />
      </>
    )

  );
};

export default Movie;
