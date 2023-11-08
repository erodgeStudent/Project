const router = require('express').Router();

router.get('/', (req, res) => {res.send('Hello World');})

router.use('/reviews', require('./reviews'));

module.exports = router;