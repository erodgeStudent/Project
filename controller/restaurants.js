const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    //#swagger.tags = ['restaurants']
    const result = await mongodb.getDatabase().db().collection('restaurants').find();
    result.toArray().then((restaurants) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(restaurants);
    });
};

const getSingle = async (req, res) => {
    //#swagger.tags = ['restaurants']
    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('restaurants').find({ _id: userId });
    result.toArray().then((restaurants) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(restaurants);
    });
};


//for put and delete endpoints
const updateRestaurant = async (req, res) => {
    //#swagger.tags = ['restaurants']
    const reviewId = new ObjectId(req.params.id);
    const review = {
        address: req.body.address,
        review: req.body.review,
        zip: req.body.zip,
        cuisine: req.body.cuisine,
        name: req.body.name,
        price: req.body.price,
        street: req.body.street
    };
    const response = await mongodb.getDatabase().db().collection('reviews').replaceOne( { _id: reviewId }, review);
    if (response.modifiedCount > 0 ) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occured while updating user');
    }
};

const deleteRestaurant = async (req, res) => {
    //#swagger.tags = ['restaurants']
    const reviewId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection('reviews').deleteOne( { _id: reviewId });
    if (response.deletedCount > 0 ) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred hwile updating the user.');
    }
};

const createRestaurant = async (req, res) => {
    //#swagger.tags = ['restaurants']
    const review = {
        address: req.body.address,
        review: req.body.review,
        zip: req.body.zip,
        cuisine: req.body.cuisine,
        name: req.body.name,
        price: req.body.price,
        street: req.body.street
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
    updateRestaurant,
    deleteRestaurant,
    createRestaurant
};
