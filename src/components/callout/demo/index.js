'use strict';

var demoApp = angular.module('demoApp', [
  'officeuifabric.core',
  'officeuifabric.components.callout'
]);

demoApp.controller('calloutDemoController',['$scope', '$timeout', calloutDemoController]);

function calloutDemoController($scope, $timeout){
  $scope.vm = {
    firstVisible : false,
    secondVisible: false,
    thirdVisible: false
  };

  $scope.toggleClick = function(){
    $scope.vm.secondVisible = !$scope.vm.secondVisible;
  };

  $scope.thirdToggleClick = function(){
    $timeout(function(){
      $scope.vm.thirdVisible = !($scope.vm.thirdVisible);
    }, 1000);
  };
}
