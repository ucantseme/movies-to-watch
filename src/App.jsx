import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Header from './components/Header';
import Movies from './components/Movies';
import WatchList from './components/WatchList';
import Movie from './components/Movie';
import Error from './components/Error';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
  breakpoints: {
    values: {
      mobile: 0,
      table: 640,
      laptop: 1024,
      desktop: 1200,
    },
  },
});

const App = () => (
  <Router>
    <ThemeProvider theme={darkTheme}>
      <div className="app">
        <Header />
        <div className="main">
          <Routes>
            <Route path="/" element={<Error />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/watch-list" element={<WatchList />} />
            <Route path="/movie/:movieId" element={<Movie />} />
            <Route path="*" element={<Error />} />
          </Routes>
        </div>
      </div>
    </ThemeProvider>
  </Router>
);

export default App;
