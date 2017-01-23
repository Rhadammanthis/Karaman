'use strict';
const angular = require('angular');
const ngRoute = require('angular-route');
const firebase = require("firebase");
var _ = require('lodash');

import routes from './home.route';
import Base from '../../components/object/base/Base';
import TablaBase from '../../components/object/base/TablaBase';

export class HomeComponent extends TablaBase {
  $http: any;
  $location: any;
  $mdDialog: any;
  $mdMedia: any;
  $cookies: any;
  login: any = {};
  Auth: any;
  $rootScope: any;

  desserts = {
    "count": 9,
    "data": [
      {
        "name": "Frozen yogurt",
        "type": "Ice cream",
        "calories": { "value": 159.0 },
        "fat": { "value": 6.0 },
        "carbs": { "value": 24.0 },
        "protein": { "value": 4.0 },
        "sodium": { "value": 87.0 },
        "calcium": { "value": 14.0 },
        "iron": { "value": 1.0 }
      }, {
        "name": "Ice cream sandwich",
        "type": "Ice cream",
        "calories": { "value": 237.0 },
        "fat": { "value": 9.0 },
        "carbs": { "value": 37.0 },
        "protein": { "value": 4.3 },
        "sodium": { "value": 129.0 },
        "calcium": { "value": 8.0 },
        "iron": { "value": 1.0 }
      }, {
        "name": "Eclair",
        "type": "Pastry",
        "calories": { "value": 262.0 },
        "fat": { "value": 16.0 },
        "carbs": { "value": 24.0 },
        "protein": { "value": 6.0 },
        "sodium": { "value": 337.0 },
        "calcium": { "value": 6.0 },
        "iron": { "value": 7.0 }
      }, {
        "name": "Cupcake",
        "type": "Pastry",
        "calories": { "value": 305.0 },
        "fat": { "value": 3.7 },
        "carbs": { "value": 67.0 },
        "protein": { "value": 4.3 },
        "sodium": { "value": 413.0 },
        "calcium": { "value": 3.0 },
        "iron": { "value": 8.0 }
      }, {
        "name": "Jelly bean",
        "type": "Candy",
        "calories": { "value": 375.0 },
        "fat": { "value": 0.0 },
        "carbs": { "value": 94.0 },
        "protein": { "value": 0.0 },
        "sodium": { "value": 50.0 },
        "calcium": { "value": 0.0 },
        "iron": { "value": 0.0 }
      }, {
        "name": "Lollipop",
        "type": "Candy",
        "calories": { "value": 392.0 },
        "fat": { "value": 0.2 },
        "carbs": { "value": 98.0 },
        "protein": { "value": 0.0 },
        "sodium": { "value": 38.0 },
        "calcium": { "value": 0.0 },
        "iron": { "value": 2.0 }
      }, {
        "name": "Honeycomb",
        "type": "Other",
        "calories": { "value": 408.0 },
        "fat": { "value": 3.2 },
        "carbs": { "value": 87.0 },
        "protein": { "value": 6.5 },
        "sodium": { "value": 562.0 },
        "calcium": { "value": 0.0 },
        "iron": { "value": 45.0 }
      }, {
        "name": "Donut",
        "type": "Pastry",
        "calories": { "value": 452.0 },
        "fat": { "value": 25.0 },
        "carbs": { "value": 51.0 },
        "protein": { "value": 4.9 },
        "sodium": { "value": 326.0 },
        "calcium": { "value": 2.0 },
        "iron": { "value": 22.0 }
      }, {
        "name": "KitKat",
        "type": "Candy",
        "calories": { "value": 518.0 },
        "fat": { "value": 26.0 },
        "carbs": { "value": 65.0 },
        "protein": { "value": 7.0 },
        "sodium": { "value": 54.0 },
        "calcium": { "value": 12.0 },
        "iron": { "value": 6.0 }
      }
    ]
  };

  pics;
  message = "Hola";

  users = ['Fabio', 'Leonardo', 'Thomas', 'Gabriele', 'Fabrizio', 'John', 'Luis', 'Kate', 'Max'];

  public patients: any = [];

  angularGridInstance

  /*@ngInject*/
  constructor($rootScope, $scope, $cookies, $http, $location, $mdDialog, $mdMedia, Auth, angularGridInstance) {
    super($rootScope, $scope, $cookies, 'api/patients', {}, $http, 'patients');
    this.$http = $http;
    this.$location = $location;
    this.$mdDialog = $mdDialog;
    this.$mdMedia = $mdMedia;
    this.$cookies = $cookies;
    this.Auth = Auth;
    this.angularGridInstance = angularGridInstance;
    this.$rootScope = $rootScope;

    this.setTitle('Karaman');
  }


  $onInit() {
    this.setToolbarMode(2);
    var _this = this;
    super.$onInit();
    this.initCallback();

    // Initialize Firebase
    // TODO: Replace with your project's customized code snippet
    var config = {
      apiKey: "AIzaSyD3oAIor2nYstgPRZulPxYIkky8cHlwEW4",
      authDomain: "colmorov.firebaseapp.com",
      databaseURL: "https://colmorov.firebaseio.com",
      storageBucket: "colmorov.appspot.com",
      messagingSenderId: "682480538484"
    };

    if (firebase.apps.length === 0) {
      firebase.initializeApp(config);
    }


    this.on(function (respuesta) {
      console.log('Primeros datos listos', respuesta);
    });
  }

  public initCallback() {
    var _this = this;
    this.setReadyF(function (result) {
      console.log('Siguiente ready', result);
    });
    this.setErrorF(function (error) {
      console.log('Siguiente error', error);
    });
    this.setSelectF(function (item) {
      console.log('Selected', item);
      this.$cookies.put('patient', JSON.stringify(item));
      _this.$location.path('/records');
    })
  }
}


export default angular.module('colmorovApp.adminlogin', [ngRoute])
  .config(routes)
  .component('home', {
    template: require('./home.html'),
    css: require('./home.css'),
    controller: HomeComponent,
    controllerAs: 'hmc'
  })
  .name;