const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAllReviews = async (req, res) => {
    console.log("inside getall reviews");
    //#swagger.tags = ['reviews']
    const result = await mongodb.getDatabase().db('project').collection('reviews').find();
    result.toArray().then((reviews) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(reviews);
    });
};

const getSingleReview = async (req, res) => {
    console.log("inside getsingle reviews");
    //#swagger.tags = ['reviews']
    const reviewId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db('project').collection('reviews').find({ _id: reviewId });
    result.toArray().then((reviews) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(reviews[0]);
    });
};


//for put and delete endpoints
const updateReview = async (req, res) => {
    console.log("inside update reviews");
    //#swagger.tags = ['reviews']
    const reviewId = new ObjectId(req.params.id);
    const review = {
        name: req.body.name,
        summary: req.body.summary,
        space: req.body.space,
        description: req.body.description
    };
    const response = await mongodb.getDatabase().db('project').collection('reviews').replaceOne( { _id: reviewId }, review);
    if (response.modifiedCount > 0 ) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occured while updating this review');
    }
};

const deleteReview = async (req, res) => {
    console.log("inside delete reviews");
    //#swagger.tags = ['reviews']
    const reviewId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db('project').collection('reviews').deleteOne( { _id: reviewId });
    if (response.deletedCount > 0 ) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while deleting this review.');
    }
};

const createReview = async (req, res) => {
    console.log("inside create reviews");
    //#swagger.tags = ['reviews']
    const review = {
        name: req.body.name,
        summary: req.body.summary,
        space: req.body.space,
        description: req.body.description
    };
    const response = await mongodb.getDatabase().db('project').collection('reviews').insertOne( review );
    if (response.acknowledged) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while creating the review.');
    }
};


module.exports = {
    getAllReviews,
    getSingleReview,
    updateReview,
    deleteReview,
    createReview
};