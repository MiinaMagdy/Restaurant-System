// packages
const express = require('express');
const router = express.Router();

// controller
const cuisineController = require('../controllers/Cuisine');
// routes
router.get('/', cuisineController.getCuisines);
router.get('/:id', cuisineController.getCuisine);
router.post('/', cuisineController.createCuisine);
router.post('/:id', cuisineController.updateCuisine);
router.delete('/:id', cuisineController.deleteCuisine);

module.exports = router;