'use strict';

var demoApp = angular.module('demoApp', [
  'officeuifabric.core',
  'officeuifabric.components.pivot',
]).controller('pivotController', ['$scope', pivotController]);

function pivotController($scope) {
  $scope.vm = {
    pivots: [
      {title: "My files"},
      {title: "Recent"},
      {title: "Shared with me"}
    ]
  };
}