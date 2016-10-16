/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/movies              ->  index
 * POST    /api/movies              ->  create
 * GET     /api/movies/:id          ->  show
 * PUT     /api/movies/:id          ->  update
 * DELETE  /api/movies/:id          ->  destroy
 */

'use strict';

var request = require("request");

import _ from 'lodash';
import List from './list.model';

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function saveUpdates(updates) {
  return function(entity) {
    var updated = _.merge(entity, updates);
    return updated.save()
      .then(updated => {
        return updated;
      });
  };
}

function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.remove()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of Movies
export function index(req, res) {
  return List.find().exec()
    .then(respondWithResultArray(res))
    .catch(handleError(res));
}

function respondWithResultArray(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      var resp = {};
      resp.id = [];
      
      for(var i in entity){
        var id = entity[i].mdb_id;
        resp.id.push(id);
      }

      console.log(resp);

      var options = {
        uri: 'http://localhost:3000/api/movies',
        method: 'POST',
        json: resp
      };

      request(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {

          var result = {};
          result.movies = [];

          for(var i in body){
            var item = {};
            item.title = body[i].original_title;
            item.poster = body[i].posters[0];
            item.poster.file_path = 'https://image.tmdb.org/t/p/w600/' + item.poster.file_path;

            result.movies.push(item);
          }

          res.status(statusCode).json(result);
          // console.log(body.id) // Print the shortened url.
        }
        else{
          console.log('error');
          console.log(error);
        }
      });

      
    }
  };
}

// Gets a single List from the DB
export function show(req, res) {
  return List.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new List in the DB
export function create(req, res) {
  console.log('~~~~~~~~')
  console.log(req.body);
  return List.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing List in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return List.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a List from the DB
export function destroy(req, res) {
  return List.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
