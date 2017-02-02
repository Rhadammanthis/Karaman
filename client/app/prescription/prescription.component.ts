'use strict';
const angular = require('angular');
const ngRoute = require('angular-route');
const firebase = require("firebase");
const moment = require("moment");
var _ = require('lodash');

import routes from './prescription.route';
import Base from '../../components/object/base/Base';
import TablaBase from '../../components/object/base/TablaBase';

export class PrescriptionComponent extends Base {
  $http: any;
  $location: any;
  $mdDialog: any;
  $mdMedia: any;
  $cookies: any;
  $rootScope: any;
  $route
  $q;
  patients;
  patient = null;
  todaysDate;
  patientAge;
  tempCheckup;
  data;
  pageM = 1;
  pageF = 1;
  selected = [];

  /*@ngInject*/
  constructor($rootScope, $scope, $cookies, $http, $location, $mdDialog, $mdMedia, $route, $q, Auth, angularGridInstance) {
    super($rootScope);
    this.$http = $http;
    this.$location = $location;
    this.$mdDialog = $mdDialog;
    this.$mdMedia = $mdMedia;
    this.$cookies = $cookies;
    this.$rootScope = $rootScope;
    this.$route = $route;
    this.$q = $q;
    this.tempCheckup = {};

    this.setTitle('Receta');
  }

  processPatientData(){
    this.patientAge = Math.abs(new Date( Date.now() - this.patient.dateOfBirth).getUTCFullYear() - 1970);
    console.log(this.patientAge);
  }


  $onInit() {
    this.setToolbarMode(6);
    super.$onInit();
    this.setGenericNavigationLocation('checkup');

    this.data = {
      "count": 8,
      treatments:[
        {
          "name":"Gripa",
          "tecnique": "Comer muchas fresas"
        },
        {
          "name":"Tos",
          "tecnique": "Te con miel de abeja"
        },
        {
          "name":"Diarrea",
          "tecnique": "Comer muchas fresas"
        },
        {
          "name":"Dolor de cabeza",
          "tecnique": "Te con miel de abeja"
        },
        {
          "name":"Tuberculosis",
          "tecnique": "Comer muchas fresas"
        },
        {
          "name":"Polio",
          "tecnique": "Te con miel de abeja"
        },
        {
          "name":"SIDA",
          "tecnique": "Comer muchas fresas"
        },
        {
          "name":"Cancer",
          "tecnique": "Te con miel de abeja"
        }
      ],
      meds:[
        {
          "name": "Prozac",
          "dosage": "10 pills"
        },
        {
          "name": "Nyquil",
          "dosage": "1 pill"
        }
      ]

    };

    // this.$watch('mydateOfBirth', function (newValue) {
    //   _this.patient.dateOfBirth = _this.$filter('date')(newValue, 'dd/MM/yyyy'); 
    // });

    // firebase.auth().onAuthStateChanged(function (user) {
    //   if (user) {
    //     // User is signed in.
    //     console.log(user)
    //     _this.$route.reload();
    //     _this.$location.path('/home');

    //   } else {
    //     // No user is signed in.
    //   }
    // });


  }

  logItem = function (item) {
    console.log(item.name, 'was selected');
  };

  loadPatients = function () {
      const _this = this;
      const deferred = this.$q.defer();
      firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
          firebase.database().ref(`/users/${user.uid}/patients`)
            .once('value').then(snapshot => {
              _this.patients = _.map(snapshot.val(), (val, index) => {
                var newVal = val;
                newVal.uid = index;
                return newVal;
              });
              console.log(_this.patients);
              deferred.resolve();
            });
        } 
      });
      return deferred.promise;
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


export default angular.module('colmorovApp.prescription', [ngRoute])
  .config(routes)
  .component('prescription', {
    template: require('./prescription.html'),
    css: require('./prescription.css'),
    controller: PrescriptionComponent,
    controllerAs: 'cuc'
  })
.name;