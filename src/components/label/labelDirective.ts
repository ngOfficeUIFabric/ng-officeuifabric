'use strict';

import * as ng from 'angular';

/**
 * @ngdoc interface
 * @name ILabelAttributes
 * @module officeuifabric.components.label
 *
 * @description
 * Those are the attributes that can be used on label directive.
 *
 *
 * @property {string} disabled - If set, renders disabled label.
 * @property {string} required - If set, renders required label.
 */
interface ILabelAttributes extends ng.IAttributes {
  disabled: string;
  required: string;
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
export class LabelDirective implements ng.IDirective {
  public restrict: string = 'E';
  public transclude: boolean = true;
  public replace: boolean = false;
  public scope: boolean = false;
  public template: string = '<label class="ms-Label"><ng-transclude/></label>';

  public static factory(): ng.IDirectiveFactory {
    const directive: ng.IDirectiveFactory = () => new LabelDirective();
    return directive;
  }

  public link(scope: ng.IScope, instanceElement: ng.IAugmentedJQuery, attributes: ILabelAttributes): void {

    if (ng.isDefined(attributes.disabled)) {
      instanceElement.find('label').eq(0).addClass('is-disabled');
    }

    if (ng.isDefined(attributes.required)) {
      instanceElement.find('label').eq(0).addClass('is-required');
    }
  }
}

/**
 * @ngdoc module
 * @name officeuifabric.components.label
 *
 * @description
 * Label
 */
export var module: ng.IModule = ng.module('officeuifabric.components.label', ['officeuifabric.components'])
  .directive('uifLabel', LabelDirective.factory());
