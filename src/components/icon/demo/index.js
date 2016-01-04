'use strict';

var demoApp = angular.module('demoApp', [
  'officeuifabric.core',
  'officeuifabric.components.icon'
]);

demoApp.controller('demoController', [
  '$scope', demoController]);

function demoController($scope) {
  $scope.icons = [
    { id: 'arrowDownLeft', name: 'arrow down left' },
    { id: 'circleEmpty', name: 'circle empty' },
    { id: 'circleFill', name: 'circle fill' },
    { id: 'plus', name: 'plus' },
    { id: 'minus', name: 'minus' },
    { id: 'question', name: 'question' }
  ];
  $scope.selectedIcon = $scope.icons[3];
}