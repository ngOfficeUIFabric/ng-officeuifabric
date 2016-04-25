'use strict';

var demoApp = angular.module('demoApp', [
  'officeuifabric.core',
  'officeuifabric.components.messagebanner'
]);

demoApp.controller('messageBannerDemoController', ['$scope', '$log', '$window', messageBannerDemoController]);

function messageBannerDemoController($scope, $log, $window) {
  $scope.customFunction = function () {
    alert('this is a test message');
  }

  $scope.customCloseFunction = function () {
    alert('message banner closed');
  }

  $scope.vm = {
    bannerToggle: true,
    label: 'test button'
  }
}

