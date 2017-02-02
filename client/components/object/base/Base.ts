'use strict'

const firebase = require('firebase');

/**
 * @class Clase base que ayuda a realizar las funciones bases de cualquier pagina web
 */
export default class Base {

    /**
     * @field _$rootScope
     */
    public _$rootScope: any;

    /**
     * @constructor 
     * @param _$rootScope
     */
    constructor($rootScope: any) {
        'ngInject';
        this._$rootScope = $rootScope;
    }

    $onInit() {
        var config = {
            apiKey: "AIzaSyD3oAIor2nYstgPRZulPxYIkky8cHlwEW4",
            authDomain: "colmorov.firebaseapp.com",
            databaseURL: "https://colmorov.firebaseio.com",
            storageBucket: "colmorov.appspot.com",
            messagingSenderId: "682480538484"
        };

        if (firebase.apps.length === 0) {
            firebase.initializeApp(config);
        }
    }

    /**
     * Agrega el titulo al toolbar
     * @param title
     * @type String
     */
    public setTitle(title: String) {
        this._$rootScope.title = title;
    }

    /**
     * Activa el toolbar adecuado para la pagina
     * @param mode
     * @type ModeToolbar
     */
    public setModeToolbar(mode: ModeToolbar) {
        this._$rootScope.show = mode;
    }

    /**
     * Seleccionar el menu tipo acreditado/cliente
     */
    public setMenuCl() {
        this._$rootScope.menu = 'cl';
    }

    /**
     * Seleccionar el menu tipo apersonal empresa
     */
    public setMenuPe() {
        this._$rootScope.menu = 'pe';
    }

    /**
     * Sets the toolbar mode to use
     */
    public setToolbarMode(mode) {
        this._$rootScope.toolbarMode = mode;
    }

    public setFirstToolbarAction(action) {
        this._$rootScope.toolbarAction = action;
    }

    public setSecondToolbarAction(action) {
        this._$rootScope.secondToolbarAction = action;
    }

    public setGenericNavigationLocation(location){
        this._$rootScope.genericNavigation = location;
    }

}

/**
 * @class Enum que permite saber el Modo del Tolbar a mostar
 */
export const enum ModeToolbar {
    /**
     * Ocultar el toolbar
     */
    OFF = 0,
    /**
     * Mostrar el toolbar simple
     */
    NORMAL = 1
}