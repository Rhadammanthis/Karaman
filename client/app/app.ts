'use strict';
const angular = require('angular');
// import ngAnimate from 'angular-animate';
const ngCookies = require('angular-cookies');
const ngResource = require('angular-resource');
const ngSanitize = require('angular-sanitize');
import 'angular-socket-io';
const ngRoute = require('angular-route');
const ngMaterial = require('angular-material');
const ngAngularLoadingbar = require('angular-loading-bar')
const ngTable = require('angular-material-data-table');
const angularGrid = require('angularGrid');

// const ngMessages = require('angular-messages');
// import ngValidationMatch from 'angular-validation-match';


import {routeConfig} from './app.config';

import _Auth from '../components/auth/auth.module';
import navbar from '../components/navbar/navbar.component';
import footer from '../components/footer/footer.component';
import constants from './app.constants';
import util from '../components/util/util.module';
import socket from '../components/socket/socket.service';
import patients from './patient';
import home from './home/home.component';
import records from './records/records.component';


import './app.css';

angular.module('colmorovApp', [
  ngCookies,
  ngResource,
  ngSanitize,

  'btford.socket-io',

  ngRoute,
  ngMaterial,
  ngTable,
  ngAngularLoadingbar,
  angularGrid,

  _Auth,
  navbar,
  patients,
  home,
  records,
  footer,
  constants,
  socket,
  util
])
  .config(routeConfig)
  .run(function($rootScope, $location, Auth) {
    'ngInject';
    // Redirect to login if route requires auth and you're not logged in
    $rootScope.$on('$stateChangeStart', function(event, next) {
      Auth.isLoggedIn(function(loggedIn) {
        if(next.authenticate && !loggedIn) {
          $location.path('/login');
        }
      });
    });
  })
  .service('editarService', function() {
    'ngInject';
    this.userData = {yearSetCount: 0};

    this.user = function() {
          return this.userData;
    };

    this.setCdgev = function(cdgev) {
          this.userData.cdgev = cdgev;
    };

    this.getCdgev = function() {
          return this.userData.cdgev;
    };

    this.setCdgcl = function(cdgcl) {
          this.userData.cdgcl = cdgcl;
    };

    this.getCdgcl = function() {
          return this.userData.cdgcl;
    };

    this.setCdgclns = function(cdgclns) {
          this.userData.cdgclns = cdgclns;
    };

    this.getCdgclns = function() {
          return this.userData.cdgclns;
    };

    this.setCdgns = function(cdgns) {
          this.userData.cdgns = cdgns;
    };

    this.getCdgns = function() {
          return this.userData.cdgns;
    };

    this.setNombre = function(nombre) {
          this.userData.nombre = nombre;
    };

    this.getNombre = function() {
          return this.userData.nombre;
    };

    this.setDescripcion = function(descripcion) {
          this.userData.descripcion = descripcion;
    };

    this.getDescripcion = function() {
          return this.userData.descripcion;
    };

    this.setDireccion = function(direccion) {
          this.userData.direccion = direccion;
    };

    this.getDireccion = function() {
          return this.userData.direccion;
    };

    this.setLocalizacion = function(localizacion) {
          this.userData.localizacion = localizacion;
    };

    this.getLocalizacion = function() {
          return this.userData.localizacion;
    };

    this.setSetCount = function(setCount) {
          this.userData.yearSetCount = setCount;
    };

    this.getSetCount = function() {
          return this.userData.yearSetCount;
    };
  })
  .config(function($mdThemingProvider) {
      $mdThemingProvider.theme('default')
      .primaryPalette('pink')
      .accentPalette('orange');
});

angular
  .element(document)
  .ready(() => {
    angular.bootstrap(document, ['colmorovApp'], {
      strictDi: true
    });
  });
