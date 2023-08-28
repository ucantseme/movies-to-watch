import { useLocation, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import useMovieListStore from '../../store/useMovieListStore';

const title = {
  movies: '電影',
  search: '搜尋結果',
  'watch-list': '稍後觀看',
};
const menuItems = [
  {
    label: '按人氣降序',
    value: 'popularity.desc',
  },
  {
    label: '按人氣升序',
    value: 'popularity.asc',
  },
  {
    label: '按評分降序',
    value: 'vote_average.desc',
  },
  {
    label: '按評分升序',
    value: 'vote_average.asc',
  },
  {
    label: '按上映日期降序',
    value: 'primary_release_date.desc',
  },
  {
    label: '按上映日期升序',
    value: 'primary_release_date.asc',
  },
];

const Title = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname.replace('/', '');
  const currentTitle = title[pathname] || '電影';
  const {
    sortType,
    setSortType,
    setPage,
    searchText,
    setSearchText,
    getMovieList,
  } = useMovieListStore((state) => ({
    sortType: state.sortType,
    setSortType: state.setSortType,
    setPage: state.setPage,
    searchText: state.searchText,
    setSearchText: state.setSearchText,
    getMovieList: state.getMovieList,
  }));

  const handleSortChange = (event) => {
    setSortType(event.target.value);
    setPage(1);
    getMovieList();
  };

  const handleSearchTextChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleSearch = () => {
    if (!searchText) return;
    navigate(`/search?queryString=${searchText}`);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
      <Typography variant="h4" m={2} sx={{ fontSize: { xs: '1.25rem', md: '2.125rem' }, textWrap: 'nowrap', marginLeft: { xs: 0 } }}>
        {currentTitle}
      </Typography>
      { pathname !== 'search' && (
        <FormControl size="small" focused={false} hiddenLabel sx={{ mr: 2 }}>
          <Select
            labelId="demo-select-small-label"
            id="demo-select-small"
            value={sortType}
            onChange={handleSortChange}
          >
            {
            menuItems.map((item) => (
              <MenuItem key={item.value} value={item.value}>
                {item.label}
              </MenuItem>
            ))
          }
          </Select>
        </FormControl>
      )}
      <Paper sx={{
        width: { xs: 1, sm: 'auto' }, p: '2px 4px', display: 'flex', alignItems: 'center',
      }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="搜尋"
          value={searchText}
          onChange={handleSearchTextChange}
          onKeyDown={handleKeyDown}
        />
        <IconButton type="button" size="small" aria-label="search" onClick={handleSearch}>
          <SearchIcon />
        </IconButton>
      </Paper>
    </Box>
  );
};

export default Title;
