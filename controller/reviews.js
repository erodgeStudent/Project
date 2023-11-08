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

module.exports = {
    getAll,
    getSingle
}