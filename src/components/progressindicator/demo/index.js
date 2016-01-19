'use strict';

var demoApp = angular.module('demoApp', [
  'officeuifabric.core',
  'officeuifabric.components.progressindicator'
]);

demoApp.controller('demoController', [
  '$scope', demoController]);

function demoController($scope) {
    $scope.vm = {
        name: 'MyDocument.docx',
        description: 'This is a sample document.',
        percentComplete: 25 };
}