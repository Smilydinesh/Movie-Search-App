import React, { useEffect, useState } from 'react';
import { fetchMovieDetails } from '../services/MovieServices';
import { useParams } from 'react-router-dom';

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const data = await fetchMovieDetails(id);
        if (data.Response === 'True') {
          setMovie(data);
        } else {
          setError('Movie not found');
        }
      } catch (err) {
        setError('Error fetching movie details');
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      {movie && (
        <div className='MovieDetails p-4 bg-gray-400'>  
          <img src={movie.Poster} alt={movie.Title} className='w-96 h-96'/>
          <h2 className='p-1 font-bold'>{movie.Title}</h2>
          <p className='p-1 font-bold'>{movie.Year}</p>
          <p className='p-1 font-bold'>{movie.Genre}</p>
          <p className='p-1 font-bold'>{movie.Plot}</p>
          <p className='p-1 font-bold'>IMDB Rating: {movie.imdbRating}</p>
          <h3 className='p-1 font-bold'>Cast: {movie.Actors}</h3>
        </div>
      )}
    </div>
  );
};

export default MovieDetail;
