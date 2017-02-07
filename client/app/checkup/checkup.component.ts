'use strict';
const angular = require('angular');
const ngRoute = require('angular-route');
const firebase = require("firebase");
const moment = require("moment");
var _ = require('lodash');

import routes from './checkup.route';
import Base from '../../components/object/base/Base';
import TablaBase from '../../components/object/base/TablaBase';

export class CheckupComponent extends Base {
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

    this.setTitle('Consulta');

    this.tempCheckup = {};
    
  }

  processPatientData(){
    this.patientAge = Math.abs(new Date( Date.now() - this.patient.dateOfBirth).getUTCFullYear() - 1970);
    console.log(this.patientAge);
  }


  $onInit() {
    this.setToolbarMode(0);
    super.$onInit();
    this.todaysDate = Date.now();
    const _this = this;

    this.patient = JSON.parse(this.$cookies.get('patient'));
    if(this.patient){
      this.patientAge = Math.abs(new Date( Date.now() - this.patient.dateOfBirth).getUTCFullYear() - 1970);
    }

    //Save checkup in the online DB
    this.setFirstToolbarAction(function(){
      console.log(_this.tempCheckup);
      const prescription = _this.$cookies.get('prescription')
      if(!prescription)
        _this.showAlert('Necesitas completar una receta');
      else
        _this.showAlert('Informacion guardada')
    })

    //Go to Prescription
    this.setSecondToolbarAction(function(){
      // this.$cookies.put('patient', JSON.stringify(this.patient));
      // var checkup = {}
      _this.tempCheckup.patient = _this.patient;
      console.log(_this.tempCheckup);
      _this.$cookies.put('checkup', JSON.stringify(_this.tempCheckup) );
      _this.$location.path('/prescription')
    })

    this.tempCheckup = JSON.parse(this.$cookies.get('checkup'));

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



  // atemptLogin(event) {
  //   console.log(this.userData)
  //   this.attemptingLogIn = true;
  //   const _this = this;
  //   firebase.auth().signInWithEmailAndPassword(this.userData.email, this.userData.password)
  //     .then(user => {
  //       console.log("Succe!")
  //       console.log(user);
  //       _this.attemptingLogIn = false;
  //       _this.$route.reload();
  //       _this.$location.path('/home');
  //       // console.log(user)
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       console.log('I am error')
  //       _this.showAlert("Nombre o contraseña incorrectos");
  //     });
  // }

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


export default angular.module('colmorovApp.checkup', [ngRoute])
  .config(routes)
  .component('checkup', {
    template: require('./checkup.html'),
    css: require('./checkup.css'),
    controller: CheckupComponent,
    controllerAs: 'cuc'
  })
.directive('moDateInput', function ($window) {
    return {
        require:'^ngModel',
        restrict:'A',
        link:function (scope, elm, attrs, ctrl) {
            // var moment = $window.moment;
            var dateFormat = attrs.moDateInput;
            attrs.$observe('moDateInput', function (newValue) {
                if (dateFormat == newValue || !ctrl.$modelValue) return;
                dateFormat = newValue;
                ctrl.$modelValue = new Date(ctrl.$setViewValue);
            });

            ctrl.$formatters.unshift(function (modelValue) {
                // if (!dateFormat || !modelValue) return "";
                // var retVal = moment(modelValue).format(dateFormat);
                console.log(+modelValue)
                console.log(new Date(modelValue))
                return new Date(modelValue);
            });

            ctrl.$parsers.unshift(function (viewValue) {
                var date = moment(viewValue, dateFormat);
                return (date && date.isValid() && date.year() > 1950 ) ? date.toDate() : "";
            });
        }
    };
})
.name;