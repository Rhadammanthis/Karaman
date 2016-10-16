'use strict';
const angular = require('angular');
const ngRoute = require('angular-route');


import routes from './home.route';
import Base from '../../components/object/base/Base';
import TablaBase from '../../components/object/base/TablaBase';

export class HomeComponent extends TablaBase{
  $http: any;
	$location: any;
	$mdDialog: any;
	$mdMedia: any;
	login: any = {};
	Auth: any;
	$rootScope: any;

  pics;
  message = "Hola";

  users = ['Fabio', 'Leonardo', 'Thomas', 'Gabriele', 'Fabrizio', 'John', 'Luis', 'Kate', 'Max'];

  angularGridInstance

  /*@ngInject*/
  constructor($rootScope, $scope, $cookies, $http, $location, $mdDialog, $mdMedia, Auth, angularGridInstance) {
    super($rootScope,$scope,$cookies,'api/patients',{},$http,'patients');
    this.$http = $http;
    this.$location = $location;
    this.$mdDialog = $mdDialog;
    this.$mdMedia = $mdMedia;
	this.Auth = Auth;
    this.angularGridInstance = angularGridInstance;
	this.$rootScope = $rootScope;
  }


    $onInit(){
      this.setToolbarMode(2);
      var _this = this;
      super.$onInit();
      this.initCallback();
      this.on(function(respuesta){
        console.log('Primeros datos listos',respuesta);
      });
    }

    public initCallback(){
      this.setReadyF(function(result){
        console.log('Siguiente ready',result);
      });
      this.setErrorF(function(error){
        console.log('Siguiente error',error);
      });
      this.setSelectF(function(item){
        console.log('Siguiente item',item);
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