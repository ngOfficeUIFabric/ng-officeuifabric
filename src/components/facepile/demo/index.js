'use strict';

var demoApp = angular.module('demoApp', [
  'officeuifabric.core',
  'officeuifabric.components.facepile'
])
  .directive('raw', ['$sce', function ($sce) {
    var directive = {
      replace: true,
      scope: {
        src: '='
      },
      template: '<pre class="code" ng-bind-html="data"></pre>',
      restrict: 'E',
      link: function (scope, element) {
        var template = angular.element(document.getElementById(scope.src));
        scope.data = $sce.trustAsHtml(element.text(template.html()).html());
      }
    };

    return directive;
  }]);


demoApp.controller('demoAppController', [
  '$scope', demoAppController]);

function demoAppController($scope) {

  var defaultPeople = JSON.parse(JSON.stringify(window.demo.people));
  var membersList = JSON.parse(JSON.stringify(window.demo.membersList));
  var peoplePickerList = JSON.parse(JSON.stringify(window.demo.membersList));

  $scope.BasicMembers = membersList;
  $scope.PeoplePickerMembers = peoplePickerList;

  $scope.onFacePileSearch = function () {
    return defaultPeople;
  };
}
