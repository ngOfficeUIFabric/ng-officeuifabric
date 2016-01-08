'use strict';

var demoApp = angular.module('demoApp', [
    'officeuifabric.core',
    'officeuifabric.components.table'
]);

demoApp.controller('demoController', [
    '$scope', demoController]);

function demoController($scope) {
    $scope.files = [
        {
            fileName: 'file1.txt',
            location: '~/file1.txt',
            modified: new Date(),
            type: 'TXT',
            isSelected: false
        },
        {
            fileName: 'file2.docx',
            location: '~/file2.docx',
            modified: new Date(),
            type: 'DOCX',
            isSelected: true
        },
        {
            fileName: 'file3.txt',
            location: '~/file3.txt',
            modified: new Date(),
            type: 'TXT',
            isSelected: false
        }
    ];
}