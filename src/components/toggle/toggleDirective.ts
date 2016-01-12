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
 * @property {string} ngModel      - The scope variable to bind to the toggle.
 * @property {string} labelOff     - The label to display when not toggled
 * @property {string} labelOn      - The label to display when toggled
 * @property {string} textLocation - Location of the label (left or right), compared to the toggle  
 */
export interface IToggleScope {
    ngModel: string;
    labelOff: string;
    labelOn: string;
    textLocation: string;
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
                '<input type="checkbox" id="{{uniqueId}}" class="ms-Toggle-input" ng-model="ngModel" />' +
                '<label for="{{uniqueId}}" class="ms-Toggle-field">' +
                    '<span class="ms-Label ms-Label--off">{{labelOff}}</span>' +
                    '<span class="ms-Label ms-Label--on">{{labelOn}}</span>' +
                '</label>' +
                '</div>';
    public restrict: string = 'E';
    public transclude: boolean = true;
    public uniqueId: number = 1;
    public scope: {} = {
        labelOff: '@',
        labelOn: '@',
        ngModel: '=',
        textLocation: '@'
    };

    public static factory(): ng.IDirectiveFactory {
        const directive: ng.IDirectiveFactory = () => new ToggleDirective();
        return directive;
    }

    public link(scope: IToggleScope, elem: ng.IAugmentedJQuery, attrs: ng.IAttributes): void {
        if (!this.uniqueId) {
            this.uniqueId = 1;
        }

        scope.uniqueId = this.uniqueId++;
        scope.toggleClass = 'ms-Toggle';

        if (scope.textLocation) {
            let loc: string = scope.textLocation;
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
