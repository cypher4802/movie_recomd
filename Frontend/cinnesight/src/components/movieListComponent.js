import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MovieCard from './MovieCards';
import './stylesheets/List.css';

const MovieListComponent = ({ user }) => {
  const [movies, setMovies] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      console.log("fetching movies")
      try {
        console.log("fetching movies")
        const response = await axios.get('http://localhost:3000/movies/');
        setMovies(response.data);
        console.log("fetching completed")
      } catch (error) {
        console.error('Error fetching movies:', error.message);
        setError('Error fetching movies. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  const handleAddToFavorites = (movieId) => {
    // Update the local state or perform any additional actions
    console.log(`Added movie ${movieId} to favorites`);
  };
  console.log({movies})
  


  return (
    <div className='List'>
      {/* <div>{movies[1].title}</div> */}
      
      
      {loading ? (
        <p>Loading movies...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        movies.map((movie) => (
          <MovieCard key={movie._id} movie={movie} user={user} onAddToFavorites={handleAddToFavorites} />
        ))
        // <MovieCard movie={movies}></MovieCard>  
      )}
    </div>
  );
};

export default MovieListComponent;
