// packages
const express = require('express');
const router = express.Router();

// controller
const cuisineController = require('../controllers/Cuisine');

// middlewares
const checkAuth = require('../middlewares/checkAuth');
const checkAdmin = require('../middlewares/checkAdmin');

// routes
router.get('/', checkAuth, cuisineController.getCuisines);
router.get('/:id', checkAuth, cuisineController.getCuisine);
router.post('/', checkAuth, checkAdmin, cuisineController.createCuisine);
router.post('/:id', checkAuth, checkAdmin, cuisineController.updateCuisine);
router.delete('/:id', checkAuth, checkAdmin, cuisineController.deleteCuisine);

module.exports = router;