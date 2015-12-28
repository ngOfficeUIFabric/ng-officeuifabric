/*
* Angular Directive for the TextField component (https://github.com/OfficeDev/Office-UI-Fabric/tree/master/src/components/TextField)
* @ngdoc module
* @name fabric.ui.components.textfield
*/

namespace Fabric.UI.Components.TextField {
    'use strict';

    export interface ITextFieldScope extends ng.IScope {
        required: boolean;
    }
    export class TextFieldDirective implements ng.IDirective {
        public restrict: string = 'A';
        public static factory(): ng.IDirectiveFactory {
            const directive: ng.IDirectiveFactory = () => new TextFieldDirective();

            return directive;
        }

        public link(scope: ITextFieldScope, instanceElement: ng.IAugmentedJQuery, attrs: ng.IAttributes): void {
            instanceElement.addClass('form-control ms-TextField-field');
            if (attrs['required']) {
                instanceElement.parent().append('<span>*</span>');
                console.log(instanceElement.parent());
            }
        }
    }
}

angular.module('fabric.ui.components.textfield', ['fabric.ui.components'])
    .directive('uifTextfield', Fabric.UI.Components.TextField.TextFieldDirective.factory());
