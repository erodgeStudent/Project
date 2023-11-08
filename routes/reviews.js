const express = require('express');
const router = express.Router();

const reviewsControllers = require('../controller/reviews');

router.get('/', reviewsControllers.getAll);

router.get('/:id', reviewsControllers.getSingle);

module.exports = router;