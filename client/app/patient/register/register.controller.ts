'use strict'

const angular = require('angular');
const firebase = require('firebase');
const moment = require('moment');

import Base from '../../../components/object/base/Base';

class RegisterPatientController extends Base {

    $http = null;
    $location = null;
    $mdDialog: any;
    $cookies: any;

    userData: any = {};
    signingUp: boolean = false;

    currentUser: any = {};

    passwordC: string;
    Auth: any;
    Crypto: any;

    patient: any = {};

    dateOfBirth = new Date();

    states = ('Aguascalientes+Baja California+Baja California Sur+Campeche+Chiapas+Chihuahua+Coahuila+Colima+CDMX+Durango+Guanajuato+Guerrero' +
        '+Hidalgo+Jalisco+Estado de México+Michoacan+Morelos+Nayarit+Nuevo León+Oaxaca+Puebla+Queretaro+Quintana Roo+San Luis Potosí+' +
        'Sinaloa+Sonora+Tabasco+Tamaulipas+Tlaxcala+Veracruz+Yucatán+Zacatecas').split('+').map(function (state) {
            return { abbrev: state };
        });

    constructor($rootScope, $http, $location, $mdDialog, Auth, $cookies, Crypto) {

        super($rootScope);

        this.$http = $http;
        this.$location = $location;
        this._$rootScope = $rootScope;
        this.$mdDialog = $mdDialog;
        this.Auth = Auth;
        this.Crypto = Crypto;
        this.$cookies = $cookies;

        this.setTitle('Regresar');

    }

    $onInit() {
        this.setToolbarMode(1);
        super.$onInit();
    }

    registerNewPatient() {
        var _this = this;

        this.patient.dateOfBirth = this.dateOfBirth.getTime();
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                firebase.database().ref(`/users/${user.uid}/patients`)
                    .push(_this.patient)
                    .then(() => {
                        _this.showAlert();
                        console.log('Created!')
                    });
            }
            else {
                // No user is signed in.
                // fun('Se ha producido un error');
            }
        });

        // firebase.database().ref(`/users/6a32AMsmWqfbxAyJoDXDa1JLUYp1/patients`)
        //     .push(this.patient)
        //     .then(() => {
        //         _this.showAlert();
        //         console.log('Created!')
        //     });
    }

    showAlert = function () {
        var _this = this;
        this.$mdDialog.show(
            _this.$mdDialog.alert()
                .parent(angular.element(document.querySelector('#popupContainer')))
                .clickOutsideToClose(true)
                .title('Se ha agregado al nuevo paciente exitosamente')
                .ariaLabel('Alert Dialog Demo')
                .ok('Aceptar')
        );
    };

}

export default angular.module('colmorovApp.registerPatient', [])
    .component('registerPatient', {
        template: require('./register.html'),
        // css: require('./signup.css'),
        controller: RegisterPatientController,
        controllerAs: 'rpc'
    })
    .name;