import React, { useState, useEffect } from 'react';
import { fetchMovies } from '../services/MovieServices';
import { Link } from 'react-router-dom';

const MovieSearch = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [movieType, setMovieType] = useState('');

  const handleSearch = async () => {
    if (!query) return;
    setLoading(true);
    setError('');
    try {
      const data = await fetchMovies(query, currentPage, movieType);
      if (data.Response === 'True') {
        setMovies(data.Search);
        setTotalResults(parseInt(data.totalResults));
      } else {
        setError('No movies found');
      }
    } catch (err) {
      setError('Error fetching movie data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleSearch();
  }, [query, currentPage, movieType]);

  const handleTypeChange = (e) => {
    setMovieType(e.target.value);
    setCurrentPage(1); 
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <div className='flex justify-between bg-blue-400 p-4'>
      <h2 className='text-lg text-white font-bold'>Movie Search App</h2>
      <input
        type="text"
        placeholder="Search for movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className='p-1'
        />
      <button onClick={handleSearch} className='text-lg text-white font-bold'>Search</button>
    
      <select onChange={handleTypeChange}>
        <option value="">All</option>
        <option value="movie">Movies</option>
        <option value="series">Series</option>
        <option value="episode">Episodes</option>
      </select>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      <div className='grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-2  p-4 bg-gray-400'>
        {movies.map((movie) => (
          <div key={movie.imdbID} className='border-2 border-black m-2 w-72 h-96 rounded-lg'>
            <Link to={`/movie/${movie.imdbID}`}>
              <img src={movie.Poster} alt={movie.Title} className='w-72 h-72 p-2'/>
              <h3 className='p-1 font-bold text-center'>{movie.Title}</h3>
              <p className='p-1 text-center font-bold'>{movie.Year}</p>
            </Link>
          </div>
        ))}
      </div>

      {totalResults > 10 && (
        <div className='text-center bg-gray-400'>
          {Array.from({ length: Math.ceil(totalResults / 10) }, (_, i) => (
            <button className='border-2 border-black m-2 p-2 rounded-lg hover:bg-blue-600 font-bold'
              key={i}
              onClick={() => handlePageChange(i + 1)}
              disabled={currentPage === i + 1}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default MovieSearch;
