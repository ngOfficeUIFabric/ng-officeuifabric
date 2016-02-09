(function () {
  'use strict';

  var demoApp = angular.module('demoApp', [
    'officeuifabric.core',
    'officeuifabric.components.navbar'
  ]);

  demoApp.controller('demoController', [
    '$scope', demoController]);

  function demoController($scope) {
    $scope.isOpen = true;
    $scope.colors = ['Green', 'Yellow', 'Red', 'White', 'Blue'];

    $scope.logColor = function (color) {
      console.log(color);
    }

    $scope.logClick = function (logData) {
      console.log(logData);
    }

    $scope.onSearch = function (search) {
      alert('You searched for "' + search + '"');
    }
  }
})();