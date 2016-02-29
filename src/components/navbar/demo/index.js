(function () {
  'use strict';

  angular.module('demo', [
    'officeuifabric.core',
    'officeuifabric.components.navbar',
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
          let template = angular.element(document.getElementById(scope.src));
          scope.data = $sce.trustAsHtml(element.text(template.html()).html());
        }
      };

      return directive;
    }]);

  angular.module('regularSample', ['demo'])
    .controller('demoController',
      ['$scope', function ($scope) {
        $scope.isOpen = true;
        $scope.colors = ['Green', 'Yellow', 'Red', 'White', 'Blue'];

        $scope.logColor = function (color) {
          console.log(color);
        }

        $scope.logClick = function (logData) {
          console.log(logData);
        }

        $scope.onSearch = function(search){
          alert('You searched for "' + search + '"');
        }
      }]);

  angular.module('animateSample', [
    'ngAnimate',
    'demo'
  ])
    .controller('demoController',
      ['$scope', function ($scope) {
        $scope.isOpen = true;
      }]);
})();

angular.element(document).ready(function () {
  angular.bootstrap(document.getElementById('regularSample'), ['regularSample']);
  angular.bootstrap(document.getElementById('animateSample'), ['animateSample']);
});