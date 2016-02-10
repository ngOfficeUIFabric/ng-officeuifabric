'use strict';

var demoApp = angular.module('demoApp', [
  'officeuifabric.core',
  'officeuifabric.components.datepicker'
]);

demoApp.controller('demoController', [
  '$scope', demoController]);

function demoController($scope) {   
    $scope.value = new Date(2016, 3, 2);
    $scope.vvv = "XXX";
}