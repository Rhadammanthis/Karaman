'use strict';

export default function($routeProvider) {
  'ngInject';
  $routeProvider
    .when('/home', {
      template: '<home></home>'
    });
}