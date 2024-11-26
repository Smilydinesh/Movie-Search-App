import axios from 'axios'

const API_KEY = '877d4f47';
const BASE_URL = 'https://www.omdbapi.com/';

export const fetchMovies = async (searchQuery, page = 1, type = '') => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        s: searchQuery,
        page: page,
        type: type,
        apikey: API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Error fetching movie data');
  }
};

export const fetchMovieDetails = async (movieId) => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        i: movieId,
        apikey: API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Error fetching movie details');
  }
};
