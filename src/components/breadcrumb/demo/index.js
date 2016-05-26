'use strict';

var demoApp = angular.module('demoApp', [
  'officeuifabric.core',
  'officeuifabric.components.breadcrumb'
]);

demoApp.controller('demoCtrl', ['$scope', function ($scope) {
  $scope.links = [
      {href: 'http://github1.com', linkText: 'GitHub1'},
      {href: 'http://github2.com', linkText: 'GitHub2'},
      {href: 'http://github3.com', linkText: 'GitHub3'},
      {href: 'http://github4.com', linkText: 'GitHub4'},
      {href: 'http://github5.com', linkText: 'GitHub5'},
      {href: 'http://github6.com', linkText: 'GitHub6'}
    ];
}]);