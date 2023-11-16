const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAllRestaurants = async (req, res) => {
    //#swagger.tags = ['restaurants']
    const result = await mongodb.getDatabase().db('project').collection('restaurants').find();
    result.toArray().then((restaurants) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(restaurants);
    });
};

const getSingleRestaurant = async (req, res) => {
    //#swagger.tags = ['restaurants']
    const restaurantId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db('project').collection('restaurants').find({ _id: restaurantId });
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
    const response = await mongodb.getDatabase().db('project').collection('restaurants').replaceOne( { _id: restaurantId }, restaurant);
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
    const response = await mongodb.getDatabase().db('project').collection('restaurants').deleteOne( { _id: restaurantId });
    if (response.deletedCount > 0 ) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while deleting the restaurant.');
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
    const response = await mongodb.getDatabase().db('project').collection('restaurants').insertOne( restaurant );
    if (response.acknowledged) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while creating the restaurant.');
    }
};


module.exports = {
    getAllRestaurants,
    getSingleRestaurant,
    updateRestaurant,
    deleteRestaurant,
    createRestaurant
};
