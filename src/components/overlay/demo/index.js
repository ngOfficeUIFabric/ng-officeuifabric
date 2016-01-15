'use strict';

var demoApp = angular.module('demoApp', [
  'officeuifabric.core',
  'officeuifabric.components.overlay'
]);

demoApp.controller('demoController', [
  '$scope', demoController]);

function demoController($scope) {
    $scope.vm = { overlayMode: 'light' };
}