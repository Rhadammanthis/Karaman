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

  pics;
  message = "Hola";

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

    this.$cookies.remove('patient');

    this.on(error => {
      _this.showAlert(error);
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

  showAlert = function (text) {
    this.attemptingLogIn = false;
    var _this = this;
    this.$mdDialog.show(
      _this.$mdDialog.alert()
        .parent(angular.element(document.querySelector('#popupContainer')))
        .clickOutsideToClose(true)
        .title(text)
        .ariaLabel('Alert Dialog Demo')
        .ok('Aceptar')
    );
  };
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