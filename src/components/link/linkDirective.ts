'use strict';

import * as ng from 'angular';
import {LinkType} from './linkTypeEnum';

/**
 * @ngdoc class
 * @name LinkController
 * @module officeuifabric.components.link
 *
 * @restrict E
 *
 * @description
 * LinkController is the controller for the <uif-link> directive.
 */
export class LinkController {
  public static $inject: string[] = ['$log'];
  constructor(public $log: ng.ILogService) { }
}

/**
 * @ngdoc directive
 * @name uifLink
 * @module officeuifabric.components.link
 *
 * @restrict E
 *
 * @description
 * `<uif-link>` is a link directive.
 *
 * @param {string=} ng-href the url
 *
 *
 * @see {link http://dev.office.com/fabric/components/link}
 *
 * @usage
 *
 * <uif-link ng-href="http://ngofficeuifabric.com">Link text</uif-link>
 */
export class LinkDirective implements ng.IDirective {

  public controller: typeof LinkController = LinkController;
  public require: string[] = ['uifLink'];
  public restrict: string = 'E';
  public template: string = '<a ng-href="{{ ngHref }}" class="ms-Link" ng-transclude></a>';
  public scope: {} = {
    ngHref: '@'
  };

  public transclude: boolean = true;
  public replace: boolean = true;

  public static factory(): ng.IDirectiveFactory {
    const directive: ng.IDirectiveFactory = () => new LinkDirective();
    return directive;
  }

  public link(scope: any, instanceElement: ng.IAugmentedJQuery, attrs: ILinkAttributes, ctrls: any[]): void {

    let linkController: LinkController = ctrls[0];

    attrs.$observe('uifType', (linkType: string) => {
      if (ng.isUndefined(LinkType[linkType])) {
        linkController.$log.error('Error [ngOfficeUiFabric] officeuifabric.components.link - "' +
        linkType + '" is not a valid value for uifType. It should be hero or regular.');
      } else {
        if (LinkType[linkType] === LinkType.hero) {
          instanceElement.addClass('ms-Link--hero');
        }
      }
    });
  }
}

/**
 * @ngdoc interface
 * @name ILinkAttributes
 * @module officeuifabric.components.link
 *
 * @description
 * Attributes that can be used on link directive.
 *
 * @property {LinkType} uifType - Indicates if the link should be rendered as regular or hero link
 * @property {string} ngHref - Addres to which link is pointing to.
 */
interface ILinkAttributes extends ng.IAttributes {
  uifType: string;
  ngHref: string;
}

/**
 * @ngdoc module
 * @name officeuifabric.components.link
 *
 * @description
 * Link
 *
 */
export var module: ng.IModule = ng.module('officeuifabric.components.link', [
    'officeuifabric.components'
  ])
  .directive('uifLink', LinkDirective.factory());
