'use strict';
const angular = require('angular');
const ngRoute = require('angular-route');
const firebase = require('firebase');

import routes from './records.route';
import Base from '../../components/object/base/Base';
import TablaBase from '../../components/object/base/TablaBase';

export class HomeComponent extends Base {
  $http: any;
  $location: any;
  $mdDialog: any;
  $mdMedia: any;
  $cookies: any;
  $rootScope: any;

  patient;
  background;
  dataChanged: boolean = false;
  dateOfBirth;

  states = ('Aguascalientes+Baja California+Baja California Sur+Campeche+Chiapas+Chihuahua+Coahuila+Colima+CDMX+Durango+Guanajuato+Guerrero' +
  '+Hidalgo+Jalisco+Estado de México+Michoacan+Morelos+Nayarit+Nuevo León+Oaxaca+Puebla+Queretaro+Quintana Roo+San Luis Potosí+' +
    'Sinaloa+Sonora+Tabasco+Tamaulipas+Tlaxcala+Veracruz+Yucatán+Zacatecas').split('+').map(function (state) {
      return { abbrev: state };
    });

  /*@ngInject*/
  constructor($rootScope, $scope, $cookies, $http, $location, $mdDialog, $mdMedia, Auth) {
    super($rootScope);
    this.$http = $http;
    this.$location = $location;
    this.$mdDialog = $mdDialog;
    this.$mdMedia = $mdMedia;
    this.$cookies = $cookies;
    this.$rootScope = $rootScope;

    this.setTitle('Expediente Médico');
  }


  $onInit() {
    this.setToolbarMode(5);
    super.$onInit();

    this.patient = JSON.parse(this.$cookies.get('patient'));
    console.log(this.patient.dateOfBirth);
    this.dateOfBirth = new Date(this.patient.dateOfBirth);
    console.log(this.dateOfBirth);

    delete this.patient.$$hashKey;
    console.log(this.patient);
    console.log(this.patient.background.familiar);
    console.log(this.patient.background.perinatal);
  }

  updatePatient(uid) {
    const _this = this;
    // delete _this.patient.$$hashKey;
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        firebase.database().ref(`/users/${user.uid}/patients/${uid}`)
          .set(_this.patient)
          .then(() => {
            _this.showAlert('Paciente actualizado correctamente');
          })
      }
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


export default angular.module('colmorovApp.records', [ngRoute])
  .config(routes)
  .component('records', {
    template: require('./records.html'),
    controller: HomeComponent,
    controllerAs: 'rdc'
  })
  .name;