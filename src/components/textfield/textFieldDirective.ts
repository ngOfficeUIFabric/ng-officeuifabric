'use strict';

import * as ng from 'angular';
import {InputTypeEnum} from './uifTypeEnum';

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
 * @property {string} ngChange        - The expression to evaluate when the ngModel changes
 * @property {InputTypeEnum} uifType  - The type of the text field
 * @property {boolean} uifMultiline   - If true, textbox will be rendered as a multiline text area
 *
 */
export interface ITextFieldScope extends ng.IScope {
  uifLabel: string;
  placeholder: string;
  uifDescription: string;
  ngModel: string;
  ngChange: string;
  uifType: InputTypeEnum;
  uifMultiline: boolean;

  labelShown: boolean;
  uifUnderlined: boolean;
  inputFocus: (ev: any) => void;
  inputBlur: (ev: any) => void;
  labelClick: (ev: any) => void;
  isActive: boolean;
  required: boolean;
  disabled: boolean;
}

/**
 * @ngdoc interface
 * @name ITextFieldAttributes
 * @module officeuifabric.components.textfield
 *
 * @description
 * This is the attribute interface used by the directive.
 *
 * @property {InputTypeEnum} uifType - The type of the text field
 * @property {string} uifMultiline   - If true, textbox will be rendered as a multiline text area
 *
 */
export interface ITextFieldAttributes extends ng.IAttributes {
    uifType: InputTypeEnum;
    uifMultiline: string;
}

/**
 * @controller
 * @name TextFieldController
 * @private
 * @description
 * Used to more easily inject the Angular $log service into the directive.
 */
class TextFieldController {
  public static $inject: string[] = ['$log'];
  constructor(public $log: ng.ILogService) {
  }
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
  public controller: typeof TextFieldController = TextFieldController;

  public template: string =
  '<div ng-class="{\'is-active\': isActive, \'ms-TextField\': true, ' +
  '\'ms-TextField--underlined\': uifUnderlined, \'ms-TextField--placeholder\': placeholder, ' +
  '\'is-required\': required, \'is-disabled\': disabled, \'ms-TextField--multiline\' : uifMultiline }">' +
  '<label ng-show="labelShown" class="ms-Label" ng-click="labelClick()">{{uifLabel || placeholder}}</label>' +
  '<input ng-model="ngModel" ng-change="ngChange" ng-blur="inputBlur()" ng-focus="inputFocus()" ng-click="inputClick()" ' +
      'class="ms-TextField-field" ng-show="!uifMultiline" ng-disabled="disabled" type="{{uifType}}" />' +
  '<textarea ng-model="ngModel" ng-blur="inputBlur()" ng-focus="inputFocus()" ng-click="inputClick()" ' +
      'class="ms-TextField-field" ng-show="uifMultiline" ng-disabled="disabled"></textarea>' +
  '<span class="ms-TextField-description">{{uifDescription}}</span>' +
  '</div>';
  public scope: {} = {
    ngModel: '=?',
    ngChange: '=?',
    placeholder: '@',
    uifDescription: '@',
    uifLabel: '@'
  };

  public require: string[] = ['uifTextfield', '?ngModel'];

  public restrict: string = 'E';
  public static factory(): ng.IDirectiveFactory {
    const directive: ng.IDirectiveFactory = () => new TextFieldDirective();

    return directive;
  }

  public link(scope: ITextFieldScope, instanceElement: ng.IAugmentedJQuery,
              attrs: ITextFieldAttributes, controllers: any[]): void {

    let controller: TextFieldController = controllers[0];
    let ngModel: ng.INgModelController = controllers[1];

    scope.disabled = 'disabled' in attrs;
    scope.$watch(
      () => { return instanceElement.attr('disabled'); },
      ((newValue) => { scope.disabled = typeof newValue !== 'undefined'; })
    );
    scope.labelShown = true;
    scope.required = 'required' in attrs;
    scope.uifMultiline = attrs.uifMultiline === 'true';
    scope.uifType = attrs.uifType;
    scope.$watch(
      'uifType',
      (newValue: string, oldValue: string) => {
        if (typeof newValue !== 'undefined') {
          // verify a valid type was passed in
          if (InputTypeEnum[newValue] === undefined) {
            controller.$log.error('Error [ngOfficeUiFabric] officeuifabric.components.textfield - Unsupported type: ' +
            'The type (\'' + scope.uifType + '\') is not supported by the Office UI Fabric. ' +
            'Supported options are listed here: ' +
            'https://github.com/ngOfficeUIFabric/ng-officeuifabric/blob/master/src/components/textfield/uifTypeEnum.ts');
          }
        } else {
          // default value
          scope.uifType = InputTypeEnum.text;
        }
      }
    );
    scope.uifUnderlined = 'uifUnderlined' in attrs;
    scope.inputFocus = function (ev: any): void {
      if (scope.placeholder) {
        scope.labelShown = false;
      }
      scope.isActive = true;
    };
    scope.inputBlur = function (ev: any): void {
      let input: JQuery = instanceElement.find('input');
      if (scope.placeholder && input.val().length === 0) {
        scope.labelShown = true;
      }
      scope.isActive = false;
    };
    scope.labelClick = function(ev: any): void {
      if (scope.placeholder) {
          let input: JQuery = scope.uifMultiline  ? instanceElement.find('textarea')
                                                  : instanceElement.find('input');
          input[0].focus();
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
