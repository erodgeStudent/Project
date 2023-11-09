const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    //#swagger.tags = ['reviews]
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
        name: req.body.name,
        summary: req.body.summary,
        space: req.body.space,
        description: req.body.description
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

const createReview = async (req, res) => {
    //#swagger.tags = ['reviews']
    const review = {
        name: req.body.name,
        summary: req.body.summary,
        space: req.body.space,
        description: req.body.description
    };
    const response = await mongodb.getDatabase().db().collection('reviews').insertOne( review );
    if (response.acknowledged) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while updating the review.');
    }
};


module.exports = {
    getAll,
    getSingle,
    updateReview,
    deleteReview,
    createReview
};