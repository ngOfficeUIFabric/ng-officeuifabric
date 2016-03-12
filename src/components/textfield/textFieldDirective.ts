'use strict';
import {InputTypeEnum} from './uifTypeEnum';
import * as ng from 'angular';

/**
 * @ngdoc interface
 * @name ITextFieldScope
 * @module officeuifabric.components.textfield
 * 
 * @description 
 * This is the scope used by the directive. 
 * 
 * uifLabel and placeholder cannot be set at the same time! When both values are set, placeholder will be ignored. 
 * 
 * @property {string} uifLabel        - The label to display next to the text field
 * @property {string} placeholder     - A placeholder to display over the input. Will hide as soon as a user clicks on the input.
 * @property {string} uifDescription  - A longer text description to display below the text field
 * @property {string} ngModel         - The scope variable to bind to the text input. 
 * @property {InputTypeEnum} uifType  - The type of the text field
 * @property {boolean} uifMultiline   - If true, textbox will be rendered as a multiline text area
 */
export interface ITextFieldScope extends ng.IScope {
    uifLabel: string;
    placeholder: string;
    uifDescription: string;
    ngModel: string;
    uifType: InputTypeEnum;
    uifMultiline: boolean;

    labelShown: boolean;
    uifUnderlined: boolean;
    inputFocus: (ev: any) => void;
    inputClick: (ev: any) => void;
    inputBlur: (ev: any) => void;
    isActive: boolean;
}

/**
 * @ngdoc interface
 * @name ITextFieldAttributes
 * @module officeuifabric.components.textfield
 * 
 * @description 
 * This is the attribute interface used by the directive. 
 * 
 * @property {InputTypeEnum} uifType  - The type of the text field
 * @property {string} uifMultiline   - If true, textbox will be rendered as a multiline text area
 * 
 * uifMultiline needs to be a string, because the binding evaluates any non-empty string as true
 */
export interface ITextFieldAttributes extends ng.IAttributes {
    uifType: InputTypeEnum;
    uifMultiline: string;
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
 * @see {link http://dev.office.com/fabric/components/textfield}
 *
 * @usage
 * 
 * <uif-textfield uif-label='This is the label' 
 *                uif-description='This is the description'
 *                uif-Underlined
 *                placeholder='This is the placeholder' />
 */
export class TextFieldDirective implements ng.IDirective {
    public template: string =
        '<div ng-class="{\'is-active\': isActive, \'ms-TextField\': true, ' +
        '\'ms-TextField--underlined\': uifUnderlined, \'ms-TextField--placeholder\': placeholder}">' +
        '<label ng-show="labelShown" class="ms-Label">{{uifLabel || placeholder}}</label>' +
        '<input ng-model="ngModel" ng-blur="inputBlur()" ng-focus="inputFocus()" ng-click="inputClick()"' +
            'class="ms-TextField-field" ng-show="!uifMultiline" type="{{uifType}}" /> ' +
        '<textarea ng-model="ngModel" ng-blur="inputBlur()" ng-focus="inputFocus()" ng-click="inputClick()" ' +
            'class="ms-TextField-field" ng-show="uifMultiline"></textarea>' +
        '<span class="ms-TextField-description">{{uifDescription}}</span>' +
        '</div>';
    public scope: {} = {
        ngModel: '=?',
        placeholder: '@',
        uifDescription: '@',
        uifLabel: '@'
    };

    public require: string = '?ngModel';

    public restrict: string = 'E';
    public static factory(): ng.IDirectiveFactory {
        const directive: ng.IDirectiveFactory = () => new TextFieldDirective();

        return directive;
    }

    public link(scope: ITextFieldScope, instanceElement: ng.IAugmentedJQuery,
                attrs: ITextFieldAttributes, ngModel: ng.INgModelController): void {
        scope.labelShown = true;
        scope.uifUnderlined = 'uifUnderlined' in attrs;
        scope.uifType = attrs.uifType;
        scope.uifMultiline = attrs.uifMultiline === 'true';
        scope.inputFocus = function(ev: any): void {
            if (scope.uifUnderlined) {
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
            if (scope.uifUnderlined) {
                scope.isActive = false;
            }
        };
        if (ngModel != null) {
            ngModel.$render = () => {
                // when setting the ngModel value programmatically,
                // hide the placeholder when viewvalue is not empty
                if (scope.placeholder) {
                    scope.labelShown = !ngModel.$viewValue;
                }
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
