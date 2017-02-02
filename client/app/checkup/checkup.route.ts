'use strict';

export default function($routeProvider) {
  'ngInject';
  $routeProvider
    .when('/checkup', {
      template: '<checkup></checkup>'
    });
}