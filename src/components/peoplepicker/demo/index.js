(function () {
  'use strict';

  angular.module('demo', [
    'officeuifabric.core',
    'officeuifabric.components.peoplepicker',
    'ngSanitize'
  ])
    .directive('raw', ['$sce', function ($sce) {
      var directive = {
        replace: true,
        scope: {
          src: '='
        },
        template: '<pre class="code" ng-bind-html="data"></pre>',
        restrict: 'E',
        link: function (scope, element, attrs, controller, $transclude) {
          var template = angular.element(document.getElementById(scope.src));
          scope.data = $sce.trustAsHtml(element.text(template.html()).html());
        }
      };

      return directive;
    }]);

  angular.module('regularSample', ['demo'])
    .controller('demoController',
    ['$scope', '$q', '$filter', '$timeout', function ($scope, $q, $filter, $timeout) {

      var getPeople = function (people, searchQuery) {
        if (!searchQuery) {
          return [];
        }
        console.log("Searching for " + searchQuery);

        return people;
      }

      $scope.disabled = true;
      $scope.connected = false;

      var defaultPeople = JSON.parse(JSON.stringify(window.demo.people));
      $scope.selectedPeopleDefault = [];
      var compactPeople = JSON.parse(JSON.stringify(window.demo.people));
      $scope.selectedPeopleCompact = [compactPeople[0], compactPeople[1]];
      var autoSearchPeople = JSON.parse(JSON.stringify(window.demo.people));
      var asyncPeople = JSON.parse(JSON.stringify(window.demo.people));
      var disconnectedPeople = JSON.parse(JSON.stringify(window.demo.people));
      var disabledPeople = JSON.parse(JSON.stringify(window.demo.people));
      var memberList = JSON.parse(JSON.stringify(window.demo.membersList));
      var facePileList = JSON.parse(JSON.stringify(window.demo.facePile));

      $scope.getPeopleForDefaultDemo = function (searchQuery) {
        $scope.defaultSearchResults = getPeople(defaultPeople, searchQuery);
        return $scope.defaultSearchResults;
      }

      $scope.getPeopleForCompactDemo = function (searchQuery) {
        $scope.compactSearchResults = getPeople(compactPeople, searchQuery);
        return $scope.compactSearchResults;
      }

      $scope.getDisconnectedPeopleDemo = function (searchQuery) {
        $scope.diconnectedSearchResults = getPeople(disconnectedPeople, searchQuery);
        return $scope.diconnectedSearchResults;
      }

      $scope.getDisabledPeopleDemo = function (searchQuery) {
        $scope.disabledSearchPeople = getPeople(disconnectedPeople, searchQuery);
        return $scope.disabledSearchPeople;
      }

      $scope.getPeopleForAutoSearch = function (searchQuery) {
        $scope.autoSearchResults = getPeople(autoSearchPeople, searchQuery);
        return $scope.autoSearchResults;
      }

      $scope.onMembersSearch = function (searchQuery) {
        return memberList;
      }

      $scope.getPeopleAsync = function (query) {
        var deferred = $q.defer();
        $scope.asyncSearchResults = getPeople(asyncPeople, query);
        if (!$scope.asyncSearchResults || $scope.asyncSearchResults.length === 0) {
          return $scope.asyncSearchResults;
        }
        $timeout(function () {
          deferred.resolve($scope.asyncSearchResults);
        }, 1000 * 3);

        return deferred.promise;
      }

      $scope.onFacePileSearch = function (query) {
        var deferred = $q.defer();
        $scope.facePileSearchResults = getPeople(facePileList, query);
        if (!$scope.facePileSearchResults || $scope.facePileSearchResults.length === 0) {
          $scope.facePileSearchResults = facePileList;
          return $scope.facePileSearchResults
        }
        $timeout(function () {
          deferred.resolve($scope.facePileSearchResults);
        }, 1000 * 2);

        return deferred.promise;
      }

      $scope.removePerson = function (person) {
        var indx = $scope.selectedPeopleDefault.indexOf(person);
        $scope.selectedPeopleDefault.splice(indx, 1);
      }

    }]);
})();

angular.element(document).ready(function () {
  angular.bootstrap(document.getElementById('regularSample'), ['regularSample']);
});