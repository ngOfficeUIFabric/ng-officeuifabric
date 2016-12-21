'use strict';

var demoApp = angular.module('demoApp', [
  'officeuifabric.core',
  'officeuifabric.components.messagebanner'
]);

demoApp.controller('messageBannerDemoController', ['$scope', messageBannerDemoController]);

function messageBannerDemoController($scope) {
  $scope.customFunction = function () {
    alert('this is a test message');
  };

  $scope.customCloseFunction = function () {
    alert('message banner closed');
  };

  $scope.vm = {
    bannerToggle: true,
    label: 'test button'
  };
}

