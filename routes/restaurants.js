const express = require('express');
const router = express.Router();

const restaurantsController = require('../controller/restaurants');
const { isAuthenticated } = require('../middleware/authenticate');


router.get('/', restaurantsController.getAll);
router.get('/:id', restaurantsController.getSingle);
router.put('/:id', isAuthenticated, restaurantsController.updateRestaurant);
router.delete('/:id', isAuthenticated, restaurantsController.deleteRestaurant);
router.post('/', isAuthenticated, restaurantsController.createRestaurant);

module.exports = 
    router;
