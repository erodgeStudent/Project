const express = require('express');
const router = express.Router();

const restaurantsController = require('../controller/restaurants');

router.get('/', restaurantsController.getAll);
router.get('/:id', restaurantsController.getSingle);
router.put('/:id', restaurantsController.updateRestaurant);
router.delete('/:id', restaurantsController.deleteRestaurant);
router.post('/', restaurantsController.createRestaurant);

module.exports = 
    router;
