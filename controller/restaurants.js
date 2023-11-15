const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    const result = await mongodb.getDatabase().db().collection('restaurants').find();
    result.toArray().then((restaurants) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(restaurants);
    });
};

const getSingle = async (req, res) => {
    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('restaurants').find({ _id: userId });
    result.toArray().then((restaurants) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(restaurants);
    });
};

module.exports = {
    getAll,
    getSingle
};