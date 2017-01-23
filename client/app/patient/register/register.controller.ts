'use strict'

const angular = require('angular');
const Firebase = require('firebase');
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

    states = ('Ags. B.C. B.C.S. Camp. Chis. Chih. Coah. Col. CDMX Dgo. Gto. Gro. Hgo. Jal. Edomex. Mich. Mor. Nay. N.L. Oax. Pue. Qro. Q.R. S.L.P. ' +
        'Sin. Son. Tab. Tamps. Tlax. Ver. Yuc. Zac.').split(' ').map(function (state) {
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
    }

    registerNewPatient() {
        var _this = this;
        // this.$http.post('api/patients/new', this.patient).then(function (result) {
        //     if (result) {
        //         _this.showAlert(result);
        //     }
        // });

        // Firebase.auth().signInWithEmailAndPassword('hugo@hugo.com', 'Idspispopd9')
        //     .then(user => {
        //         console.log('User auth!');
        //         Firebase.database().ref(`/users/6a32AMsmWqfbxAyJoDXDa1JLUYp1/patients`)
        //             .push(this.patient)
        //             .then(() => {
        //                 console.log('Created!')
        //             });
        //     })
        //     .catch((error) => {
        //         console.log(error);

        //         // firebase.auth().createUserWithEmailAndPassword(email, password)
        //         //     .then(user => loginUserSucces(dispatch, user))
        //         //     .catch(() => loginUserFailed(dispatch));
        //     });

        this.patient.dateofBirth = moment(this.dateOfBirth).format('DD-MM-YYYY');
        Firebase.database().ref(`/users/6a32AMsmWqfbxAyJoDXDa1JLUYp1/patients`)
            .push(this.patient)
            .then(() => {
                _this.showAlert(result);
                console.log('Created!')
            });
    }

    showAlert = function (ev) {
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