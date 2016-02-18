'use strict';

import * as ng from 'angular';


export class BreadcrumbLinkDirective implements ng.IDirective {
  public restrict: string = 'E';
//  public transclude: boolean = true;
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
    // transclude((clone) => {
    //     instanceElement.append(clone);    
    //   });
  }
  public postLink(scope: any, instanceElement: ng.IAugmentedJQuery, attributes: any , uifBreadcrumbController: BreadcrumbController, transclude: ng.ITranscludeFunction): void {
    
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
          var anchor = angular.element("<a></a>");
          anchor.attr('ng-href', links[i].getAttribute('ng-href'));
          anchor.append(angular.element(links[i]).contents());
          instanceElement.children().append(anchor);
        }
      }

      if (activeLink != null) {
        console.log("Active Link");

        var spanCurrentLarge = angular.element("<span class='ms-Breadcrumb-currentLarge'></span>");
        var spanCurrent = angular.element("<span class='ms-Breadcrumb-current'></span>");
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
