const express = require('express');
const router = express.Router();
const favoriteControler=require('../controllers/favouriteController');
const { authenticateToken }=require('../middleWare/authMiddleware');

router.get('/:id', favoriteControler.getUserById);
router.put('/:id/addFavourite',authenticateToken,favoriteControler.addToFavorites);
router.get('/:id/favourites',authenticateToken,favoriteControler.getUserFavorites);
router.delete('/:id/removeFavourite',authenticateToken,favoriteControler.removeFromFavorites);

module.exports = router;
    