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
 * @property {string} value       - The scope variable to bind to the text input.
 */
interface ISearchBoxScope extends ng.IScope {

  btnMousedown: () => void;
  inputFocus: () => void;
  inputBlur: () => void;
  inputChange: () => void;
  isActive: boolean;
  isCancel: boolean;
  isFocus: boolean;
  isLabelHidden: boolean;
  isDisabled: boolean;
  placeholder: string;
  value: string;
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
 * <uif-searchbox value="" placeholder="" />
 */
export class SearchBoxDirective implements ng.IDirective {

  public template: string = '<div class="ms-SearchBox" ng-class="{\'is-active\':isActive, \'is-disabled\':isDisabled}">' +
  '<input class="ms-SearchBox-field" ng-focus="inputFocus()" ng-blur="inputBlur()"' +
  ' ng-model="value" ng-change="inputChange()" id="{{::\'searchBox_\'+$id}}" ng-disabled="isDisabled" />' +
  '<label class="ms-SearchBox-label" for="{{::\'searchBox_\'+$id}}" ng-hide="isLabelHidden">' +
  '<i class="ms-SearchBox-icon ms-Icon ms-Icon--search" ></i> {{placeholder}}</label>' +
  '<button class="ms-SearchBox-closeButton" ng-mousedown="btnMousedown()" type="button"><i class="ms-Icon ms-Icon--x"></i></button>' +
  '</div>';

  public require: string[] = ['?ngModel'];

  public scope: any = {
    placeholder: '=?',
    value: '=?ngModel'
  };

  public static factory(): ng.IDirectiveFactory {
    const directive: ng.IDirectiveFactory = () => new SearchBoxDirective();

    return directive;
  }

  public link(scope: ISearchBoxScope, elem: ng.IAugmentedJQuery, attrs: ng.IAttributes, controllers: any[]): void {

    let ngModelCtrl: ng.INgModelController;
    if (ng.isDefined(controllers) && controllers.length > 0) {
      ngModelCtrl = controllers[0];
    }

    scope.isFocus = false;
    scope.isCancel = false;
    scope.isLabelHidden = false;
    scope.isActive = false;

    scope.inputFocus = function(): void {
      scope.isFocus = true;
      scope.isLabelHidden = true;
      scope.isActive = true;
    };

    scope.inputChange = function(): void {
      if (ngModelCtrl !== null) {
        ngModelCtrl.$setDirty();
      }
    };

    scope.inputBlur = function(): void {
      if (scope.isCancel) {

        if (ngModelCtrl !== null) {
          ngModelCtrl.$setViewValue('');
        } else {
          scope.value = '';
        }
        scope.isLabelHidden = false;
      }
      scope.isActive = false;
      if (typeof (scope.value) === 'undefined' || scope.value === '') {
        scope.isLabelHidden = false;
      }

      scope.isFocus = scope.isCancel = false;

      if (ngModelCtrl !== null) {
        ngModelCtrl.$setTouched();
      }
    };

    scope.btnMousedown = function(): void {
      scope.isCancel = true;
    };

    scope.$watch('value', function(val: string): void {
      if (!scope.isFocus) {
        if (val && val !== '') {
          scope.isLabelHidden = true;
        } else {
          scope.isLabelHidden = false;
        }
        scope.value = val;
        if (ngModelCtrl !== null) {
          ngModelCtrl.$setViewValue(val);
        } else {
          scope.value = val;
        }
      }

    });

    scope.$watch('placeholder', function(search: string): void {
      scope.placeholder = search;
    });

    attrs.$observe('disabled', (disabled) => {
      scope.isDisabled = !!disabled;
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
