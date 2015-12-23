'use strict';

var demoApp = angular.module('demoApp', [
  'officeuifabric.core',
  'officeuifabric.components.searchbox'
]);

demoApp.controller('demoController', [
  '$scope', demoController]);

function demoController($scope) {
    $scope.placeholder = "Placeholder text";
    $scope.value= "search keyword"
}