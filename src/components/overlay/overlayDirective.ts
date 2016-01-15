'use strict';

import * as ng from 'angular';

/**
 * @ngdoc directive
 * @name uifOverlay
 * @module officeuifabric.components.overlay
 * 
 * @restrict E
 * 
 * @description 
 * `<uif-overlay>` is an overlay directive.
 * 
 * @see {link http://dev.office.com/fabric/styles}
 * 
 * @usage
 * 
 * <uif-overlay>html markup goes here</uif-overlay>
 * <uif-overlay uif-overlay-dark="true">html markup goes here</>
 */
export class OverlayDirective implements ng.IDirective {

  public restrict: string = 'E';
  public template: string = '<div class="ms-Overlay" ng-class="{\'ms-Overlay--dark\': uifMode == \'dark\'}" ng-transclude></div>';
  public scope: {} = {
    uifMode: '@'
  };
  public transclude: Boolean = true;

  public static factory(): ng.IDirectiveFactory {
    const directive: ng.IDirectiveFactory = () => new OverlayDirective();
    return directive;
  }
}

/**
 * @ngdoc module
 * @name officeuifabric.components.overlay
 * 
 * @description 
 * Overlay
 * 
 */
export var module: ng.IModule = ng.module('officeuifabric.components.overlay', [
    'officeuifabric.components'
  ])
  .directive('uifOverlay', OverlayDirective.factory());
