// MovieCard.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './stylesheets/MovieCard.css';
import {FaStar} from "react-icons/fa";
import { Navigate } from 'react-router-dom';


const MovieCard = ({ movie, user, onAddToFavorites }) => {
  const [isAddingToFavorites, setIsAddingToFavorites] = useState(false);
  const [clickingToMovie,setClickingToMovie]=useState(false);

  if (clickingToMovie){
    return <Navigate to={`/movies/${movie._id}`} />;
  }

  const handleAddToFavorites = async () => {
    console.log(movie._id)
    console.log(user._id)
    try {
      setIsAddingToFavorites(true);
      await axios.post(`http://localhost:3000/${user._id}/addFavourite`, {
        movieId: movie._id,
      
      });
      onAddToFavorites(movie._id);
    } catch (error) {
      console.error('Error adding to favorites:', error.message);
    } finally {
      setIsAddingToFavorites(false);
    }
  };

  return (
    <div className="Card" >
      
      <Link to={`/movies/${movie._id}`}>
        <img src={movie.poster} alt={movie.title} className='Poster' onClick={()=>setClickingToMovie(true)} />
        <div className="movie-details" >
          <p className="Title">{movie.title}</p>
          <div className='Rating'>
            <FaStar className='FavouriteIcon'></FaStar>
            <p className="RatingStars">{movie.rating}</p>
            
          </div>
          
        </div>
      </Link>
      {user && (
        <button onClick={handleAddToFavorites} disabled={isAddingToFavorites}>
          {isAddingToFavorites ? 'Adding to Favorites...' : 'Add to Favorites'}
        </button>
      )}
    </div>
  );
};



// const MovieCard2=()=>{
//   return(
//     <div className='Bg'>
//       <div className='Card'>
//       <img src="" alt="Movie Poster" className='Poster'></img>
//       <p className='Title'>Dunki</p>
//       <div className='Rating'>
//         <FaStar className='FavouriteIcon'></FaStar>
//         <p className='RatingStars'>4.5</p>
        
//       </div>
      

      

  

export default MovieCard;
