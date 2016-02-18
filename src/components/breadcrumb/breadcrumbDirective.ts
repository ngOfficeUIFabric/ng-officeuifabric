'use strict';

import * as ng from 'angular';


export class BreadcrumbLinkDirective implements ng.IDirective {
  public restrict: string = 'E';
  public transclude: boolean = true;
  // public template: string = 
  //   '<span class="CURRENT" ng-if="uifCurrent"><ng-transclude /></span>' +
  //   '<a ng-href="ngHref" class="ms-Breadcrumb-parent" ng-if="!uifCurrent"><ng-transclude /></a>';
  //public template: string = "<ng-transclude></ng-transclude>";
  public require: string = '^?uifBreadcrumb';
  public scope: {} = {
    'ngHref': '=',
    'uifCurrent': '@'
  };

  public static factory(): ng.IDirectiveFactory {
    const directive: ng.IDirectiveFactory = () => new BreadcrumbLinkDirective();
    return directive;
  }

  public compile (templateElement: ng.IAugmentedJQuery, templateAttributes: ng.IAttributes, transclude: ng.ITranscludeFunction)
        : ng.IDirectivePrePost {
      return {
                post: this.postLink,
                pre: this.preLink
            };
    }

  public preLink(scope: any, instanceElement: ng.IAugmentedJQuery, attributes: any, uifBreadcrumbController: BreadcrumbController, transclude: ng.ITranscludeFunction): void {
  }
  public postLink(scope: any, instanceElement: ng.IAugmentedJQuery, attributes: any , uifBreadcrumbController: BreadcrumbController, transclude: ng.ITranscludeFunction): void {
    transclude((clone) => {
        instanceElement.append(clone);    
      });
  }
}

export class BreadcrumbController {
    public static $inject: string[] = ['$element', '$compile', '$scope'];

    constructor(public $element: ng.IAugmentedJQuery, public $compile: ng.ICompileService, public $scope: any){
    }
}
/**
 * @ngdoc directive
 * @name uifLabel
 * @module officeuifabric.components.label
 *
 * @restrict E
 *
 * @description
 * `<uif-label>` is and directive for rendering label component.
 * @see https://github.com/OfficeDev/Office-UI-Fabric/tree/master/src/components/Label
 *
 * @usage
 *
 * <uif-label>Name</uif-label>
 */
export class BreadcrumbDirective implements ng.IDirective {
  public restrict: string = 'E';
  public transclude: boolean = true;
  public template: string = '<div class="ms-Breadcrumb">' + 
    '</div>';
  public controller: typeof BreadcrumbController = BreadcrumbController;
  public require: string = 'uifBreadcrumb';
  
  public static factory(): ng.IDirectiveFactory {
    const directive: ng.IDirectiveFactory = () => new BreadcrumbDirective();
    return directive;
  }
  
  public compile (templateElement: ng.IAugmentedJQuery, templateAttributes: ng.IAttributes, transclude: ng.ITranscludeFunction)
        : ng.IDirectivePrePost {
            
      return {
                pre: this.preLink
            };
    }


//todo scope interface
  public preLink(scope: any, instanceElement: ng.IAugmentedJQuery, attributes: any, ctrl: BreadcrumbController, transclude: ng.ITranscludeFunction): void {
    transclude((transcludedElement) => {
      let activeLink: JQuery = null;
      let links: JQuery = transcludedElement;
      for (let i: number = 0; i < transcludedElement.length; i++) {
        if (links[i].getAttribute('uif-current') != null) {
          activeLink = angular.element(links[i]);
        } else {
          instanceElement.children().append(links[i]);
        }
      }

      if (activeLink != null) {
        console.log("Active Link");

        // TODO: Below does not work (transcluded elements are gone)
        instanceElement.prepend(ctrl.$compile(activeLink.clone())(scope));
        instanceElement.prepend(ctrl.$compile(activeLink.clone())(scope));

        // THIS does work:
        // instanceElement.prepend(ctrl.$compile(activeLink)(scope));
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
