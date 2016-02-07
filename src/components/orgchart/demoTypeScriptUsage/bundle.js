/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var ng = __webpack_require__(1);
	var DemoController = (function () {
	    function DemoController() {
	        this.items = [
	            { name: "Luke Skywalker", firstname: "Luke", title: "Hero", presence: "available", department: "Good guys", imageUrl: "Persona.Person2.png" },
	            { name: "Darth Vader", firstname: "Darth", title: "Right hand", presence: "busy", department: "Bad guys", imageUrl: "Persona.Person2.png" },
	            { name: "Han Solo", firstname: "Han", title: "Hero", presence: "away", department: "Good guys", imageUrl: "Persona.Person2.png" },
	            { name: "Mr. Emperor", firstname: "Emperor", title: "Emperor Supreme", presence: "blocked", department: "Bad guys", imageUrl: "Persona.Person2.png" }
	        ];
	        this.selected1 = [];
	        this.selected2 = [];
	        this.groupby = 'department';
	        this.namefield = 'name';
	        this.titlefield = 'title';
	        this.imagefield = 'imageUrl';
	        this.presencefield = 'presence';
	    }
	    ;
	    DemoController.prototype.ShowSelected = function () {
	        alert(this.selected1.length);
	    };
	    DemoController.prototype.ShowPerson = function (person) {
	        alert("You selected: " + person.name);
	    };
	    return DemoController;
	})();
	exports.DemoController = DemoController;
	exports.module = ng.module('demoApp', [
	    'officeuifabric.core',
	    'officeuifabric.components.orgchart'])
	    .controller('demoController', [DemoController]);


/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = angular;

/***/ }
/******/ ]);