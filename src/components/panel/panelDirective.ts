'use strict';

import * as ng from 'angular';
import {PanelTypes} from './panelDirectiveEnum';

/**
 * @ngdoc directive
 * @name uifPanel
 * @module officeuifabric.components.panel
 *
 * @restrict E
 *
 * @description
 * `<uif-panel>` is the Panel directive.
 *
 * @see {link http://dev.office.com/fabric/components/panel}
 *
 * @usage
 *
 */
export class PanelDirective implements ng.IDirective {

  public restrict: string = 'E';
  public template: string = `<div class="ms-Panel">
                              <div  class="ms-Overlay"
                                    ng-click="closePanel()"
                                    ng-class="uifShowOverlay === true ? \'ms-Overlay--dark\' : \'\';"></div>
                              <div class="ms-Panel-main">
                                <div class="ms-Panel-commands">
                                  <button ng-if="uifShowClose" class='ms-Panel-closeButton' ng-click="closePanel()">
                                    <uif-icon uif-type='x'></uif-icon>
                                  </button>
                                </div>
                                <div class="ms-Panel-contentInner">
                                </div>
                              </div>
                             </div>`;
  public transclude: boolean = true;
  public replace: boolean = true;
  public controller: any = PanelController;

  public scope: {} = {
      uifIsOpen: '=',
      uifShowClose: '=',
      uifShowOverlay: '=',
      uifType: '@'
    };

  public static factory(): ng.IDirectiveFactory {
    const directive: ng.IDirectiveFactory = ( $log: ng.ILogService,
                                              $animate: ng.animate.IAnimateService,
                                              $timeout: ng.ITimeoutService) => new PanelDirective($log, $animate, $timeout);
    directive.$inject = ['$log', '$animate', '$timeout'];
    return directive;

  }

  constructor(private $log: ng.ILogService, private $animate: ng.animate.IAnimateService, private $timeout: ng.ITimeoutService) { }

  public compile(element: ng.IAugmentedJQuery,
                 attrs: ng.IAttributes,
                 transclude: ng.ITranscludeFunction): ng.IDirectivePrePost {
    return {
      pre: this.preLink
    };
  }

  private preLink(scope: IPanelScope,
                  elem: ng.IAugmentedJQuery,
                  attrs: ng.IAttributes,
                  ctrl: PanelController,
                  transclude: ng.ITranscludeFunction): void {

        transclude((clone: ng.IAugmentedJQuery) => {
          for (let i: number = 0; i < clone.length; i++) {

            if (angular.element(clone[i]).hasClass('ms-CommandBar')) {
              angular.element(elem[0].querySelector('div.ms-Panel-commands')).prepend(clone[i]);
            } else if (scope.uifType === 'left') {
              angular.element(elem[0].querySelector('div.ms-Panel-main')).append(clone[i]);
            } else {
              angular.element(elem[0].querySelector('div.ms-Panel-contentInner')).append(clone[i]);
            }

          }

        });

        scope.closePanel = () => {
            scope.uifIsOpen = false;
        };

      }

}

/**
 * @ngdoc interface
 * @name IPanelScope
 * @module officeuifabric.components.panel
 *
 * @description
 * This is the scope used by the <uif-panel> directive.
 *
 * @property {boolean} uifIsOpen    -   The string value in the uifPanelSearch input
 * @property {string} uifType           -   The placeholder for the search input
 */
interface IPanelScope extends ng.IScope {
  uifIsOpen: boolean;
  uifType: string;
  uifShowOverlay: boolean;
  uifShowClose: boolean;
  closePanel: () => void;
}


/**
 * @ngdoc controller
 * @name PanelController
 * @module officeuifabric.components.panel
 *
 * @description
 * Controller used for the `<uif-panel>` directive.
 */
export class PanelController {

  public static $inject: string[] = ['$scope', '$animate', '$element', '$log', '$timeout'];

  constructor(
    private $scope: IPanelScope,
    private $animate: ng.animate.IAnimateService,
    private $element: ng.IAugmentedJQuery,
    public $log: ng.ILogService,
    public $timeout: ng.ITimeoutService) {

      if (!$scope.uifType) {
        $scope.uifType = 'medium';
      }

      if (PanelTypes[$scope.uifType] === undefined) {
          this.$log.error('Error [ngOfficeUiFabric] officeuifabric.components.panel - unsupported panel type:\n' +
            'the type \'' + $scope.uifType + '\' is not supported by ng-Office UI Fabric as valid type for panels.' +
            'Supported types can be found under PanelTypes enum here:\n' +
            'https://github.com/ngOfficeUIFabric/ng-officeuifabric/blob/master/src/components/panel/panel.ts');

          $scope.uifType = 'medium';
      }

      $element.addClass('ms-Panel--' + $scope.uifType);

      $scope.$watch('uifIsOpen', (newValue: boolean) => {

        if (typeof newValue !== 'boolean' && newValue !== undefined) {
          this.$log.error('Error [ngOfficeUiFabric] officeuifabric.components.panel - invalid attribute type: \'uif-is-open\'.\n' +
            'The type \'' + typeof newValue + '\' is not supported as valid type for \'uif-is-open\' attribute for ' +
            '<uif-panel/>. The valid type is boolean.');
        }

        if (newValue === true) {
          $animate.addClass(this.$element, 'ms-Panel-animateIn');
          $element.addClass('is-open');

          // forces resize of commandbars
          if ($element[0].querySelector('.ms-CommandBar')) {
            angular.element($element[0].querySelector('.ms-CommandBar')).scope().$broadcast('uif-command-bar-resize');
          }

        } else {

          $animate.addClass(this.$element, 'ms-Panel-animateOut');
          $timeout(
            () => {
              $element.removeClass('ms-Panel-animateIn ms-Panel-animateOut');
              $element.removeClass('is-open');
            },
            500);
        }

      });
  }

}

/**
 * @ngdoc directive
 * @name uifPanelHeader
 * @module officeuifabric.components.panel
 *
 * @restrict E
 *
 * @description
 * `<uif-panel-header>` is the placeholder for content the user includes.
 *
 * @see {link http://dev.office.com/fabric/components/panel}
 *
 * @usage
 *
 */
export class PanelHeaderDirective implements ng.IDirective {

  public restrict: string = 'E';
  public template: string = '<p class="ms-Panel-headerText" ng-transclude></div>';
  public transclude: boolean = true;
  public replace: boolean = true;

  public scope: {} = {
    uifHeaderText: '@'
  };

  public static factory(): ng.IDirectiveFactory {
    const directive: ng.IDirectiveFactory = () => new PanelHeaderDirective();
    return directive;
  }

}


/**
 * @ngdoc module
 * @name officeuifabric.components.panel
 *
 * @description
 * Flyout Panel
 *
 */
export var module: ng.IModule = ng.module('officeuifabric.components.panel', [
    'officeuifabric.components'
  ])
  .directive('uifPanel', PanelDirective.factory())
  .directive('uifPanelHeader', PanelHeaderDirective.factory());
