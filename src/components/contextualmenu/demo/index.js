(function () {
  'use strict';

  angular.module('demo', [
    'officeuifabric.core',
    'officeuifabric.components.contextualmenu',
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
        link: function (scope, element) {
          var template = angular.element(document.getElementById(scope.src));
          scope.data = $sce.trustAsHtml(element.text(template.html()).html());
        }
      };

      return directive;
    }]);

  angular.module('regularSample', ['demo'])
    .controller('demoController',
    ['$scope', function ($scope) {
      $scope.isOpen = true;
      $scope.dynamic = {};
      $scope.dynamic.opened = false;
      $scope.toggleMenu = function () {
        $scope.dynamic.opened = !$scope.dynamic.opened;
      };
      $scope.colors = ['Green', 'Yellow', 'Red', 'White', 'Blue'];

      $scope.logColor = function (color) {
        console.log(color);
      };

      $scope.logClick = function (logData) {
        console.log(logData);
      };
    }]);

  angular.module('animateSample', [
    'ngAnimate',
    'demo'
  ])
    .controller('demoController',
    ['$scope', function ($scope) {
      $scope.isOpen = true;

      $scope.logClick = function (logData) {
        console.log(logData);
      };
    }]);
})();

angular.element(document).ready(function () {
  angular.bootstrap(document.getElementById('regularSample'), ['regularSample']);
  angular.bootstrap(document.getElementById('animateSample'), ['animateSample']);
});
