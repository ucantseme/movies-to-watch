import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Header from './components/Header';
import Movies from './components/Movies';
import WatchList from './components/WatchList';
import Movie from './components/Movie';
import Search from './components/Search';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const App = () => (
  <Router>
    <ThemeProvider theme={darkTheme}>
      <div className="app">
        <Header />
        <div className="main">
          <Routes>
            <Route path="/" element={<Movies />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/watch-list" element={<WatchList />} />
            <Route path="/movie/:movieId" element={<Movie />} />
            <Route path="/search" element={<Search />} />
            <Route path="*" element={<Movies />} />
          </Routes>
        </div>
      </div>
    </ThemeProvider>
  </Router>
);

export default App;
