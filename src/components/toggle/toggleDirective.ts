'use strict';

import * as ng from 'angular';

/**
 * @ngdoc interface
 * @name IToggleScope
 * @module officeuifabric.components.toggle
 * 
 * @description 
 * This is the scope used by the directive. 
 *  
 * 
 * @property {string} ngModel         - The scope variable to bind to the toggle.
 * @property {string} uifLabelOff     - The label to display when not toggled
 * @property {string} uifLabelOn      - The label to display when toggled
 * @property {string} uifTextLocation - Location of the label (left or right), compared to the toggle  
 */

export interface IToggleScope {
    ngModel: string;
    uifLabelOff: string;
    uifLabelOn: string;
    uifTextLocation: string;
    uniqueId: number;
    toggleClass: string;
}

/**
 * @ngdoc directive
 * @name uifToggle
 * @module officeuifabric.components.toggle
 * 
 * @restrict E
 * 
 * @description 
 * `<uif-toggle>` is a toggle directive.
 * 
 * @see {link http://officeuifabric.com/components/toggle/}
 * 
 * @usage
 * 
 * <uif-toggle ng-model='toggled' />
 */
export class ToggleDirective implements ng.IDirective {
    public template: string = '<div ng-class="toggleClass">' +
                 '<span class="ms-Toggle-description"><ng-transclude/></span>' +
                '<input type="checkbox" id="{{::$id}}" class="ms-Toggle-input" ng-model="ngModel" />' +
                '<label for="{{::$id}}" class="ms-Toggle-field">' +
                    '<span class="ms-Label ms-Label--off">{{uifLabelOff}}</span>' +
                    '<span class="ms-Label ms-Label--on">{{uifLabelOn}}</span>' +
                '</label>' +
                '</div>';
    public restrict: string = 'E';
    public transclude: boolean = true;
    public scope: {} = {
        ngModel: '=',
        uifLabelOff: '@',
        uifLabelOn: '@',
        uifTextLocation: '@'
    };

    public static factory(): ng.IDirectiveFactory {
        const directive: ng.IDirectiveFactory = () => new ToggleDirective();
        return directive;
    }

    public link(scope: IToggleScope, elem: ng.IAugmentedJQuery, attrs: ng.IAttributes): void {
        scope.toggleClass = 'ms-Toggle';

        if (scope.uifTextLocation) {
            let loc: string = scope.uifTextLocation;
            loc = loc.charAt(0).toUpperCase() + loc.slice(1);
            scope.toggleClass += ' ms-Toggle--text' + loc;
        }
    }
}

/**
 * @ngdoc module
 * @name officeuifabric.components.toggle
 * 
 * @description 
 * Toggle
 * 
 */
export var module: ng.IModule = ng.module('officeuifabric.components.toggle', [
    'officeuifabric.components'
  ])
  .directive('uifToggle', ToggleDirective.factory());
