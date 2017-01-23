'use strict';
const angular = require('angular');
const ngRoute = require('angular-route');
const firebase = require("firebase");

import routes from './login.route';
import Base from '../../components/object/base/Base';
import TablaBase from '../../components/object/base/TablaBase';

export class LoginComponent extends Base {
  $http: any;
  $location: any;
  $mdDialog: any;
  $mdMedia: any;
  $cookies: any;
  $rootScope: any;
  $route
  userData: any = {};
  attemptingLogIn: boolean = false;


  /*@ngInject*/
  constructor($rootScope, $scope, $cookies, $http, $location, $mdDialog, $mdMedia, $route, Auth, angularGridInstance) {
    super($rootScope);
    this.$http = $http;
    this.$location = $location;
    this.$mdDialog = $mdDialog;
    this.$mdMedia = $mdMedia;
    this.$cookies = $cookies;
    this.$rootScope = $rootScope;
    this.$route = $route;

    this.setTitle('Karaman');
  }


  $onInit() {
    this.setToolbarMode(4);
    super.$onInit();
    var _this = this;

    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        // User is signed in.
        console.log(user)
        _this.$route.reload();
        _this.$location.path('/home');
        
      } else {
        // No user is signed in.
      }
    });

  }

  atemptLogin(event) {
    console.log(this.userData)
    this.attemptingLogIn = true;
    const _this = this;
    firebase.auth().signInWithEmailAndPassword(this.userData.email, this.userData.password)
      .then(user => {
        console.log("Succe!")
        console.log(user);
        _this.attemptingLogIn = false;
        _this.$route.reload();
        _this.$location.path('/home');
        // console.log(user)
      })
      .catch((error) => {
        console.log(error);
        console.log('I am error')
        _this.showAlert("Nombre o contraseña incorrectos");
      });
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


export default angular.module('colmorovApp.login', [ngRoute])
  .config(routes)
  .component('login', {
    template: require('./login.html'),
    css: require('./login.css'),
    controller: LoginComponent,
    controllerAs: 'lgc'
  })
  .name;