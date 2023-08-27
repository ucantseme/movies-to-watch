import { useState } from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import MovieIcon from '@mui/icons-material/Movie';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import style from './Header.module.scss';

const Header = () => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const handleOpenUserMenu = () => {
    setShowUserMenu(true);
  };
  const handleCloseUserMenu = () => {
    setShowUserMenu(false);
  };
  return (
    <AppBar className={style.root} position="static">
      <Toolbar>
        <MovieIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
        <Typography
          variant="h5"
          component="span"
          noWrap
          sx={{
            mr: 2,
            display: { xs: 'flex', md: 'none' },
            fontFamily: 'monospace',
            fontWeight: 700,
            letterSpacing: '.3rem',
            color: 'inherit',
          }}
        >
          MOO
        </Typography>
        <Box sx={{ flexGrow: 1, display: { mobile: 'flex' } }}>
          <Link className={style.link} to="/movies">
            <span className={style.linkItem}>電影</span>
          </Link>
          <Link className={style.link} to="/watch-list">
            <span className={style.linkItem}>稍後觀看</span>
          </Link>
        </Box>
        <Box sx={{ flexGrow: 0 }}>
          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
          </IconButton>
          <Menu
            sx={{ mt: '45px' }}
            id="menu-appbar"
            anchorEl={showUserMenu}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={showUserMenu}
            onClose={handleCloseUserMenu}
          >
            <MenuItem>
              <Typography textAlign="center">Logout</Typography>
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
