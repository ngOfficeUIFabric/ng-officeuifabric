'use strict';

var demoApp = angular.module('demoApp', [
  'officeuifabric.core',
  'officeuifabric.components.breadcrumb'
]);

demoApp.controller('demoCtrl', ['$scope', function ($scope) {
  $scope.items = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
}]);