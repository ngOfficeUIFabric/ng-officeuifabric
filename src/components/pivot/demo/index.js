'use strict';

angular.module('demoApp', [
  'officeuifabric.core',
  'officeuifabric.components.pivot',
  'officeuifabric.components.dropdown'
]).controller('pivotController', ['$scope', pivotController]);

function pivotController($scope) {
  $scope.vm = {
    selectedSize: 'large',
    selectedType: 'tabs',
    pivots: [
      { title: 'My files' },
      { title: 'Recent' },
      { title: 'Shared with me' }
    ],
    selectedPivotTitle: undefined,
    selectedPivot: undefined,
    menuOpened: false
  };

  $scope.openMenu = function () {
    $scope.vm.menuOpened = !$scope.vm.menuOpened;
  };

  $scope.$watch('vm.selectedPivotTitle', function (newTitle) {
    $scope.vm.selectedPivot = { title: newTitle };
  }, true);

  $scope.$watch('vm.selectedPivot', function (newPivot) {
    if (newPivot !== undefined) {
      $scope.vm.selectedPivotTitle = newPivot.title;
    }
  }, true);

}
