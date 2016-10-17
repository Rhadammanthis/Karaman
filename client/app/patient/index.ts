'use strict';
const angular = require('angular');
const ngRoute = require('angular-route'); 


import routing from './patient.routes';
import register from './register/register.controller';

export default angular.module('colmorovApp.patient', [
    ngRoute,

    register
])
    .config(routing)
    .run(function($rootScope) {
      'ngInject';
      $rootScope.$on('$routeChangeStart', function(event, next, current) {
        if (next.name === 'logout' && current && current.originalPath && !current.authenticate) {
          next.referrer = current.originalPath;
        }
      });
    })

    .name;