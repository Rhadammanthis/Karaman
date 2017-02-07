'use strict';
const angular = require('angular');
const ngRoute = require('angular-route');
const firebase = require("firebase");
const moment = require("moment");
var _ = require('lodash');

import routes from './prescription.route';
import Base from '../../components/object/base/Base';
import TablaBase from '../../components/object/base/TablaBase';

class PrescriptionComponent extends Base {
  $http: any;
  $location: any;
  $mdDialog: any;
  $mdMedia: any;
  $cookies: any;
  $rootScope: any;
  $route
  $scope;
  patients;
  patient = null;
  todaysDate;
  patientAge;
  data;
  pageM = 1;
  pageF = 1;
  selected = [];
  prescription = ""
  lol = "value..."

  /*@ngInject*/
  constructor($rootScope, $scope, $cookies, $http, $location, $mdDialog, $mdMedia, $route) {
    super($rootScope);
    this.$http = $http;
    this.$location = $location;
    this.$mdDialog = $mdDialog;
    this.$mdMedia = $mdMedia;
    this.$cookies = $cookies;
    this.$rootScope = $rootScope;
    this.$route = $route;
    this.$scope = $scope;

    this.prescription = "";

    this.setTitle('Receta');
  }

  addToPrescription(item){
    console.log(item)
    this.prescription += item.name + '\n' + item.body + '\n\n'
  }

  $onInit() {
    this.setToolbarMode(7);
    super.$onInit();
    this.setGenericNavigationLocation('checkup');

    const _this = this;

    this.setFirstToolbarAction(function(){
      console.log('guardar')
      _this.$cookies.put('prescription', _this.prescription );
      _this.showAlert('Receta guardada correctamente');
    })

    this.prescription = this.$cookies.get('prescription');

    this.data = {
      "count": 8,
      treatments:[
        {
          "name":"Gripa",
          "body": "Comer muchas fresas"
        },
        {
          "name":"Tos",
          "body": "Te con miel de abeja"
        },
        {
          "name":"Diarrea",
          "body": "Comer muchas fresas"
        },
        {
          "name":"Dolor de cabeza",
          "body": "Te con miel de abeja"
        },
        {
          "name":"Tuberculosis",
          "body": "Comer muchas fresas"
        },
        {
          "name":"Polio",
          "body": "Te con miel de abeja"
        },
        {
          "name":"SIDA",
          "body": "Comer muchas fresas"
        },
        {
          "name":"Cancer",
          "body": "Te con miel de abeja"
        }
      ],
      meds:[
        {
          "name": "Prozac",
          "body": "10 pills"
        },
        {
          "name": "Nyquil",
          "body": "1 pill"
        },
        {
          "name": "Tylenol",
          "body": "1 pill"
        },
        {
          "name": "Aderall",
          "body": "1 pill"
        },
        {
          "name": "Xanax",
          "body": "1 pill"
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
    controllerAs: 'ptc'
  })
.name;