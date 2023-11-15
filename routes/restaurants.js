const express = require('express');
const router = express.Router();

const restaurantsController = require('../controller/restaurants');

router.get('/', restaurantsController.getAll);
router.get('/:id', restaurantsController.getSingle);

module.exports = 
    router;
