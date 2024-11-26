import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MovieSearch from './Movies/MovieSearch';
import MovieDetail from './Movies/MovieDetails';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MovieSearch />} />
        <Route path="/movie/:id" element={<MovieDetail />} />
      </Routes>
    </Router>
  );
};

export default App;
