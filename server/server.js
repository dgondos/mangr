#!/bin/env node

var node_ip = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var node_port = process.env.OPENSHIFT_NODEJS_PORT || 8282;
var mongo_url_pfx = process.env.OPENSHIFT_MONGODB_DB_URL || 'mongodb://localhost:27017/';
var mongo_url = mongo_url_pfx + 'mangr';

var express = require('express');
var bodyParser = require('body-parser');
var compression = require('compression');
var connectDomain = require('connect-domain');

var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

var app = express();
app.use(connectDomain());
var jsonParser = bodyParser.json();
app.use(compression());

app.use(express.static('site-static'));
app.use(express.static('index.html'));

var getRestaurants = function(callback) {
    MongoClient.connect(mongo_url, function(err, db) {
        assert.equal(null, err);

        var restaurants = [];
        db.collection('restaurants').find().each(function (err, doc) {
            assert.equal(err, null);

            if (doc == null) {
                db.close();
                callback(restaurants);
            }
            else {
                restaurants.push({ name: doc.name, tags: doc.tags });
            }
        });
    });
};

var getReviews = function(callback) {
    MongoClient.connect(mongo_url, function(err, db) {
        assert.equal(null, err);

        var reviews = [];
        db.collection('reviews').find().each(function (err, doc) {
            assert.equal(err, null);

            if (doc == null) {
                db.close();
                callback(reviews);
            }
            else {
                reviews.push({ restaurant: doc.restaurant, rating: doc.rating, timestamp: doc.timestamp });
            }
        });
    });
};

var getRestaurant = function(name, callback) {
    MongoClient.connect(mongo_url, function(err, db) {
        assert.equal(null, err);

        var restaurant = undefined;

        db.collection('restaurants').find({name: name}).each(function (err, doc) {
            assert.equal(err, null);

            if (doc == null) {
                assert.notEqual(restaurant, undefined);
                db.close();
                callback(restaurant);
            }
            else {
                restaurant = { name: doc.name, tags: doc.tags };
            }
        });
    });
};

var getRating = function(restaurant, callback) {
    MongoClient.connect(mongo_url, function(err, db) {
        assert.equal(null, err);

        var reviews = [];
        db.collection('reviews').find({restaurant: restaurant}).each(function (err, doc) {
            assert.equal(err, null);

            if (doc == null) {
                db.close();
                callback(reviews.reduce(function(a, b) { return a + b; }, 0) / reviews.length);
            }
            else {
                reviews.push(doc.rating);
            }
        });
    });
};

// https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array/2450976#2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex ;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

var getLastReviewed5 = function(callback) {
    getRestaurants(function(restaurants) {
       getReviews(function(reviews) {
           var sortedReviews = reviews.sort(function(a, b) { return a.timestamp - b.timestamp; });

           var visitedRestaurants = [];
           var last5ReviewedRestaurants = [];

           // first add the yet-to-be-visited restaurants
           restaurants.forEach(function(restaurant) {
               var restaurantReviewed = sortedReviews.filter(function(review) {
                   return review.restaurant == restaurant.name;
               }).length !== 0;
               if (visitedRestaurants.length >= 5 ||
                   visitedRestaurants.indexOf(restaurant.name) >= 0 ||
                   restaurantReviewed) return;
               visitedRestaurants.push(restaurant.name);
               last5ReviewedRestaurants.push({ name: restaurant.name, tags: restaurant.tags });
           });

           // if we have any unreviewed restaurants, randomize them
           shuffle(last5ReviewedRestaurants);

           sortedReviews.forEach(function(sortedReview) {
               if (visitedRestaurants.length >= 5 ||
                   visitedRestaurants.indexOf(sortedReview.restaurant) >= 0) return;

               visitedRestaurants.push(sortedReview.restaurant);

               var restaurant = restaurants.filter(function(restaurantIt) {
                   return restaurantIt.name == sortedReview.restaurant;
               })[0];

               last5ReviewedRestaurants.push({ name: sortedReview.restaurant, tags: restaurant.tags });
           });

           callback(last5ReviewedRestaurants);
       });
    });
};

app.post('/api/upsert', jsonParser, function(req, res) {
    if (!req.body) return res.sendStatus(400);

    var restaurant = { name: req.body.name, tags: req.body.tags };
    MongoClient.connect(mongo_url, function(err, db) {
        assert.equal(null, err);

        db.collection('restaurants').update({ name: restaurant.name }, restaurant, { upsert: true }, function(err, result) {
            assert.equal(err, null);
            db.close();
            res.json({ statusOk: true });
        });
    });
});

app.post('/api/review', jsonParser, function(req, res) {
    if (!req.body) return res.sendStatus(400);

    getRestaurant(req.body.restaurant, function(restaurant) {
        var review = { restaurant: req.body.restaurant, rating: req.body.rating, timestamp: new Date() };
        MongoClient.connect(mongo_url, function(err, db) {
            assert.equal(null, err);

            db.collection('reviews').insertOne(review, function(err, result) {
                assert.equal(err, null);
                db.close();
                res.json({ statusOk: true });
            });
        });
    });
});

app.get('/api/restaurants', function(req, res) {
    getRestaurants(function(restaurants) {
        res.json({ statusOk: true, restaurants: restaurants.map(function(restaurant) { return restaurant.name; })});
    });
});

app.post('/api/restaurant', jsonParser, function(req, res) {
    if (!req.body) return res.sendStatus(400);

    getRestaurant(req.body.name, function(restaurant) {
        getRating(restaurant.name, function(rating) {
            restaurant.rating = rating;
            res.json({ statusOk: true, restaurant: restaurant });
        });
    });
});

app.get('/api/eat', function(req, res) {
    getLastReviewed5(function(reviews) {
        res.json(reviews);
    });
});

var server = app.listen(node_port, node_ip, function () {
});

app.use(function(err, req, res, next) {
    res.status(400).json({ statusOk: false, error: err.stack });
});