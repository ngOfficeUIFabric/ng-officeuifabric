'use strict';
import * as ng from 'angular';

/**
 * @ngdoc interface
 * @name ISearchBoxScope
 * @module officeuifabric.components.searchbox
 * 
 * @description 
 * This is the scope used by the directive. 
 * 
 * @property {string} placeholder - A placeholder to display over the input. Will hide as soon as a user clicks on the input.
 * @property {string} ngModel     - The scope variable to bind to the text input. 
 */
interface ISearchBoxScope extends ng.IScope {

    btnMousedown: () => void;
    inputFocus: () => void;
    inputBlur: () => void;
    isActive: boolean;
    isCancel: boolean;
    isFocus: boolean;
    isLabelHidden: boolean;
    placeholder: string;
    uifValue: string|number;
    uniqueId: number;
}
/**
 * @ngdoc directive
 * @name uifSearchbox
 * @module officeuifabric.components.searchbox
 * 
 * @restrict E
 * 
 * @description 
 * `<uif-searchbox>` is an searchbox directive.
 * 
 * @see {link http://dev.office.com/fabric/components/searchbox}
 * 
 * @usage
 * 
 * <uif-searchbox uif-value="" placeholder="" />
 */
export class SearchBoxDirective implements ng.IDirective {
    public static uniqueId: number = 1;

    public template: string = '<div class="ms-SearchBox" ng-class="{\'is-active\':isActive}">' +
    '<input class="ms-SearchBox-field" ng-focus="inputFocus()" ng-blur="inputBlur()"' +
    ' ng-model="uifValue" id="{{\'searchBox_\'+uniqueId}}" />' +
    '<label class="ms-SearchBox-label" for="{{\'searchBox_\'+uniqueId}}" ng-hide="isLabelHidden">' +
    '<i class="ms-SearchBox-icon ms-Icon ms-Icon--search" ></i>{{placeholder}}</label>' +
    '<button class="ms-SearchBox-closeButton" ng-mousedown="btnMousedown()" type="button"><i class="ms-Icon ms-Icon--x"></i></button>' +
    '</div>';


    public scope: any = {
        uifSearch: '=',
        uifValue: '='
    };

    public static factory(): ng.IDirectiveFactory {
        const directive: ng.IDirectiveFactory = () => new SearchBoxDirective();

        return directive;
    }

    public link(scope: ISearchBoxScope, elem: ng.IAugmentedJQuery, attrs: ng.IAttributes): void {

        scope.isFocus = false;
        scope.isCancel = false;
        scope.isLabelHidden = false;
        scope.isActive = false;

        scope.uniqueId = SearchBoxDirective.uniqueId++;

        scope.inputFocus = function (): void {
            scope.isFocus = true;
            scope.isLabelHidden = true;
            scope.isActive = true;
        };

        scope.inputBlur = function (): void {
            if (scope.isCancel) {
                scope.uifValue = '';
                scope.isLabelHidden = false;
            }
            scope.isActive = false;
            if (typeof (scope.uifValue) === 'undefined' || scope.uifValue === '') {
                scope.isLabelHidden = false;
            }

            scope.isFocus = scope.isCancel = false;
        };

        scope.btnMousedown = function (): void {
            scope.isCancel = true;
        };

        scope.$watch('uifValue', function (val: string|number): void {
            if (!scope.isFocus) {
                if (val && val !== '') {
                    scope.isLabelHidden = true;
                } else {
                    scope.isLabelHidden = false;
                }
                scope.uifValue = val;
            }

        });

        scope.$watch('uifSearch', function (search: string): void {
            scope.placeholder = search;
        });


    }


}
/**
 * @ngdoc module
 * @name officeuifabric.components.searchbox
 * 
 * @description 
 * Searchbox
 * 
 */
export var module: ng.IModule = ng.module('officeuifabric.components.searchbox', ['officeuifabric.components'])
    .directive('uifSearchbox', SearchBoxDirective.factory());

