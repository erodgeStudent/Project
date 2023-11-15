const express = require('express');
const router = express.Router();

const reviewsControllers = require('../controller/reviews');

const { isAuthenticated } = require('../middleware/authenticate');

router.get('/', reviewsControllers.getAll);
router.get('/:id', reviewsControllers.getSingle);
//add put and delete endpoints
router.put('/:id', isAuthenticated, reviewsControllers.updateReview);
router.delete('/:id', isAuthenticated, reviewsControllers.deleteReview);
router.post('/', isAuthenticated, reviewsControllers.createReview);

module.exports = router;