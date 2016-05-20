'use strict';

import * as ng from 'angular';


/**
 * @ngdoc interface
 * @name IBreadcrumbLinkScope
 * @module officeuifabric.components.breadcrumb
 *
 * @description
 * This is the scope used by the BreadcrumbLink directive.
 *
 * @property {string} ngHref          - The link target
 *
 */
export interface IBreadcrumbLinkScope extends ng.IScope {
  ngHref: string;
  uifTabindex: number;
}

/**
 * @ngdoc directive
 * @name uifBreadcrumblink
 * @module officeuifabric.components.breadcrumb
 *
 * @restrict E
 *
 * @description
 * `<uif-breadcrumb-link>` is a directive for rendering a link in the breadcrumb component.
 *
 * @usage
 *
 * <uif-breadcrumb>
 *   <uif-breadcrumb-link ng-href="https://github.com">GitHub</uif-breadcrumb-link>
 *   <uif-breadcrumb-link ng-href="https://office.com">Office</uif-breadcrumb-link>
 * </uif-breadcrumb>
 */
export class BreadcrumbLinkDirective implements ng.IDirective {
  public restrict: string = 'E';
  public require: string = '^uifBreadcrumb';
  public transclude: boolean = true;
  public replace: boolean = true;
  public template: string = '' +
  '<li class="ms-Breadcrumb-listItem">' +
  '<a class="ms-Breadcrumb-itemLink" ng-href="{{ngHref}}" tabindex="{{uifTabindex}}" ng-transclude></a>' +
  '<i class="ms-Breadcrumb-chevron ms-Icon ms-Icon--chevronRight"></i>' +
  '</li>';
  public scope: {} = {
    ngHref: '@'
  };

  public static factory(): ng.IDirectiveFactory {
    const directive: ng.IDirectiveFactory = () => new BreadcrumbLinkDirective();
    return directive;
  }
  public link(
    scope: IBreadcrumbLinkScope,
    instanceElement: ng.IAugmentedJQuery,
    attributes: any,
    ctrl: BreadcrumbController,
    transclude: ng.ITranscludeFunction): void {

    scope.uifTabindex = parseInt(attributes.uifTabindex, null) + 1;
  }
}

/**
 * @ngdoc class
 * @name BreadcrumbController
 * @module officeuifabric.components.breadcrumb
 *
 * @description This is the controller for the breadcrumb component
 */
export class BreadcrumbController {
  public static $inject: string[] = ['$compile'];
  constructor(public $compile: ng.ICompileService) {
  }
}

/**
 * @ngdoc directive
 * @name uifBreadcrumb
 * @module officeuifabric.components.breadcrumb
 *
 * @restrict E
 *
 * @description
 * `<uif-breadcrumb>` is a directive for rendering breadcrumb component.
 *
 * @usage
 *
 * <uif-breadcrumb>
 *   <uif-breadcrumb-link ng-href="https://github.com">GitHub</uif-breadcrumb-link>
 *   <uif-breadcrumb-link ng-href="https://office.com">Office</uif-breadcrumb-link>
 * </uif-breadcrumb>
 */

export class BreadcrumbDirective implements ng.IDirective {
  public restrict: string = 'E';
  public transclude: boolean = true;
  public replace: boolean = true;
  public template: string = '' +
  '<div class="ms-Breadcrumb">' +
  '<div class="ms-Breadcrumb-overflow">' +
  '<div class="ms-Breadcrumb-overflowButton ms-Icon ms-Icon--ellipsis" tabindex="1">' +
  '</div>' +
  '<i class="ms-Breadcrumb-chevron ms-Icon ms-Icon--chevronRight"></i>' +
  '<div class="ms-Breadcrumb-overflowMenu">' +
  '<ul class="ms-ContextualMenu is-open"></ul>' +
  '</div>' +
  '</div>' +
  '<ul class="ms-Breadcrumb-list">' +
  '</ul>' +
  '</div>';
  public controller: typeof BreadcrumbController = BreadcrumbController;
  public require: string = 'uifBreadcrumb';

  public static factory(): ng.IDirectiveFactory {
    const directive: ng.IDirectiveFactory = () => new BreadcrumbDirective();
    return directive;
  }

  public link(
    scope: ng.IScope,
    instanceElement: ng.IAugmentedJQuery,
    attributes: any,
    ctrl: BreadcrumbController,
    transclude: ng.ITranscludeFunction): void {

    let ul: JQuery = ng.element(instanceElement[0].querySelector('.ms-Breadcrumb-list'));

    transclude((transcludedElement: JQuery) => {
      let breadcrumbLinks: JQuery = angular.element(transcludedElement);
      ul.append(breadcrumbLinks);
    });

    // for regular rendering without ng-repeat
    let tabIndex: number = 1;
    let breadcrumbLinks: JQuery = ul.find('li');
    for (let linkIndex: number = 1; linkIndex < breadcrumbLinks.length; linkIndex += 2) {
      let currentLi: JQuery = ng.element(breadcrumbLinks[linkIndex]);
      if (currentLi != null) {
        ng.element(currentLi[0].querySelector('.ms-Breadcrumb-itemLink')).attr('tabindex', ++tabIndex);
      }
    }
  }
};

/**
 * @ngdoc module
 * @name officeuifabric.components.breadcrumb
 *
 * @description
 * Breadcrumb
 */
export var module: ng.IModule = ng.module('officeuifabric.components.breadcrumb', ['officeuifabric.components'])
  .directive('uifBreadcrumb', BreadcrumbDirective.factory())
  .directive('uifBreadcrumbLink', BreadcrumbLinkDirective.factory());
