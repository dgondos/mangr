#!/bin/env node

var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port      = process.env.OPENSHIFT_NODEJS_PORT || 8282;

var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var jsonParser = bodyParser.json();
var compression = require('compression');
app.use(compression());

app.use(express.static('site-static'));
app.use(express.static('index.html'));

app.post('/api/:api', jsonParser, function(req, res) {
    if (!req.body) return res.sendStatus(400);

    if (req.params.api == 'add') {
        res.json({ restName: req.body.name, firstTag: req.body.tags[0] });
    }
    else {
        res.sendStatus(400);
    }
});

var server = app.listen(port, ipaddress, function () {
});