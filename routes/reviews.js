const router = require('express').Router();

const reviewsControllers = require('../controller/reviews');

const { isAuthenticated } = require('../middleware/authenticate');

router.get('/', reviewsControllers.getAllReviews);
router.get('/:id', reviewsControllers.getSingleReview);
//add put and delete endpoints
router.post('/', isAuthenticated, reviewsControllers.createReview);
router.put('/:id', isAuthenticated, reviewsControllers.updateReview);
router.delete('/:id', isAuthenticated, reviewsControllers.deleteReview);


module.exports = router;