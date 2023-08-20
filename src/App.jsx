import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Header from './components/Header';
import Movies from './components/Movies';
import Search from './components/Search';
import WatchList from './components/WatchList';
import Error from './components/Error';

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
        <Routes>
          <Route path="/" element={<Error />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/search" element={<Search />} />
          <Route path="/watch-list" element={<WatchList />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </div>
    </ThemeProvider>
  </Router>
);

export default App;
