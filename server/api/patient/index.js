'use strict';

var express = require('express');
var http = require('http');
var controller = require('./patient.controller');
var request = require("request");
var async = require('async');

var router = express.Router();

var idArray = [];
var movies = null;

var response;

router.post('/new', controller.create);
router.get('/', controller.index);
router.get('/:id', controller.show);
router.put('/:id', controller.update);
router.delete('/:id', controller.destroy);


module.exports = router;
