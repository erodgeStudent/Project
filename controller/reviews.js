const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    const result = await mongodb.getDatabase().db().collection('reviews').find();
    result.toArray().then((reviews) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(reviews);
    });
};

const getSingle = async (req, res) => {
    const reviewId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('reviews').find({ _id: reviewId });
    result.toArray().then((reviews) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(reviews[0]);
    });
};

//for put and delete endpoints
const updateReview = async (req, res) => {
    //#swagger.tags = ['reviews']
    const reviewId = new ObjectId(req.params.id);
    const review = {
        listing_url: req.body.listing_url,
        name: req.body.name,
        summary: req.body.summary,
        space: req.body.space,
        access: req.body.access,
        house_rules: req.body.house_rules,
        property_type: req.body.property_type,
        room_type: req.body.room_type,
        price: req.body.price,
        images: req.body.images
    };
    const response = await mongodb.getDatabase().db().collection('reviews').replaceOne( { _id: reviewId }, review);
    if (response.modifiedCount > 0 ) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occured while updating user');
    }
};

const deleteReview = async (req, res) => {
    //#swagger.tags = ['reviews']
    const reviewId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection('reviews').deleteOne( { _id: reviewId });
    if (response.deletedCount > 0 ) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred hwile updating the user.');
    }
};


module.exports = {
    getAll,
    getSingle,
    updateReview,
    deleteReview
};