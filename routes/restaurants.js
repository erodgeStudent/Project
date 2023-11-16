const express = require('express');
const router = express.Router();

const restaurantsController = require('../controller/restaurants');
const { isAuthenticated } = require('../middleware/authenticate');


router.get('/', restaurantsController.getAllRestaurants);
router.get('/:id', restaurantsController.getSingleRestaurant);
router.post('/', isAuthenticated, restaurantsController.createRestaurant);
router.put('/:id', isAuthenticated, restaurantsController.updateRestaurant);
router.delete('/:id', isAuthenticated, restaurantsController.deleteRestaurant);


module.exports = router;
