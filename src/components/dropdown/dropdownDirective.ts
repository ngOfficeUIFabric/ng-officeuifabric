'use strict';

import * as angular from 'angular';

/**
 * @ngdoc interface
 * @name IDropdownScope
 * @module officeuifabric.components.dropdown
 *
 * @description
 * This is the scope used by the directive.
 *
 *
 * @property {boolean} disabled - Set to disabled
 */
export interface IDropdownScope extends angular.IScope {
  isOpen: boolean;
  disabled: boolean;
  selectedTitle: string;
  ngModel: angular.INgModelController;
}

/**
 * @ngdoc directive
 * @name uifDropdownOption
 * @module officeuifabric.components.dropdown
 *
 * @restrict E
 *
 * @description
 * `<uif-dropdown-option>` is an option directive
 *
 * @usage
 *
 * <uif-dropdown>
 *   <uif-dropdown-option value="Value">Text</uif-option>
 * </uif-dropdown>
 */
export class DropdownOptionDirective implements angular.IDirective {
  public template: string = '<li class="ms-Dropdown-item" ng-transclude></li>';
  public restrict: string = 'E';
  public require: string = '^uifDropdown';
  public replace: boolean = true;
  public transclude: boolean = true;

  public static factory(): angular.IDirectiveFactory {
    const directive: angular.IDirectiveFactory = () => new DropdownOptionDirective();

    return directive;
  }
  public compile(
    templateElement: angular.IAugmentedJQuery,
    templateAttributes: angular.IAttributes,
    transclude: angular.ITranscludeFunction): angular.IDirectivePrePost {
    return {
      post: this.postLink
    };
  }

  private postLink(
    scope: angular.IScope,
    instanceElement: angular.IAugmentedJQuery,
    attrs: any,
    dropdownController: DropdownController,
    transclude: angular.ITranscludeFunction): void {

    if (!dropdownController) {
      throw 'Dropdown controller not found!';
    }
    instanceElement
      .on('click', (ev: JQueryEventObject) => {
        scope.$apply(() => {
          dropdownController.setViewValue(instanceElement.find('span').html(), attrs.value, ev);
        });
      });
    let value: string = '' + dropdownController.getViewValue();
    if (value && value === attrs.value) {
      dropdownController.setViewValue(attrs.title, attrs.value, null);
    }
  }
}

/**
 * @ngdoc class
 * @name DropdownController
 * @module officeuifabric.components.dropdown
 *
 * @restrict E
 *
 * @description
 * DropdownController is the controller for the <uif-dropdown> directive
 *
 */
export class DropdownController {
  public static $inject: string[] = ['$element', '$scope', '$document'];
  public constructor(public $element: JQuery, public $scope: IDropdownScope, public $document: angular.IDocumentService) {
  }

  public init(): void {
    let self: DropdownController = this;
    this.$element.on('click', function (e: Event): void {
      if (!self.$scope.disabled) {
        self.$scope.isOpen = !self.$scope.isOpen;
        self.$scope.$apply();
        let dropdownWidth: number = angular.element(this.querySelector('.ms-Dropdown'))[0].clientWidth;
        angular.element(this.querySelector('.ms-Dropdown-items'))[0].style.width = dropdownWidth + 'px';
        e.stopPropagation();
        if (self.$scope.isOpen) {
          let documentClickHandler: () => void = () => {
            // when clicking somewhere in the document, close it.
            self.$scope.isOpen = false;
            self.$scope.$apply();
            self.$document.off('click', documentClickHandler);
          };
          self.$document.on('click', documentClickHandler);
          self.$scope.$on('$destroy', function (): void {
            self.$document.off('click', documentClickHandler);
          });
        }
        if (self.$scope.ngModel !== undefined && self.$scope.ngModel != null) {
          self.$scope.ngModel.$setTouched();
        }
      }
    });
    if (typeof this.$scope.ngModel !== 'undefined' && this.$scope.ngModel != null) {
      this.$scope.ngModel.$render = function (): void {
        let found: boolean = false;
        // find option with new value
        let options: JQuery = self.$element.find('li');
        for (let i: number = 0; i < options.length; i++) {
          let option: HTMLElement = options[i];
          let value: string = option.getAttribute('value');
          if (value === self.$scope.ngModel.$viewValue) {
            self.$scope.selectedTitle = angular.element(option).find('span').html();
            found = true;
            break;
          }
        }
        if (!found) {
          // no option found
          self.$scope.selectedTitle = '';
        }
      };
    }
  }

  public setViewValue(title: string, value: string, eventType: any): void {
    this.$scope.selectedTitle = title;
    this.$scope.ngModel.$setViewValue(value, eventType);
  }
  public getViewValue(): string {
    if (typeof this.$scope.ngModel !== 'undefined' && this.$scope.ngModel != null) {
      return this.$scope.ngModel.$viewValue;
    }
  }
}

/**
 * @ngdoc directive
 * @name uifDropdown
 * @module officeuifabric.components.dropdown
 *
 * @restrict E
 *
 * @description
 * `<uif-dropdown>` is a dropdown directive
 * @see https://github.com/OfficeDev/Office-UI-Fabric/tree/master/src/components/Dropdown
 *
 * @usage
 *
 * <uif-dropdown ng-model="selectedValue">
 *   <uif-option value="Value1">Text 1</uif-option>
 *   <uif-option value="Value2">Text 2</uif-option>
 *   <uif-option value="Value3">Text 3</uif-option>
 * </uif-dropdown>
 */
export class DropdownDirective implements angular.IDirective {
  public template: string = '<div ng-click="dropdownClick" ' +
  'ng-class="{\'ms-Dropdown\' : true, \'is-open\': isOpen, \'is-disabled\': disabled}" tabindex="0">' +
  '<i class="ms-Dropdown-caretDown ms-Icon ms-Icon--caretDown"></i>' +
  '<span class="ms-Dropdown-title">{{selectedTitle}}</span><ul class="ms-Dropdown-items"><ng-transclude></ng-transclude></ul></div>';

  public restrict: string = 'E';
  public transclude: boolean = true;
  public require: string[] = ['uifDropdown', '?ngModel'];
  public scope: {} = {};

  public controller: typeof DropdownController = DropdownController;

  public static factory(): angular.IDirectiveFactory {
    const directive: angular.IDirectiveFactory = () => new DropdownDirective();
    return directive;
  }
  public compile(
    templateElement: angular.IAugmentedJQuery,
    templateAttributes: angular.IAttributes,
    transclude: angular.ITranscludeFunction): angular.IDirectivePrePost {
    return {
      pre: this.preLink
    };
  }

  private preLink(
    scope: IDropdownScope,
    instanceElement: angular.IAugmentedJQuery,
    instanceAttributes: angular.IAttributes,
    ctrls: {}): void {
    let dropdownController: DropdownController = ctrls[0];
    let modelController: angular.INgModelController = ctrls[1];
    scope.ngModel = modelController;
    dropdownController.init();

    scope.$watch(
      () => { return instanceElement.attr('disabled'); },
      ((newValue) => { scope.disabled = typeof newValue !== 'undefined'; }));
    scope.disabled = 'disabled' in instanceAttributes;
  }
}

/**
 * @ngdoc module
 * @name officeuifabric.components.dropdown
 *
 * @description
 * Dropdown
 *
 */
export let module: angular.IModule = angular.module('officeuifabric.components.dropdown', [
  'officeuifabric.components'
])
  .directive('uifDropdownOption', DropdownOptionDirective.factory())
  .directive('uifDropdown', DropdownDirective.factory());
