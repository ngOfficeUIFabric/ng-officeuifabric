'use strict';

var demoApp = angular.module('demoApp', [
  'officeuifabric.core',
  'officeuifabric.components.personacard',
  'officeuifabric.components.dropdown'
]).controller('personaCardController', ['$scope', personaCardDemoController]);

function personaCardDemoController($scope) {
  $scope.vm = {
    presence: "dnd",
    size: 'small',
    style: 'round',
    presenceOptions: {
      'available': 'Available',
      'away': 'Away',
      'blocked': 'Blocked',
      'busy': 'Busy',
      'dnd': 'Do Not Disturb',
      'offline': 'Offline'
    },
    sizeOptions: {
      'xsmall': 'Extra small',
      'small': 'Small',
      'medium': 'Medium',
      'large': 'Large',
      'xlarge': 'Extra large'
    },
    styleOptions: {
      'round' : 'Round',
      'square' : 'Square'
    }
  };


}