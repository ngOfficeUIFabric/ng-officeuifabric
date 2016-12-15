'use strict';

var demoApp = angular.module('demoApp', [
  'officeuifabric.core',
  'officeuifabric.components.textfield'
]);

demoApp.controller('demoController', ['$scope', demoController]);

function demoController($scope) {
  $scope.fieldType = 'text';

  $scope.switchToPassword = function(){
    $scope.fieldType = 'password';
  };
  $scope.switchToText = function(){
    $scope.fieldType = 'text';
  };
}
