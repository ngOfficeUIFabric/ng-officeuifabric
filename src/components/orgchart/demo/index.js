'use strict';

var demoApp = angular.module('demoApp', [
  'officeuifabric.core',
  'officeuifabric.components.orgchart'
])
.controller('demoController', function(){
    var vm = this;

    vm.selectedItems1 = [];
    vm.selectedItems2 = [];

    vm.items = [
        {
            country: 'Denmark',
            imageUrl: 'Persona.Person2.png',
            name: 'Kevin Magnussen',
            presence: 'available',
            selected1: true,
            selected2: true,
            team: 'Renault'
        },
        {
            country: '	Germany',
            imageUrl: 'Persona.Person2.png',
            name: 'Sebastian Vettel',
            presence: 'busy',
            selected1: true,
            selected2: true,
            team: 'Ferrari'
        },
        {
            country: '	United Kingdom',
            imageUrl: 'Persona.Person2.png',
            name: 'Jolyon Palmer',
            presence: 'away',
            selected1: false,
            selected2: false,
            team: 'Renault'
        },
        {
            country: 'United Kingdom',
            imageUrl: 'Persona.Person2.png',
            name: 'Lewis Hamilton',
            presence: 'blocked',
            selected1: false,
            selected2: false,
            team: '	Mercedes'
        }
      ];






});
