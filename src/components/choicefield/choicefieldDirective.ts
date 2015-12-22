/*
* Angular Directive for the Choicefield component (https://github.com/OfficeDev/Office-UI-Fabric/tree/master/src/components/ChoiceField)
* @ngdoc module
* @name fabric.ui.components.choicefield
*/

namespace Fabric.UI.Components.ChoiceField {
    'use strict';
    export class ChoiceFieldGroupController {
        public static $inject: string[] = ['$element'];
        private cfRenderFns: (() => void)[] = [];
        private ngModelCtrl: any;
        public constructor(public $element: JQuery) {}

        public init(ngModelCtrl: ng.INgModelController): void {
            this.ngModelCtrl = ngModelCtrl;
            this.ngModelCtrl.$render = angular.bind(this, this.render);
        }
        public add(cfRenderFn: () => void): void {
            this.cfRenderFns.push(cfRenderFn);
        }

        public remove(cfRender: () => void): void {
            let index: number = this.cfRenderFns.indexOf(cfRender);
            if (index !== -1) {
                this.cfRenderFns.splice(index, 1);
            }
        }

        public render(): void {
            this.cfRenderFns.forEach((renderFn: () => void) => renderFn());
        }

        public setViewValue(value: string, eventType: any): void {
            // todo:
            console.log(eventType);
            this.ngModelCtrl.$setViewValue(value, eventType);
            // update the other radio buttons as well
            this.render();
        }
        public getViewValue(): string {
            return this.ngModelCtrl.$viewValue;
        }
    }

    export interface IChoiceFieldScope extends ng.IScope {
        required: boolean;
    }

    export class ChoiceFieldGroupDirective implements ng.IDirective {
        public restrict: string = 'E';
        public template: string =
            '<div class="ms-ChoiceFieldGroup">' +
                '<div class="ms-ChoiceFieldGroup-title">' +
                    '<label ng-class="{\'ms-Label\' : true, \'is-required\' : required}">{{label}}</label>' +
                '</div>' +
                '<ng-transclude/>' +
            '</div>';
        public transclude: boolean = true;
        public scope: {} = {
            label: '@'
        };
        public controller: any = ChoiceFieldGroupController;
        public require: string[] = ['uifChoicefieldGroup', 'ngModel'];

        public static factory(): ng.IDirectiveFactory {
            const directive: ng.IDirectiveFactory = () => new ChoiceFieldGroupDirective();

            return directive;
        }
        public link(
            scope: IChoiceFieldScope,
            instanceElement: ng.IAugmentedJQuery,
            attrs: ng.IAttributes,
            ctrls: {},
            transclude: ng.ITranscludeFunction): void {
                let groupController: ChoiceFieldGroupController = ctrls[0];
                let modelController: ng.INgModelController = ctrls[1];
                scope.required = false;
                attrs.$observe('required', (value: {}) => {
                    scope.required = <boolean> value;
                });
                modelController.$validators['required'] = (modelValue: string) => {
                    return !scope.required || (typeof modelValue !== 'undefined' && modelValue !== '');
                };
                groupController.init(modelController);
        }
    }

    export interface IChoiceFieldScope extends ng.IScope {
        uniqueId: number;
        checked: boolean;
    }
    export class ChoiceFieldDirective implements ng.IDirective {

        public template: string = '<div class="ms-ChoiceField">' +
            '<input id="{{uniqueId}}" class="ms-ChoiceField-input" type="radio" ng-checked="checked">' +
            '<label for="{{uniqueId}}" class="ms-ChoiceField-field"><span class="ms-Label"><ng-transclude/></span></label>' +
            '</div>';

        public restrict: string = 'E';
        public require: string = '^uifChoicefieldGroup';
        public uniqueId: number = 1;
        public transclude: boolean = true;
        public scope: {} = {};

        public static factory(): ng.IDirectiveFactory {
            const directive: ng.IDirectiveFactory = () => new ChoiceFieldDirective();
            return directive;
        }

        public link(
            scope: IChoiceFieldScope,
            instanceElement: ng.IAugmentedJQuery,
            attrs: ng.IAttributes,
            groupController: ChoiceFieldGroupController): void {
            if (!this.uniqueId) {
                this.uniqueId = 1;
            }
            scope.uniqueId = this.uniqueId++;

            if (!groupController) {
                throw 'Group controller not found!';
            }
            let render: () => void = () => {
                let currentValue: string = groupController.getViewValue();
                let checked: boolean = attrs['value'] === currentValue;
                scope.checked = checked;
            };
            groupController.add(render);
            attrs.$observe('value', render);
            instanceElement
                .on('click', (ev: JQueryEventObject) => {
                    scope.$apply(() => {
                        groupController.setViewValue(attrs['value'], ev);
                    });
                })
                .on('$destroy', () => {
                    groupController.remove(render);
                });
        }
    }
}

angular.module('fabric.ui.components.choicefield', ['fabric.ui.components'])
    .directive('uifChoicefieldGroup', Fabric.UI.Components.ChoiceField.ChoiceFieldGroupDirective.factory())
    .directive('uifChoicefield', Fabric.UI.Components.ChoiceField.ChoiceFieldDirective.factory());
