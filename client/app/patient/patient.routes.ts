'use strict';

export default function routes($routeProvider) {
  'ngInject';
  $routeProvider
    .when('/patient/register', {
      template: '<register-patient></register-patient>'
    });
};

