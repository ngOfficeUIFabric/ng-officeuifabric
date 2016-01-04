'use strict';

import * as ng from 'angular';

/**
 * @ngdoc directive
 * @name uifIcon
 * @module officeuifabric.components.icon
 * 
 * @restrict E
 * 
 * @description 
 * `<uif-icon>` is an icon directive.
 * 
 * @see {link http://dev.office.com/fabric/styles}
 * 
 * @usage
 * 
 * <uif-icon uif-type="arrowDownLeft" />
 */
export class IconDirective implements ng.IDirective {

  public restrict: string = 'E';
  public template: string = '<i class="ms-Icon ms-Icon--{{uifType}}" aria-hidden="true"></i>';
  public scope: {} = {
    uifType: '@'
  };
  public transclude: Boolean = true;

  public static factory(): ng.IDirectiveFactory {
    const directive: ng.IDirectiveFactory = () => new IconDirective();
    return directive;
  }
}

/**
 * @ngdoc module
 * @name officeuifabric.components.icon
 * 
 * @description 
 * Icon
 * 
 */
export var module: ng.IModule = ng.module('officeuifabric.components.icon', [
    'officeuifabric.components'
  ])
  .directive('uifIcon', IconDirective.factory());
