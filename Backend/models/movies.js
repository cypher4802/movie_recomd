const mongoose = require('mongoose');
const movieSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
    },
    poster:{
      type: String,
      
    },
    runtime: {
      type: String,
    },
    language: {
      type: String,
    }, 
    description: {
        type: String,
    },
    genres: [
      {
        type: String, // Assuming a simple string for the genre name
      },
    ] ,
    platforms: [
      {
        type: String, // Assuming a simple string for the platform name
      },
    ], 
  });
  
  let Movie = mongoose.model('Movie', movieSchema);
  module.exports = Movie;