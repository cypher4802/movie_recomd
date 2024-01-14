// Favorites.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Favorites = ({ user }) => {
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  useEffect(() => {
    const fetchFavoriteMovies = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/users/${user._id}/favorites`);
        setFavoriteMovies(response.data.favoriteMovies);
      } catch (error) {
        console.error('Error fetching favorite movies:', error.message);
      }
    };

    if (user) {
      fetchFavoriteMovies();
    }
  }, [user]);

  return (
    <div>
      <h2>{user.username}'s Favorites</h2>
      {favoriteMovies.map((movie) => (
        <div key={movie._id}>
          <img src={movie.poster} alt={movie.title} />
          <p>{movie.title}</p>
        </div>
      ))}
    </div>
  );
};

export default Favorites;
