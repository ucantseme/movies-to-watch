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
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { getMovie } from '../../api/movie';
import useWatchListStore from '../../store/useWatchListStore';
import style from './Movie.module.scss';

const Movie = () => {
  const [detail, setDetail] = useState({});
  const [loading, setLoading] = useState(true);
  const [showSnackbar, setShowSnackBar] = useState(false);
  const { movieId } = useParams();
  const theme = useTheme();
  const large = useMediaQuery(theme.breakpoints.up('sm'));
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
          <Box
            className={style.movieBg}
            sx={{ top: { xs: '56px', sm: '64px' } }}
          >
            <img src={`https://image.tmdb.org/t/p/w1280${detail.backdrop_path}`} alt={detail.title} />
            <div className={style.movieBgMask} />
          </Box>
          <Box className={style.movieBody} sx={{ padding: { xs: '96px 0 32px 0', sm: '96px 0 32px 48px' } }}>
            <Typography variant="h3" component="div" sx={{ fontSize: { xs: '2rem', sm: '3rem' } }}>
              {detail.title}
            </Typography>
            <Typography
              component="div"
              sx={{
                display: 'flex',
                alignItems: 'center',
                color: '#d0d0d0',
                mt: 1,
              }}
            >
              <LocalFireDepartmentIcon />
              <Typography component="span" sx={{ fontSize: { xs: '0.75rem', sm: '1rem' } }}>
                {`${Math.floor(detail.vote_average * 10)}`}
                ・
              </Typography>
              <Typography component="span" sx={{ fontSize: { xs: '0.75rem', sm: '1rem' } }}>
                {detail.release_date}
                ・
              </Typography>
              <Typography component="span" sx={{ fontSize: { xs: '0.75rem', sm: '1rem' } }}>{`${Math.floor(detail.runtime / 60)}h ${detail.runtime % 60}m`}</Typography>
            </Typography>
            <Box component="div" sx={{ color: '#d0d0d0' }}>
              {detail.genres.map((genre, index) => <Typography component="span" key={genre.name} sx={{ fontSize: { xs: '0.75rem', sm: '1rem' } }}>{`${genre.name}${index === detail.genres.length - 1 ? '' : '、'}`}</Typography>)}
            </Box>
            <Typography variant="h5" sx={{ mt: 10, mb: 2, fontSize: { xs: '1.25rem', sm: '1.5rem' } }}>簡介</Typography>
            <Typography
              component="div"
              sx={{
                width: {
                  xs: '100%', sm: '45%', lineHeight: 1.75, fontSize: { xs: '0.875rem', sm: '1rem' },
                },
              }}
            >
              {detail.overview}
            </Typography>
            <Box component="div" sx={{ mt: 6 }}>
              <Button color="inherit" variant="outlined" size={large ? 'large' : 'medium'} startIcon={<PlayArrowIcon />} sx={{ mr: 2 }}>播放</Button>
              <Button color="inherit" variant="outlined" size={large ? 'large' : 'medium'} startIcon={<AddCircleOutlineIcon />} onClick={handleAddToWatchList}>稍後觀看</Button>
            </Box>
          </Box>
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
