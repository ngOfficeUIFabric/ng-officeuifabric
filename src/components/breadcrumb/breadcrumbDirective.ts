'use strict';

import * as ng from 'angular';

/**
 * @ngdoc directive
 * @name uifBreadcrumblink
 * @module officeuifabric.components.breadcrumb
 *
 * @restrict E
 *
 * @description
 * `<uif-breadcrumblink>` is a directive for rendering a link in the breadcrumb component.
 *
 * @usage
 *
 * <uif-breadcrumb>
 *   <uif-breadcrumblink uif-active>Active text</uif-breadcrumblink>
 *   <uif-breadcrumblink ng-href="https://github.com">GitHub</uif-breadcrumblink>
 *   <uif-breadcrumblink ng-href="https://office.com">Office</uif-breadcrumblink>
 * </uif-breadcrumb>
 */
export class BreadcrumbLinkDirective implements ng.IDirective {
  public restrict: string = 'E';
  public require: string = '^uifBreadcrumb';
  public static factory(): ng.IDirectiveFactory {
    const directive: ng.IDirectiveFactory = () => new BreadcrumbLinkDirective();
    return directive;
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
 *   <uif-breadcrumblink uif-active>Active text</uif-breadcrumblink>
 *   <uif-breadcrumblink ng-href="https://github.com">GitHub</uif-breadcrumblink>
 *   <uif-breadcrumblink ng-href="https://office.com">Office</uif-breadcrumblink>
 * </uif-breadcrumb>
 */

export class BreadcrumbDirective implements ng.IDirective {
  public restrict: string = 'E';
  public transclude: boolean = true;
  public template: string = '<div class="ms-Breadcrumb"></div>';
  public controller: typeof BreadcrumbController = BreadcrumbController;
  public require: string = 'uifBreadcrumb';

  public static factory(): ng.IDirectiveFactory {
    const directive: ng.IDirectiveFactory = () => new BreadcrumbDirective();
    return directive;
  }
  public link(
    scope: ng.IScope, instanceElement: ng.IAugmentedJQuery, attributes: any,
    ctrl: BreadcrumbController, transclude: ng.ITranscludeFunction): void {
      // transclusion happens here, and not in the breadcrumblink directive, as 
      // we found that transclusion does not work when cloning elements.
      // in our case we needed to clone the active link.

      transclude((transcludedElement: JQuery) => {
        let activeLink: JQuery = null;
        let links: JQuery = transcludedElement;
        for (let i: number = 0; i < transcludedElement.length; i++) {
          let link: JQuery = angular.element(links[i]);
          if (link.attr('uif-current') != null) {
            activeLink = link;
          } else {
            let anchor: JQuery = angular.element(`<a class="ms-Breadcrumb-parent" ng-href="${link.attr('ng-href')}"></a>`);
            anchor.append(link.html());
            anchor.append(angular.element('<span>&nbsp;</span>'));
            instanceElement.children().append(ctrl.$compile(anchor)(scope));
          }
        }

        if (activeLink != null) {
          let spanCurrentLarge: JQuery = angular.element("<span class='ms-Breadcrumb-currentLarge'></span>");
          let spanCurrent: JQuery = angular.element("<span class='ms-Breadcrumb-current'></span>");
          spanCurrentLarge.append(activeLink.contents().clone());
          spanCurrent.append(activeLink.contents().clone());

          instanceElement.children().prepend(spanCurrentLarge.clone());
          instanceElement.children().append(spanCurrent.clone());

        }
      });
  }
}

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
