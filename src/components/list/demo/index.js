'use strict';

var demoApp = angular.module('demoApp', [
  'officeuifabric.core',
  'officeuifabric.components.list'
]);

demoApp.controller('demoController', [
  '$scope', demoController]);

function demoController($scope) {
  $scope.messages = [
    {
      sender: {
        name: 'Alton Lafferty'
      },
      image: 'http://dev.office.com/Modules/DevOffice.Fabric/Fabric/components/Persona/Persona.Person2.png',
      title: 'Meeting notes 1',
      description: 'Today we discussed the importance of a, b, and c in regards to d.',
      time: new Date(),
      isUnread: false,
      isUnseen: true
    },
    {
      sender: {
        name: 'Alton Lafferty'
      },
      image: 'http://dev.office.com/Modules/DevOffice.Fabric/Fabric/components/Persona/Persona.Person2.png',
      title: 'Meeting notes 2',
      description: 'Today we discussed the importance of a, b, and c in regards to d.',
      time: new Date(),
      isUnread: true,
      isUnseen: false
    },
    {
      sender: {
        name: 'Alton Lafferty'
      },
      image: 'http://dev.office.com/Modules/DevOffice.Fabric/Fabric/components/Persona/Persona.Person2.png',
      title: 'Meeting notes 3',
      description: 'Today we discussed the importance of a, b, and c in regards to d.',
      time: new Date(),
      isUnread: false,
      isUnseen: false
    },
    {
      sender: {
        name: 'Alton Lafferty'
      },
      image: 'http://dev.office.com/Modules/DevOffice.Fabric/Fabric/components/Persona/Persona.Person2.png',
      title: 'Meeting notes 4',
      description: 'Today we discussed the importance of a, b, and c in regards to d.',
      time: new Date(),
      isUnread: false,
      isUnseen: false
    },
    {
      sender: {
        name: 'Alton Lafferty'
      },
      image: 'http://dev.office.com/Modules/DevOffice.Fabric/Fabric/components/Persona/Persona.Person2.png',
      title: 'Meeting notes 5',
      description: 'Today we discussed the importance of a, b, and c in regards to d.',
      time: new Date(),
      isUnread: false,
      isUnseen: false
    }
  ];

  $scope.selectedItems = [$scope.messages[0]];


  // demo resources for changing list item type mode
  $scope.listItemType = 'item';
  $scope.switchListItemTypeToImage = function () {
    $scope.listItemType = 'itemWithImage';
  };
  $scope.switchListItemTypeToIcon = function () {
    $scope.listItemType = 'itemWithIcon';
  };
  $scope.switchListItemTypeToItem = function () {
    $scope.listItemType = 'item';
  };


  // demo resources for changing list item type mode
  $scope.listLayoutType = 'list';
  $scope.switchListLayoutTypeToGrid = function () {
    $scope.listLayoutType = 'grid';
  };
  $scope.switchListLayoutTypeToList = function () {
    $scope.listLayoutType = 'list';
  };


  // demo resources for changing list selection mode
  $scope.listSelectionType = 'none';
  $scope.switchListTypeToNone = function () {
    $scope.listSelectionType = 'none';
  };
  $scope.switchListTypeToSingle = function () {
    $scope.listSelectionType = 'single';
    updateItems();
  };
  $scope.switchListTypeToMultiple = function () {
    $scope.listSelectionType = 'multiple';
  };
  function updateItems(){
    var messages = $scope.messages;
    $scope.messages = [];
    $scope.messages = messages;
  }
}
