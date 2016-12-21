(function () {
  'use strict';

  var demoApp = angular.module('demoApp', [
    'officeuifabric.core',
    'officeuifabric.components.contextualmenu'
  ]);

  demoApp.controller('demoController', [
    '$scope', demoController]);

  function demoController($scope) {
    $scope.isOpen = true;
    $scope.colors = ['Green', 'Yellow', 'Red', 'White', 'Blue'];

    $scope.logColor = function (color) {
      console.log(color);
    };
  }
})();
