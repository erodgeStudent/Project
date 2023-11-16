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
    const restaurantId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('restaurants').find({ _id: restaurantId });
    result.toArray().then((restaurants) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(restaurants);
    });
};


//for put and delete endpoints
const updateRestaurant = async (req, res) => {
    console.log("inside update restaurant");
    //#swagger.tags = ['restaurants']
    const restaurantId = new ObjectId(req.params.id);
    const restaurant = {
        address: req.body.address,
        zip: req.body.zip,
        cuisine: req.body.cuisine,
        name: req.body.name,
        price: req.body.price,
        review: req.body.review,
        street: req.body.street
    };
    const response = await mongodb.getDatabase().db().collection('restaurants').replaceOne( { _id: restaurantId }, restaurant);
    if (response.modifiedCount > 0 ) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occured while updating restaurant');
    }
};

const deleteRestaurant = async (req, res) => {
    console.log("inside delete restaurant");
    //#swagger.tags = ['restaurants']
    const restaurantId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection('restaurants').deleteOne( { _id: restaurantId });
    if (response.deletedCount > 0 ) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred hwile updating the user.');
    }
};

const createRestaurant = async (req, res) => {
    console.log("inside create restaurant");
    //#swagger.tags = ['restaurants']
    const restaurant = {
        address: req.body.address,
        zip: req.body.zip,
        cuisine: req.body.cuisine,
        name: req.body.name,
        price: req.body.price,
        review: req.body.review,
        street: req.body.street
    };
    const response = await mongodb.getDatabase().db().collection('restaurants').insertOne( restaurant );
    if (response.acknowledged) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while updating the restaurant.');
    }
};


module.exports = {
    getAll,
    getSingle,
    updateRestaurant,
    deleteRestaurant,
    createRestaurant
};
