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
}