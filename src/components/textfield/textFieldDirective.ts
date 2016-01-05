'use strict';

import * as ng from 'angular';

/**
 * @ngdoc directive
 * @name uifTextfield
 * @module officeuifabric.components.textfield
 * 
 * @restrict E
 * 
 * @description 
 * `<uif-textfield>` is a textfield directive.
 * 
 * @see {link http://dev.office.com/fabric/styles}
 * @see {link https://github.com/OfficeDev/Office-UI-Fabric/tree/master/src/components/TextField}
 * 
 * @usage
 * 
 * <uif-textfield 
 *      label='This is the label' 
 *      description='This is the description'
 *      underlined
 *      placeholder='This is the placeholder'
 *       />
 */

export interface ITextFieldScope extends ng.IScope {
    labelShown: boolean;
    underlined: boolean;
    inputFocus: (ev: any) => void;
    inputClick: (ev: any) => void;
    inputBlur: (ev: any) => void;
    isActive: boolean;
    placeholder: string;
}

export class TextFieldDirective implements ng.IDirective {
    public template: string =
        '<div ng-class="{\'is-active\': isActive, \'ms-TextField\': true, ' +
            '\'ms-TextField--underlined\': underlined, \'ms-TextField--placeholder\': placeholder}">' +
            '<label ng-show="labelShown" class="ms-Label">{{label || placeholder}}</label>' +
            '<input ng-blur="inputBlur()" ng-focus="inputFocus()" ng-click="inputClick()" class="ms-TextField-field" />' +
            '<span class="ms-TextField-description">{{description}}</span>' +
        '</div>';
    public scope: {} = {
        description: '@',
        label: '@',
        placeholder: '@'
    };

    public require: string = '?ngModel';
    public restrict: string = 'E';
    public static factory(): ng.IDirectiveFactory {
        const directive: ng.IDirectiveFactory = () => new TextFieldDirective();

        return directive;
    }

    public link(scope: ITextFieldScope, instanceElement: ng.IAugmentedJQuery, attrs: ng.IAttributes, ngModel: ng.INgModelController): void {
        scope.labelShown = true;
        scope.underlined = 'underlined' in attrs;
        scope.inputFocus = function(ev: any): void {
            if (scope.underlined) {
                scope.isActive = true;
            }
        };
        scope.inputClick = function(ev: any): void {
            if (scope.placeholder) {
                scope.labelShown = false;
            }
        };
        scope.inputBlur = function (ev: any): void {
            let input: JQuery = instanceElement.find('input');
            if (scope.placeholder && input.val().length === 0) {
                scope.labelShown = true;
            }
            if (scope.underlined) {
                scope.isActive = false;
            }
        };
        if (ngModel != null) {
            ngModel.$render = function(): void {
                let input: JQuery = instanceElement.find('input');
                input.val(ngModel.$modelValue);
                input.change();
            };
        }
    }
}

/**
 * @ngdoc module
 * @name officeuifabric.components.textfield
 * 
 * @description 
 * Textfield
 * 
 */
export var module: ng.IModule = ng.module('officeuifabric.components.textfield', [
    'officeuifabric.components'
  ])
  .directive('uifTextfield', TextFieldDirective.factory());
