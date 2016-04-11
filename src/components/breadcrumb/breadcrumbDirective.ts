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
 *   <uif-breadcrumb-link ng-href="https://github.com">GitHub</uif-breadcrumb-link>
 *   <uif-breadcrumb-link ng-href="https://office.com">Office</uif-breadcrumb-link>
 * </uif-breadcrumb>
 */

export class BreadcrumbDirective implements ng.IDirective {
  public restrict: string = 'E';
  public transclude: boolean = true;
  public replace: boolean = true;
  public template: string = '<div class="ms-Breadcrumb"></div>';
  public controller: typeof BreadcrumbController = BreadcrumbController;
  public require: string = 'uifBreadcrumb';

  public static factory(): ng.IDirectiveFactory {
    const directive: ng.IDirectiveFactory = () => new BreadcrumbDirective();
    return directive;
  }

  public link(scope: ng.IScope,
              instanceElement: ng.IAugmentedJQuery,
              attributes: any,
              ctrl: BreadcrumbController,
              transclude: ng.ITranscludeFunction): void {
    // transclusion happens here, and not in the breadcrumblink directive, as
    // we found that transclusion does not work when cloning elements.
    // in our case we needed to clone the active link.

    transclude((transcludedElement: JQuery) => {
      let breadcrumbList: JQuery = angular.element('<ul></ul>');
      breadcrumbList.addClass('ms-Breadcrumb-list');

      let tabIndex: number = 1;
      let breadcrumbLinks: JQuery = transcludedElement;
      for (let bcLinkIndex: number = 0; bcLinkIndex < transcludedElement.length; bcLinkIndex++) {
        let link: JQuery = angular.element(breadcrumbLinks[bcLinkIndex]);

        // if not a <uif-breadcrumb-link>, skip it as text is getting picked up
        if (link[0].nodeName === '#text') {
          continue;
        }

        // create list item
        let liElement: JQuery = angular.element('<li></li>');
        liElement.addClass('ms-Breadcrumb-listItem');

        // create link
        let aElement: JQuery = angular.element('<a></a>');
        aElement.addClass('ms-Breadcrumb-itemLink');
        aElement.attr('tabindex', ++tabIndex);
        aElement.attr('href', link.attr('ng-href'));
        aElement.append(link[0].innerHTML);
        liElement.append(aElement);

        // create icon
        let iconElement: JQuery = angular.element(`<i></i>`);
        iconElement.addClass('ms-Breadcrumb-chevron ms-Icon ms-Icon--chevronRight');
        liElement.append(iconElement);

        // add item to list
        breadcrumbList.append(liElement);
      }

      // add overflow
      let overflowDiv: JQuery = angular.element('<div></div>');
      overflowDiv.addClass('ms-Breadcrumb-overflow');

      let overflowButtonDiv: JQuery = angular.element('<div></div>');
      overflowButtonDiv.addClass('ms-Breadcrumb-overflowButton ms-Icon ms-Icon--ellipsis');
      overflowButtonDiv.attr('tabindex', '1');
      overflowDiv.append(overflowButtonDiv);

      let iIcon: JQuery = angular.element('<i></i>');
      iIcon.addClass('ms-Breadcrumb-chevron ms-Icon ms-Icon--chevronRight');
      overflowDiv.append(iIcon);

      // add list to element
      instanceElement.append(overflowDiv);
      instanceElement.append(breadcrumbList);
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
