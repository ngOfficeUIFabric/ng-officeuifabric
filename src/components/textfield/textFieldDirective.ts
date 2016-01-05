'use strict';

import * as ng from 'angular';
/**
 * @ngdoc interface
 * @name ITextFieldScope
 * @module officeuifabric.components.textfield
 * 
 * @description This is the scope used by the directive. 
 * The following properties can be set as attributes on the directive:
 * 
 * @property label: The label to display next to the text field
 * @property placeholder: A placeholder to display over the input. Will hide as soon as a user clicks on the input.
 * @property description: A longer text description to display below the text field
 * @property ngModel: The scope variable to bind to the text input. 
 * 
 * label and placeholder cannot be set at the same time! When both values are set, placeholder will be
 * ignored
 * 
 * The other attributes in this interface are for internal use only.
 */
export interface ITextFieldScope extends ng.IScope {
    label: string;
    placeholder: string;
    description: string;
    ngModel: string;

    labelShown: boolean;
    underlined: boolean;
    inputFocus: (ev: any) => void;
    inputClick: (ev: any) => void;
    inputBlur: (ev: any) => void;
    isActive: boolean;
}

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

export class TextFieldDirective implements ng.IDirective {
    public template: string =
        '<div ng-class="{\'is-active\': isActive, \'ms-TextField\': true, ' +
        '\'ms-TextField--underlined\': underlined, \'ms-TextField--placeholder\': placeholder}">' +
        '<label ng-show="labelShown" class="ms-Label">{{label || placeholder}}</label>' +
        '<input ng-model="ngModel" ng-blur="inputBlur()" ng-focus="inputFocus()" ng-click="inputClick()" class="ms-TextField-field" />' +
        '<span class="ms-TextField-description">{{description}}</span>' +
        '</div>';
    public scope: {} = {
        description: '@',
        label: '@',
        ngModel: '=',
        placeholder: '@'
    };

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
        // if (ngModel != null) {
        //     ngModel.$render = function(): void {
        //         let input: JQuery = instanceElement.find('input');
        //         input.val(ngModel.$modelValue);
        //     };
        // }
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
