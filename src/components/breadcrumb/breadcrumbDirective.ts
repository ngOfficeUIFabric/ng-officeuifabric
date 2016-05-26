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

    let tabindex: number = Array.prototype.indexOf.call(instanceElement.parent().children(), instanceElement[0]) + 2;
    scope.uifTabindex = tabindex;
  }
}

/**
 * @ngdoc object
 * @name BreadcrumbLink
 * @module officeuifabric.components.breadcrumb
 *
 * @description
 * Object defininf structure for breadcrumb links
 *
 * @property {string} href      - value for the href attribute for link
 * @property {string} linkText  - text of the link
 */
export class BreadcrumbLink {
  constructor(public href: string, public linkText: string) { }
}

/**
 * @ngdoc interface
 * @name IBreadcrumbScope
 * @module officeuifabric.components.breadcrumb
 *
 * @description
 * This is the scope used by uifBreadcrumb directive.
 *
 * @property {array} uifBreadcrumbLinks   - Collection of items to be rendered as breadcrumb elements.
 * @property {number} visibleElements     - Number of breadcrumb items visible, based on screen width.
 * @property {function} overflowElements  - Function returning number of elements that should be placed in overflow menu.
 * @property {boolean} overflowMenuOpen   - Indicates whether overlfow menu is open or not.
 * @property {function} openOverflow      - Handler for opening overflow menu.
 * @property {function} isOverflow        - Function determining if thre are overflow elements.
 *                                          Returns true if there are such elements, false otherwise.
 */
export interface IBreadcrumbScope extends ng.IScope {
  uifBreadcrumbLinks: BreadcrumbLink[];
  visibleElements: number;
  overflowElements: () => number;

  overflowMenuOpen: boolean;
  openOverflow: (event: ng.IAngularEvent) => void;

  isOverflow: () => boolean;
}

/**
 * @ngdoc class
 * @name BreadcrumbController
 * @module officeuifabric.components.breadcrumb
 *
 * @description This is the controller for the breadcrumb component
 */
export class BreadcrumbController {
  public static $inject: string[] = ['$scope', '$document', '$window'];

  private static _breakingWidth: number = 639;
  constructor(public $scope: IBreadcrumbScope, public $document: ng.IDocumentService, public $window: ng.IWindowService) {
    let windowElement: ng.IAugmentedJQuery = ng.element($window);

    $scope.visibleElements = 4;
    $scope.overflowMenuOpen = false;

    $scope.isOverflow = () => {
      let overflow: boolean = false;
      overflow = ng.isDefined($scope.uifBreadcrumbLinks) && $scope.uifBreadcrumbLinks.length > $scope.visibleElements;
      return overflow;
    };

    $scope.overflowElements = () => {
      return $scope.isOverflow() ? $scope.uifBreadcrumbLinks.length - $scope.visibleElements : 0;
    };

    $scope.openOverflow = (event: ng.IAngularEvent) => {
      event.stopPropagation();
      $scope.overflowMenuOpen = true;

    };

    $document.find('html').on('click', (event: any) => {
      $scope.overflowMenuOpen = false;
      $scope.$apply();
    });

    windowElement.on('resize', () => {
      let width: number = $window.innerWidth;

      let elementsToShow: number = (width > BreadcrumbController._breakingWidth) ? 4 : 2;
      if (elementsToShow !== $scope.visibleElements) {
        $scope.visibleElements = elementsToShow;
        $scope.$apply();
      }

    });
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
  public replace: boolean = true;
  public template: string = '' +
  '<div class="ms-Breadcrumb" ng-class="{\'is-overflow\': isOverflow()}">' +
  '<div class="ms-Breadcrumb-overflow">' +
  '<div class="ms-Breadcrumb-overflowButton ms-Icon ms-Icon--ellipsis" ng-click="openOverflow($event)" tabindex="1">' +
  '</div>' +
  '<i class="ms-Breadcrumb-chevron ms-Icon ms-Icon--chevronRight"></i>' +
  '<div class="ms-Breadcrumb-overflowMenu" ng-class="{\'is-open\': overflowMenuOpen}">' +
  '<ul class="ms-ContextualMenu is-open">' +
    '<li class="ms-ContextualMenu-item" ' +
    'ng-repeat="link in uifBreadcrumbLinks | limitTo:overflowElements()">' +
    '<a class="ms-ContextualMenu-link" ng-href="{{link.href}}">{{link.linkText}}</a>' +
    '</li>' +
  '</ul>' +
  '</div>' +
  '</div>' +
  '<ul class="ms-Breadcrumb-list">' +
  '<uif-breadcrumb-link ng-repeat="link in uifBreadcrumbLinks | limitTo:-visibleElements" ' +
  'ng-href="{{link.href}}">{{link.linkText}}</uif-breadcrumb-link>' +
  '</ul>' +
  '</div>';
  public controller: typeof BreadcrumbController = BreadcrumbController;
  public require: string = 'uifBreadcrumb';
  public scope: any = {
    'uifBreadcrumbLinks': '='
  };

  public static factory(): ng.IDirectiveFactory {
    const directive: ng.IDirectiveFactory = () => new BreadcrumbDirective();
    return directive;
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
