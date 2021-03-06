/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/movies              ->  index
 * POST    /api/movies              ->  create
 * GET     /api/movies/:id          ->  show
 * PUT     /api/movies/:id          ->  update
 * DELETE  /api/movies/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import Patient from './patient.model';

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      var data = {};
      data.patients = [];

      for(var i in entity){
        data.patients.push(entity[i]);
      }

      res.status(statusCode).json(data);
    }
  };
}

function respondPostWithResult(res, statusCode) {
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

// Gets a list of Patients
export function index(req, res) {
  return Patient.find().exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Patient from the DB
export function show(req, res) {
  return Patient.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Patient in the DB
export function create(req, res) {
  console.log('~~~~~~~~')
  console.log(req.body);
  return Patient.create(req.body)
    .then(respondPostWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing Patient in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return Patient.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Patient from the DB
export function destroy(req, res) {
  return Patient.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
