'use strict';

export default function($routeProvider) {
  'ngInject';
  $routeProvider
    .when('/prescription', {
      template: '<prescription></prescription>'
    });
}