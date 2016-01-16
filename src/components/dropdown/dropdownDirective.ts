'use strict';

import * as ng from 'angular';

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
export interface IDropdownScope extends ng.IScope {
    isOpen: boolean;
    disabled: boolean;
    selectedTitle: string;
    ngModel: ng.INgModelController;
}

/**
 * @ngdoc directive
 * @name uifOption
 * @module officeuifabric.components.dropdown
 * 
 * @restrict E
 * 
 * @description 
 * `<uif-option>` is an option directive
 *
 * @usage
 * 
 * <uif-dropdown>
 *   <uif-option value="Value">Text</uif-option>
 * </uif-dropdown>
 */
export class DropdownOptionDirective implements ng.IDirective {
    public template: string = '<li class="ms-Dropdown-item" ng-transclude></li>';
    public restrict: string = 'E';
    public require: string = '^uifDropdown';
    public replace: boolean = true;
    public transclude: boolean = true;

    public static factory(): ng.IDirectiveFactory {
        const directive: ng.IDirectiveFactory = () => new DropdownOptionDirective();

        return directive;
    }
    public compile (templateElement: ng.IAugmentedJQuery, templateAttributes: ng.IAttributes, transclude: ng.ITranscludeFunction)
        : ng.IDirectivePrePost {
        return {
            post: this.postLink
        };
    }

    private postLink(
        scope: ng.IScope,
        instanceElement: ng.IAugmentedJQuery,
        attrs: any,
        dropdownController: DropdownController,
        transclude: ng.ITranscludeFunction): void {

        if (!dropdownController) {
            throw 'Dropdown controller not found!';
        }
        instanceElement
            .on('click', (ev: JQueryEventObject) => {
                scope.$apply(() => {
                    dropdownController.setViewValue(instanceElement.find('span').html(), attrs.value, ev);
                });
            });
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
    public static $inject: string[] = ['$element', '$scope'];
    public constructor(public $element: JQuery, public $scope: IDropdownScope) {
    }

    public init(): void {
        let self: DropdownController = this;
        this.$element.bind('click', function(): void {
            if (!self.$scope.disabled) {
                self.$scope.isOpen = !self.$scope.isOpen;
                self.$scope.$apply();
                let dropdownWidth: number = angular.element(this.querySelector('.ms-Dropdown'))[0].clientWidth;
                angular.element(this.querySelector('.ms-Dropdown-items'))[0].style.width = dropdownWidth + 'px';
            }
        });
        if (typeof this.$scope.ngModel !== 'undefined'  && this.$scope.ngModel != null) {
            this.$scope.ngModel.$render = function(): void {
                // find option with new value
                let options: JQuery = self.$element.find('li');
                for (let i: number = 0; i < options.length; i++) {
                    let option: HTMLElement = options[i];
                    let value: string = option.getAttribute('value');
                    if (value === self.$scope.ngModel.$viewValue) {
                         self.$scope.selectedTitle = angular.element(option).find('span').html();
                         break;
                    }
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
            return  this.$scope.ngModel.$viewValue;
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
export class DropdownDirective implements ng.IDirective {
    public template: string = '<div ng-click="dropdownClick" ' +
        'ng-class="{\'ms-Dropdown\' : true, \'is-open\': isOpen, \'is-disabled\': disabled}" tabindex="0">' +
        '<i class="ms-Dropdown-caretDown ms-Icon ms-Icon--caretDown"></i>' +
        '<span class="ms-Dropdown-title">{{selectedTitle}}</span><ul class="ms-Dropdown-items"><ng-transclude></ng-transclude></ul></div>';

    public restrict: string = 'E';
    public transclude: boolean = true;
    public require: string[] = ['uifDropdown', '?ngModel'];
    public scope: {} = {};

    public controller: typeof DropdownController = DropdownController;

    public static factory(): ng.IDirectiveFactory {
        const directive: ng.IDirectiveFactory = () => new DropdownDirective();
        return directive;
    }
    public compile (templateElement: ng.IAugmentedJQuery, templateAttributes: ng.IAttributes, transclude: ng.ITranscludeFunction)
        : ng.IDirectivePrePost {
        return {
            pre: this.preLink
        };
    }

    private preLink(scope: IDropdownScope, instanceElement: ng.IAugmentedJQuery, instanceAttributes: ng.IAttributes, ctrls: {}): void {
        let dropdownController: DropdownController = ctrls[0];
        let modelController: ng.INgModelController = ctrls[1];
        scope.ngModel = modelController;
        dropdownController.init();
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
export var module: ng.IModule = ng.module('officeuifabric.components.dropdown', [
    'officeuifabric.components'
  ])
  .directive('uifOption', DropdownOptionDirective.factory())
  .directive('uifDropdown', DropdownDirective.factory());
