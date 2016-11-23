'use strict';

import * as angular from 'angular';

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
export interface IBreadcrumbLinkScope extends angular.IScope {
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
export class BreadcrumbLinkDirective implements angular.IDirective {
  public restrict: string = 'E';
  public require: string = '^uifBreadcrumb';
  public transclude: boolean = true;
  public replace: boolean = true;
  public template: string = `
  <li class="ms-Breadcrumb-listItem">
    <a class="ms-Breadcrumb-itemLink" ng-href="{{ngHref}}" tabindex="{{uifTabindex}}" ng-transclude></a>
    <i class="ms-Breadcrumb-chevron ms-Icon ms-Icon--chevronRight"></i>
  </li>`;
  public scope: {} = {
    ngHref: '@'
  };

  public static factory(): angular.IDirectiveFactory {
    const directive: angular.IDirectiveFactory = () => new BreadcrumbLinkDirective();
    return directive;
  }
  public link(
    scope: IBreadcrumbLinkScope,
    instanceElement: angular.IAugmentedJQuery,
    attributes: any,
    ctrl: BreadcrumbController,
    transclude: angular.ITranscludeFunction): void {

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
 * @property {function} adjustVisibleElements - Determine visible elements count based on size
 */
export interface IBreadcrumbScope extends angular.IScope {
  uifBreadcrumbLinks: BreadcrumbLink[];
  visibleElements: number;
  overflowElements: () => number;

  overflowMenuOpen: boolean;
  openOverflow: (event: angular.IAngularEvent) => void;
  isOverflow: () => boolean;

  onResize: () => void;
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

  // private static _breakingWidth: number = 639;
  constructor(public $scope: IBreadcrumbScope, public $document: angular.IDocumentService, public $window: angular.IWindowService) { }
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

export class BreadcrumbDirective implements angular.IDirective {
  public restrict: string = 'E';
  public replace: boolean = true;
  public template: string = `
  <div class="ms-Breadcrumb" ng-class="{\'is-overflow\': isOverflow()}">
    <div class="ms-Breadcrumb-overflow">
      <div class="ms-Breadcrumb-overflowButton ms-Icon ms-Icon--ellipsis"
           ng-click="openOverflow($event)" tabindex="1"></div>
      <i class="ms-Breadcrumb-chevron ms-Icon ms-Icon--chevronRight"></i>
      <div class="ms-Breadcrumb-overflowMenu" ng-class="{\'is-open\': overflowMenuOpen}">
        <ul class="ms-ContextualMenu is-open">
          <li class="ms-ContextualMenu-item"
              ng-repeat="link in uifBreadcrumbLinks | limitTo:overflowElements()">
            <a class="ms-ContextualMenu-link" ng-href="{{link.href}}">{{link.linkText}}</a>
          </li>
        </ul>
      </div>
    </div>
    <ul class="ms-Breadcrumb-list">
      <uif-breadcrumb-link ng-repeat="link in uifBreadcrumbLinks | limitTo:-visibleElements"
                           ng-href="{{link.href}}">{{link.linkText}}</uif-breadcrumb-link>
    </ul>
  </div>`;
  public controller: typeof BreadcrumbController = BreadcrumbController;
  public require: string = 'uifBreadcrumb';
  public scope: any = {
    'uifBreadcrumbLinks': '='
  };
  private SMALL_BREAK_POINT: number = 639;

  public static factory(): angular.IDirectiveFactory {
    const directive: angular.IDirectiveFactory = () => new BreadcrumbDirective();
    return directive;
  }

  public link: angular.IDirectiveLinkFn = (
    $scope: IBreadcrumbScope,
    $instanceElement: angular.IAugmentedJQuery,
    $attrs: any,
    $breadcrumbController: BreadcrumbController): void => {

    $scope.visibleElements = 4;
    $scope.overflowMenuOpen = false;

    $scope.isOverflow = () => {
      let overflow: boolean = false;
      overflow = angular.isDefined($scope.uifBreadcrumbLinks) && $scope.uifBreadcrumbLinks.length > $scope.visibleElements;
      return overflow;
    };

    $scope.overflowElements = () => {
      return $scope.isOverflow() ? $scope.uifBreadcrumbLinks.length - $scope.visibleElements : 0;
    };

    $scope.openOverflow = (event: angular.IAngularEvent) => {
      event.stopPropagation();
      $scope.overflowMenuOpen = true;
    };

    angular.element($breadcrumbController.$window).bind('resize', () => {
      $scope.onResize();
      $scope.$digest();
    });

    $breadcrumbController.$document.find('html').on('click', (event: any) => {
      $scope.overflowMenuOpen = false;
      $scope.$apply();
    });

    $scope.onResize = (innerWidth?: number) => {
      if (innerWidth === undefined) {
        innerWidth = window.innerWidth;
      }

      let elementsToShow: number = (innerWidth > this.SMALL_BREAK_POINT) ? 4 : 2;
      if (elementsToShow !== $scope.visibleElements) {
        $scope.visibleElements = elementsToShow;
        $scope.$apply();
      }
    };

    $scope.onResize();
  }
}

/**
 * @ngdoc module
 * @name officeuifabric.components.breadcrumb
 *
 * @description
 * Breadcrumb
 */
export let module: angular.IModule = angular.module('officeuifabric.components.breadcrumb', ['officeuifabric.components'])
  .directive('uifBreadcrumb', BreadcrumbDirective.factory())
  .directive('uifBreadcrumbLink', BreadcrumbLinkDirective.factory());
