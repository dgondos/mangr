#!/bin/env node

var node_ip = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var node_port = process.env.OPENSHIFT_NODEJS_PORT || 8282;
var mongo_url_pfx = process.env.OPENSHIFT_MONGODB_DB_URL || 'mongodb://localhost:27017/';
var mongo_url = mongo_url_pfx + 'mangr';

var express = require('express');
var bodyParser = require('body-parser');
var compression = require('compression');

var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
var assert = require('assert');

var app = express();
var jsonParser = bodyParser.json();
app.use(compression());

app.use(express.static('site-static'));
app.use(express.static('index.html'));

app.post('/api/add', jsonParser, function(req, res) {
    if (!req.body) return res.sendStatus(400);

    var restaurant = req.body; // this is already parsed from JSON
    var tags = [];
    restaurant.tags.forEach(function(tag) {
        tags.push({ name: tag });
    });
    MongoClient.connect(mongo_url, function(err, db) {
        assert.equal(null, err);

        db.collection('restaurants').insertOne(restaurant, function(err, result) {
            assert.equal(err, null);
        });

        db.collection('tags').insertMany(tags, function(err, result) {
            assert.equal(err, null);
            assert.equal(restaurant.tags.length, result.insertedCount);
            db.close();
        });
    });

    res.json({ statusOk: true });
});

app.get('/api/restaurants', function(req, res) {
    MongoClient.connect(mongo_url, function(err, db) {
        assert.equal(null, err);

        var restaurants = [];

        var cursor = db.collection('restaurants').find();
        cursor.each(function (err, doc) {
            assert.equal(err, null);
            if (doc == null) {
                db.close();
                res.json({ statusOk: true, restaurants: restaurants });
            }
            else {
                restaurants.push(doc.name);
            }
        });
    });
});

var server = app.listen(node_port, node_ip, function () {
});