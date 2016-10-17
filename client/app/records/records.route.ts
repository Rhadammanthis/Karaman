'use strict';

export default function($routeProvider) {
  'ngInject';
  $routeProvider
    .when('/records', {
      template: '<records></records>'
    });
}