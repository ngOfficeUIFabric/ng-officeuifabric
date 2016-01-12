(function () {
    'use strict';
    
    var demoApp = angular.module('demoApp', [
        'officeuifabric.core',
        'officeuifabric.components.contextualmenu'
    ]);

    demoApp.controller('demoController', [
        '$scope', demoController]);

    function demoController($scope) {
        $scope.isOpen = true;
        $scope.colors = ['Green', 'Yellow', 'Red', 'White', 'Blue'];

        $scope.logColor = function (color) {
            console.log(color);
        }

        $scope.logClick = function (logData) {
            console.log(logData);
        }
    }
})();

(function () {
    'use strict';

    var animateSample = angular.module('animateSample', [
        'ngAnimate',
        'officeuifabric.core',
        'officeuifabric.components.contextualmenu'
    ]);

    animateSample.controller('demoController', [
        '$scope', demoController]);

    function demoController($scope) {
        $scope.isOpen = true;
    }
})();


angular.element(document).ready(function () {
    angular.bootstrap(document.getElementById('demoApp'), ['demoApp']);
    angular.bootstrap(document.getElementById('animateSample'), ['animateSample']);
});