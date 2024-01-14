const User = require('../models/users');
const Movie = require('../models/movies');
const { message } = require('statuses');

exports.addToFavorites = async (req, res) => {
  const { movieId } = req.body;

  try {
    
    const existingMovie = await Movie.findById(movieId);
    if (!existingMovie) {
      return res.status(404).json({ error: 'Movie not found' });
    }

    
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { $addToSet: { favoriteMovies: movieId } },
      { new: true }
    );

    res.json({ success: true, user: updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.removeFromFavorites = async (req, res) => {
  const { movieId } = req.params;

  try {
    
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { $pull: { favoriteMovies: movieId } },
      { new: true }
    );

    res.json({ success: true, user: updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
exports.getUserFavorites = async (req, res) => {
  try { 
    const user = await User.findById(req.user.id).populate('favoriteMovies');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user.favoriteMovies);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getUserById= async(req,res)=>{
  try{
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.status(200).json({
      success:true,
      user,
      message:'User found',
    });

  }catch (error){
    console.error(error);
    success:false;
   
    res.status(500).json({error: 'INternal server error',
    message:'Difficulty in finding user'
    });
  }
}

