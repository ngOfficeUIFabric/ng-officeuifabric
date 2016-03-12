'use strict';

var demoApp = angular.module('demoApp', [
  'officeuifabric.core',
  'officeuifabric.components.persona',
  'officeuifabric.components.dropdown'
]).controller('personaController', ['$scope', personaDemoController]);

function personaDemoController($scope) {
  $scope.vm = {
    presence: "dnd",
    size: 'small',
    style: 'round',
    color: 'blue',
    presenceOptions: {
      'available': 'Available',
      'away': 'Away',
      'blocked': 'Blocked',
      'busy': 'Busy',
      'dnd': 'Do Not Disturb',
      'offline': 'Offline'
    },
    sizeOptions: {
      'tiny': 'Tiny',
      'xsmall': 'Extra small',
      'small': 'Small',
      'medium': 'Medium',
      'large': 'Large',
      'xlarge': 'Extra large'
    },
    styleOptions: {
      'round': 'Round',
      'square': 'Square'
    },
    colorOptions: {
      'lightBlue': 'Light Blue',
      'blue': 'Blue',
      'darkBlue': 'Dark Blue',
      'teal': 'Teal',
      'lightGreen': 'LightGreen',
      'green': 'Green',
      'darkGreen': 'Dark Green',
      'lightPink': 'Light Pink',
      'pink': 'Pink',
      'magenta': 'Magenta',
      'purple': 'Purple',
      'black': 'Black',
      'orange': 'Orange',
      'red': 'Red',
      'darkRed': 'Dark Red'
    }
  };


}