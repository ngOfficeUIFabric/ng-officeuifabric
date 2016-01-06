'use strict';

var demoApp = angular.module('demoApp', [
  'officeuifabric.core',
  'officeuifabric.components.spinner'
]);

demoApp.controller('spinnerDemoController',['$scope', spinnerDemoController]);

function spinnerDemoController($scope){
  $scope.vm = {
    spinnerVisible: false
  };
}