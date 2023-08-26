import { useLocation } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

import { useState } from 'react';

const title = {
  movies: '電影',
  'watch-list': '我的片單',
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
  const location = useLocation();
  const pathname = location.pathname.replace('/', '');
  const currentTitle = title[pathname];
  const [sort, setSort] = useState('popularity.desc');

  const handleSelectChange = (event) => {
    setSort(event.target.value);
  };
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Typography variant="h4" m={2}>
        {currentTitle}
      </Typography>
      <FormControl size="small" focused={false} hiddenLabel>
        <Select
          labelId="demo-select-small-label"
          id="demo-select-small"
          value={sort}
          onChange={handleSelectChange}
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
      <Paper sx={{
        ml: 2, p: '2px 4px', display: 'flex', alignItems: 'center', width: 400,
      }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="搜尋"
        />
        <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
          <SearchIcon />
        </IconButton>
      </Paper>
    </Box>
  );
};

export default Title;
