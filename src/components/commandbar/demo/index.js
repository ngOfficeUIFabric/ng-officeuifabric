'use strict';

var demoApp = angular.module('demoApp', [
  'officeuifabric.core',
  'officeuifabric.components.commandbar'
])
  .directive('raw', ['$sce', function ($sce) {
    var directive = {
      replace: true,
      scope: {
        src: '='
      },
      template: '<pre class=\'code\' ng-bind-html=\'data\'></pre>',
      restrict: 'E',
      link: function (scope, element) {
        var template = angular.element(document.getElementById(scope.src));
        scope.data = $sce.trustAsHtml(element.text(template.html()).html());
      }
    };

    return directive;
  }]);

demoApp.controller('demoAppController', ['$scope', demoAppController]);

function demoAppController($scope) {
  $scope.isOpen = false;

  $scope.config = {
    main: [
      {
        linkIcon: 'settings',
        type: 'action',
        actionName: 'TOGGLE_PANEL',
        context: '/sites/phhv2/Pages/Home.aspx'
      },
      {
        linkIcon: 'settings',
        type: 'action',
        actionName: 'TOGGLE_PANEL',
        context: '/sites/phhv2/Pages/Home.aspx'
      },
      {
        linkIcon: 'settings',
        type: 'action',
        actionName: 'TOGGLE_PANEL',
        context: '/sites/phhv2/Pages/Home.aspx'
      },
      {
        linkIcon: 'settings',
        type: 'action',
        actionName: 'TOGGLE_PANEL',
        context: '/sites/phhv2/Pages/Home.aspx'
      },
      {
        linkIcon: 'settings',
        type: 'action',
        actionName: 'TOGGLE_PANEL',
        context: '/sites/phhv2/Pages/Home.aspx'
      },
      {
        linkIcon: 'settings',
        type: 'action',
        actionName: 'TOGGLE_PANEL',
        context: '/sites/phhv2/Pages/Home.aspx'
      },
      {
        linkIcon: 'settings',
        type: 'action',
        actionName: 'TOGGLE_PANEL',
        context: '/sites/phhv2/Pages/Home.aspx'
      },
      {
        linkIcon: 'settings',
        type: 'action',
        actionName: 'TOGGLE_PANEL',
        context: '/sites/phhv2/Pages/Home.aspx'
      },
      {
        linkIcon: 'settings',
        type: 'action',
        actionName: 'TOGGLE_PANEL',
        context: '/sites/phhv2/Pages/Home.aspx'
      },
      {
        linkIcon: 'settings',
        type: 'action',
        actionName: 'TOGGLE_PANEL',
        context: '/sites/phhv2/Pages/Home.aspx'
      },
      {
        linkIcon: 'settings',
        type: 'action',
        actionName: 'TOGGLE_PANEL',
        context: '/sites/phhv2/Pages/Home.aspx'
      },
      {
        linkIcon: 'settings',
        type: 'action',
        actionName: 'TOGGLE_PANEL',
        context: '/sites/phhv2/Pages/Home.aspx'
      },
      {
        linkIcon: 'settings',
        type: 'action',
        actionName: 'TOGGLE_PANEL',
        context: '/sites/phhv2/Pages/Home.aspx'
      },
      {
        linkIcon: 'settings',
        type: 'action',
        actionName: 'TOGGLE_PANEL',
        context: '/sites/phhv2/Pages/Home.aspx'
      },
      {
        linkIcon: 'settings',
        type: 'action',
        actionName: 'TOGGLE_PANEL',
        context: '/sites/phhv2/Pages/Home.aspx'
      }
    ],
    side: [
      {
        linkIcon: 'home',
        type: 'link',
        linkUrl: '/sites/intranet',
        context: '*'
      },
      {
        linkIcon: 'story',
        type: 'link',
        linkUrl: '/sites/siteexplorer',
        context: '*'
      },
      {
        linkIcon: 'question',
        type: 'link',
        linkUrl: '/sites/helphub',
        context: '*'
      }
    ]
  };

  $scope.goToLink = function (navigationUrl) {
    $scope.navigationUrl = navigationUrl;
  };

  $scope.openMenu = function () {
    $scope.isOpen = !$scope.isOpen;
  };
}
