const express = require('express');
const router = express.Router();

const reviewsControllers = require('../controller/reviews');

router.get('/', reviewsControllers.getAll);

router.get('/:id', reviewsControllers.getSingle);
//add put and delete endpoints
router.put('/:id', reviewsControllers.updateReview);
router.delete('/:id', reviewsControllers.deleteReview);


module.exports = router;