'use strict';
const angular = require('angular');
const ngRoute = require('angular-route');


import routes from './records.route';
import Base from '../../components/object/base/Base';
import TablaBase from '../../components/object/base/TablaBase';

export class HomeComponent extends Base{
  $http: any;
	$location: any;
	$mdDialog: any;
	$mdMedia: any;
  $cookies: any;
	login: any = {};
	Auth: any;
	$rootScope: any;

  patient;

  /*@ngInject*/
  constructor($rootScope, $scope, $cookies, $http, $location, $mdDialog, $mdMedia, Auth) {
    super($rootScope);
    this.$http = $http;
    this.$location = $location;
    this.$mdDialog = $mdDialog;
    this.$mdMedia = $mdMedia;
    this.$cookies = $cookies;
	this.Auth = Auth;
	this.$rootScope = $rootScope;

    this.setTitle('Expediente Médico');
  }


    $onInit(){
      this.setToolbarMode(1);

      this.patient = JSON.parse(this.$cookies.get('patient'));

      console.log(this.patient);
    }
}


export default angular.module('colmorovApp.records', [ngRoute])
  .config(routes)
  .component('records', {
    template: require('./records.html'),
    controller: HomeComponent,
    controllerAs: 'rdc'
  })
  .name;