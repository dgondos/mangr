#!/bin/env node

var ipaddress = process.env.OPENSHIFT_NODEJS_IP;
var port      = process.env.OPENSHIFT_NODEJS_PORT || 8080;

var connect = require('connect');
var serveStatic = require('serve-static');
connect().use(serveStatic('site-static')).listen(port, ipaddress);