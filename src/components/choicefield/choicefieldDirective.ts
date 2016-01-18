'use strict';

import * as ng from 'angular';
import {ChoicefieldType} from './choicefieldTypeEnum';

/**
 * @ngdoc interface
 * @name IChoicefieldOptionScope
 * @module officeuifabric.components.choicefield
 * 
 * @description 
 * This is the scope used by the choicefield option directive. 
 *
 * 
 * @property {string=} ngModel           - Set the ng-model
 * @property {string=} ngTrueValue       - Set the ng-true-value. Can only be used with checkbox
 * @property {string=} ngFalseValue      - Set the ng-false-value. Can only be used with checkbox
 * @property {boolean=} disabled         - Set to disable the element
 * @property {choicefieldType=} uifType  - Radio or Checkbox
 */
export interface IChoicefieldOptionScope extends ng.IScope {
    ngModel: ng.INgModelController;
    ngTrueValue: string;
    ngFalseValue: string;
    disabled: boolean;
    uifType: ChoicefieldType;
}

/**
 * @ngdoc interface
 * @name IChoicefieldGroupScope
 * @module officeuifabric.components.choicefield
 * 
 * @description 
 * This is the scope used by the choicefield group directive. 
 *
 * 
 * @property {string=} ngModel     - Set the ng-model
 * @property {boolean=} disabled   - Set to disable the element
 */
export interface IChoicefieldGroupScope extends ng.IScope {
    ngModel: ng.INgModelController;
    disabled: boolean;
}
/**
 * @ngdoc class
 * @name ChoicefieldOptionController
 * @module  officeuifabric.components.choicefield
 * 
 * @description
 * This is the controller for the <uif-choicefield-option> directive
 */
export class ChoicefieldOptionController {
    public static $inject: string[] = ['$log'];
    constructor(public $log: ng.ILogService) {}
}

/**
 * @ngdoc directive
 * @name uifChoicefieldOption
 * @module officeuifabric.components.choicefield
 * 
 * @restrict E
 * 
 * @description 
 * `<uif-choicefield-option>` is an option directive (radio or checkbox)
 * Can be used in uif-choicefield-group, or as a single element
 *
 * @usage
 * 
 * <uif-choicefield-option uif-type="checkbox" value="Option1" 
 *      ng-model="selectedValue" ng-true-value="\'TRUEVALUE\'" ng-false-value="\'FALSEVALUE\'">Option 1</uif-choicefield>
 */
export class ChoicefieldOptionDirective implements ng.IDirective {
    public template: string = '<div class="ms-ChoiceField">' +
        '<input id="{{::$id}}" class="ms-ChoiceField-input" type="{{uifType}}" value="{{value}}" ' +
            'ng-model="ngModel" ng-true-value="{{ngTrueValue}}" ng-false-value="{{ngFalseValue}}" />' +
            '<label for="{{::$id}}" class="ms-ChoiceField-field"><span class="ms-Label" ng-transclude></span></label>' +
        '</div>';
    public restrict: string = 'E';
    public require: string[] = ['uifChoicefieldOption', '^?uifChoicefieldGroup'];
    public replace: boolean = true;
    public transclude: boolean = true;
    public scope: {} = {
        ngFalseValue: '@',
        ngModel: '=',
        ngTrueValue: '@',
        uifType: '@',
        value: '@'
    };
    public controller: typeof ChoicefieldOptionController = ChoicefieldOptionController;

    public static factory(): ng.IDirectiveFactory {
        const directive: ng.IDirectiveFactory = () =>
            new ChoicefieldOptionDirective();

        return directive;
    }

    public compile (templateElement: ng.IAugmentedJQuery, templateAttributes: ng.IAttributes, transclude: ng.ITranscludeFunction)
        : ng.IDirectivePrePost {
            let input: ng.IAugmentedJQuery = templateElement.find('input');
            if (!('ngModel' in templateAttributes)) {
                // remove ng-model, as this is an optional attribute.
                // if not removed, this will have unwanted side effects
                input.removeAttr('ng-model');
            }
            return {
                pre: this.preLink
            };
    }

    private preLink(
        scope: IChoicefieldOptionScope,
        instanceElement: ng.IAugmentedJQuery,
        attrs: any,
        ctrls: any[],
        transclude: ng.ITranscludeFunction): void {
            let choicefieldOptionController: ChoicefieldOptionController = ctrls[0];
            let choicefieldGroupController: ChoicefieldGroupController = ctrls[1];
            scope.$watch('uifType', (newValue: string, oldValue: string) => {
                if (ChoicefieldType[newValue] === undefined) {
                    choicefieldOptionController.$log.error('Error [ngOfficeUiFabric] officeuifabric.components.choicefield - "' +
                        newValue + '" is not a valid value for uifType. ' +
                    'Supported options are listed here: ' +
                    'https://github.com/ngOfficeUIFabric/ng-officeuifabric/blob/master/src/components/choicefield/choicefieldTypeEnum.ts');
              }
            });
            if (choicefieldGroupController != null) {
                let render: () => void = (): void => {
                    let checked: boolean = (choicefieldGroupController.getViewValue() === attrs.value);
                    instanceElement.find('input').prop('checked', checked);
                };
                choicefieldGroupController.addRender(render);
                attrs.$observe('value', render);
                instanceElement
                    .on('$destroy', function(): void {
                        choicefieldGroupController.removeRender(render);
                    });
            }
            let disabled: boolean = 'disabled' in attrs;

            // check parent too
            let parentScope: IChoicefieldGroupScope = <IChoicefieldGroupScope> scope.$parent.$parent;
            disabled = disabled || (parentScope != null && parentScope.disabled);
            if (disabled) {
                instanceElement.find('input').attr('disabled', 'disabled');
            }
            instanceElement
                .on('click', (ev: JQueryEventObject) => {
                    if (disabled) {
                        return;
                    }
                    scope.$apply(() => {
                        if (choicefieldGroupController != null) {
                            choicefieldGroupController.setViewValue(attrs.value, ev);
                        }
                    });
                });
    }
}

/**
 * @ngdoc class
 * @name ChoicefieldgroupController
 * @module officeuifabric.components.choicefield
 * 
 * @restrict E
 * 
 * @description 
 * ChoicefieldGroupController is the controller for the <uif-choicefield-group> directive
 *
 */
export class ChoicefieldGroupController {
    public static $inject: string[] = ['$element', '$scope'];
    public constructor(public $element: JQuery, public $scope: IChoicefieldGroupScope) {
    }
    private renderFns: Function[] = [];

    public init(): void {
        if (typeof this.$scope.ngModel !== 'undefined'  && this.$scope.ngModel != null) {
            this.$scope.ngModel.$render = () => {
               this.render();
            };
            this.render();
        }
    }
    public addRender(fn: Function): void {
        this.renderFns.push(fn);
    }

    public removeRender(fn: Function): void {
        this.renderFns.splice(this.renderFns.indexOf(fn));
    }

    public setViewValue(value: string, eventType: any): void {
        this.$scope.ngModel.$setViewValue(value, eventType);
        this.render(); // update all inputs checked/not checked
    }
    public getViewValue(): string {
        if (typeof this.$scope.ngModel !== 'undefined' && this.$scope.ngModel != null) {
            return  this.$scope.ngModel.$viewValue;
        }
    }

    private render(): void {
        for (let i: number = 0; i < this.renderFns.length; i++) {
            this.renderFns[i]();
        }
    }
}

/**
 * @ngdoc directive
 * @name uifDropdown
 * @module officeuifabric.components.choicefield
 * 
 * @restrict E
 * 
 * @description 
 * `<uif-choicefield>` is a choicefield directive
 * @see https://github.com/OfficeDev/Office-UI-Fabric/tree/master/src/components/Choicefield
 * 
 * @usage
 * 
 * <uif-choicefield-group ng-model="selectedValue">
 *    <uif-choicefield-option uif-type="radio" ng-repeat="option in options"
 *        value="{{option.value}}">{{option.text}}</uif-choicefield-option>
 * </uif-choicefield-group>
 */
export class ChoicefieldGroupDirective implements ng.IDirective {
    public template: string =
        '<div class="ms-ChoiceFieldGroup">' +
            '<div class="ms-ChoiceFieldGroup-title">' +
                '<label class="ms-Label is-required">Pick one</label>' +
            '</div>' +
            '<ng-transclude />' +
        '</div>';

    public restrict: string = 'E';
    public transclude: boolean = true;
    public require: string[] = ['uifChoicefieldGroup', '?ngModel'];
    public controller: typeof ChoicefieldGroupController = ChoicefieldGroupController;

    public static factory(): ng.IDirectiveFactory {
        const directive: ng.IDirectiveFactory = () => new ChoicefieldGroupDirective();
        return directive;
    }
    public compile (templateElement: ng.IAugmentedJQuery, templateAttributes: ng.IAttributes, transclude: ng.ITranscludeFunction)
        : ng.IDirectivePrePost {
        return {
            pre: this.preLink
        };
    }

    private preLink(
        scope: IChoicefieldGroupScope,
        instanceElement: ng.IAugmentedJQuery,
        instanceAttributes: ng.IAttributes,
        ctrls: {}): void {
            let choicefieldGroupController: ChoicefieldGroupController = ctrls[0];
            let modelController: ng.INgModelController = ctrls[1];
            scope.ngModel = modelController;
            choicefieldGroupController.init();
            scope.disabled = 'disabled' in instanceAttributes;
    }
}

/**
 * @ngdoc module
 * @name officeuifabric.components.choicefield
 * 
 * @description 
 * ChoiceField
 * 
 */
export var module: ng.IModule = ng.module('officeuifabric.components.choicefield', [
    'officeuifabric.components'
  ])
  .directive('uifChoicefieldOption', ChoicefieldOptionDirective.factory())
  .directive('uifChoicefieldGroup', ChoicefieldGroupDirective.factory());
