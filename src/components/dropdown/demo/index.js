'use strict';

var demoApp = angular.module('demoApp', [
  'officeuifabric.core',
  'officeuifabric.components.dropdown'
]);

demoApp.controller('demoController', [
    '$scope', demoController]);

function demoController($scope) {
    $scope.values = {
      'round': 'Round',
      'square': 'Square'
    };
    $scope.value = 'round';
};