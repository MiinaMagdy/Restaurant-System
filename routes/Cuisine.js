// packages
const express = require('express');
const router = express.Router();

// controller
const cuisineController = require('../controllers/Cuisine');
// routes
router.get('/cuisines', cuisineController.getCuisines);
router.get('/cuisines/:id', cuisineController.getCuisine);
router.post('/cuisines', cuisineController.createCuisine);
router.post('/cuisines/:id', cuisineController.updateCuisine);
router.delete('/cuisines/:id', cuisineController.deleteCuisine);

module.exports = router;