'use strict';

var demoApp = angular.module('demoApp', [
  'officeuifabric.core',
  'officeuifabric.components.choicefield'
]);

demoApp.controller('demoController', [
  '$scope', function ($scope) {
    $scope.selectedValue2 = '';
    $scope.changed = false;
    $scope.change = function () {
      $scope.changed = true;
    };

    $scope.choiceFieldType = 'radio';
    $scope.switchToRadio = function () {
      $scope.choiceFieldType = 'radio';
    };
    $scope.switchToCheckbox = function () {
      $scope.choiceFieldType = 'checkbox';
    };
  }]);

