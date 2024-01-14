// OneMoviePage.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
// import './stylesheets/OneMoviePage.css'
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';

const OneMoviePage = () => {
  const [movie, setMovie] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    // console.log("Movie ID:", match.params.movieId);
    const fetchMovieDetails = async () => {
      try {

        if (!id) {
          console.error('Movie ID is undefined');
          return; // Avoid making the request with an undefined ID
        }

        const response = await axios.get(`http://localhost:3000/movies/${id}`);
        setMovie(response.data);
        console.log({ response })
        console.log(movie);
      } catch (error) {
        console.error('Error fetching movie details:', error.message);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (!movie) {
    return <div>Loading...</div>;
  }
  console.log({ movie });

  // console.log({match});
  return (
    <div className='Screen'>
      {/* <Card className="bg-dark text-white">
        <Card.Img src={movie.poster} alt="Card image" className='Poster'/>
        <Card.ImgOverlay>
          <Card.Title>{movie.name}</Card.Title>
          <Card.Text>
            {movie.description}
          </Card.Text>
          <Card.Text>{movie.platforms.join(', ')}</Card.Text>
        </Card.ImgOverlay>
      </Card> */}

      
      <img src={movie.poster} alt={movie.name} className='Poster'/> 
      <h2 className='Title'>{movie.name}</h2>
      <p className='Description'>Description: {movie.description}</p>
      <p className='Rating'>Rating: {movie.rating}</p>
      <p className='Runtime'>Runtime: {movie.runtime} minutes</p>
      <p className='Language'>Language: {movie.language}</p>
      <p className='Genres'>Genres: {movie.genres.join(', ')}</p>
      <p className='Platforms'>Available Platforms: {movie.platforms.join(', ')}</p>
    </div>
  );
};

export default OneMoviePage;
