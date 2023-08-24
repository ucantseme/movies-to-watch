import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import TheatersOutlinedIcon from '@mui/icons-material/TheatersOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import style from './Header.module.scss';

const Header = () => (
  <AppBar className={style.root} position="static">
    <Toolbar>
      <Box sx={{ flexGrow: 1, display: { mobile: 'flex' } }}>
        <Link className={style.link} to="/movies">
          <TheatersOutlinedIcon />
          <span className={style.linkItem}>電影</span>
        </Link>
        <Link className={style.link} to="/watch-list">
          <AddOutlinedIcon />
          <span className={style.linkItem}>我的片單</span>
        </Link>
      </Box>
    </Toolbar>
  </AppBar>
);

export default Header;
