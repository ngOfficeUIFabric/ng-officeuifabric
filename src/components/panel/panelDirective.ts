'use strict';

import * as angular from 'angular';
import { PanelTypes } from './panelDirectiveEnum';

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
export class PanelDirective implements angular.IDirective {

  public restrict: string = 'E';
  public template: string = `<div class="ms-Panel">
                              <div  class="ms-Overlay"
                                    ng-click="uifIsLightDismiss && closePanel()"
                                    ng-class="uifShowOverlay === true ? \'ms-Overlay--dark\' : \'\';"></div>
                              <div class="ms-Panel-main">
                                <div class="ms-Panel-commands">
                                  <button type="button" ng-if="uifShowClose" class='ms-Panel-closeButton' ng-click="closePanel()">
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
    uifIsLightDismiss: '=',
    uifIsOpen: '=',
    uifShowClose: '=',
    uifShowOverlay: '=',
    uifType: '@'
  };

  public static factory(): angular.IDirectiveFactory {
    const directive: angular.IDirectiveFactory = ($log: angular.ILogService,
      $animate: angular.animate.IAnimateService,
      $timeout: angular.ITimeoutService) => new PanelDirective($log, $animate, $timeout);
    directive.$inject = ['$log', '$animate', '$timeout'];
    return directive;

  }

  constructor(
    private $log: angular.ILogService,
    private $animate: angular.animate.IAnimateService,
    private $timeout: angular.ITimeoutService
  ) { }

  public compile(
    element: angular.IAugmentedJQuery,
    attrs: angular.IAttributes,
    transclude: angular.ITranscludeFunction): angular.IDirectivePrePost {
    return {
      pre: this.preLink
    };
  }

  private preLink(
    scope: IPanelScope,
    elem: angular.IAugmentedJQuery,
    attrs: angular.IAttributes,
    ctrl: PanelController,
    transclude: angular.ITranscludeFunction): void {

    transclude((clone: angular.IAugmentedJQuery) => {
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
interface IPanelScope extends angular.IScope {
  uifIsLightDismiss: boolean;
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

  // mapping enum to CSS classes for size
  private uifPanelSizeClasses: { [index: number]: string } = {
    [PanelTypes.small]: 'ms-Panel--sm',
    [PanelTypes.medium]: 'ms-Panel--md',
    [PanelTypes.large]: 'ms-Panel--lg',
    [PanelTypes.extralarge]: 'ms-Panel--xl',
    [PanelTypes.extraextralarge]: 'ms-Panel--xxl',
    [PanelTypes.left]: 'ms-Panel--left'
  };


  constructor(
    private $scope: IPanelScope,
    private $animate: angular.animate.IAnimateService,
    private $element: angular.IAugmentedJQuery,
    public $log: angular.ILogService,
    public $timeout: angular.ITimeoutService) {

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

    let size: number = PanelTypes[$scope.uifType];
    $element.addClass(this.uifPanelSizeClasses[size]);

    $scope.$watch('uifIsOpen', (newValue: boolean) => {

      if (typeof newValue !== 'boolean' && newValue !== undefined) {
        this.$log.error('Error [ngOfficeUiFabric] officeuifabric.components.panel - invalid attribute type: \'uif-is-open\'.\n' +
          'The type \'' + typeof newValue + '\' is not supported as valid type for \'uif-is-open\' attribute for ' +
          '<uif-panel/>. The valid type is boolean.');
      } else {

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
              $scope.uifIsOpen = false;
            },
            500);
        }
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
export class PanelHeaderDirective implements angular.IDirective {

  public restrict: string = 'E';
  public template: string = '<p class="ms-Panel-headerText" ng-transclude></div>';
  public transclude: boolean = true;
  public replace: boolean = true;

  public scope: {} = {
    uifHeaderText: '@'
  };

  public static factory(): angular.IDirectiveFactory {
    const directive: angular.IDirectiveFactory = () => new PanelHeaderDirective();
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
export let module: angular.IModule = angular.module('officeuifabric.components.panel', [
  'officeuifabric.components'
])
  .directive('uifPanel', PanelDirective.factory())
  .directive('uifPanelHeader', PanelHeaderDirective.factory());
