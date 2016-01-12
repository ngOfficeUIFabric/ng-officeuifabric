'use strict';

import * as ng from 'angular';

export class DropdownOptionDirective implements ng.IDirective {
    public template: string = "<option ng-transclude></option>";
    constructor() {
    }
            
    public restrict: string = "E";
    public require: string = '^uifDropdown';
    public replace: boolean = true;
    public transclude: boolean = true;
    
    public static factory(): ng.IDirectiveFactory {
        const directive = () => new DropdownOptionDirective();

        return directive;
    }   
    
    public compile (templateElement: ng.IAugmentedJQuery, templateAttributes: ng.IAttributes, transclude: ng.ITranscludeFunction): ng.IDirectivePrePost {
        return {
            pre: this.preLink,
            post: this.postLink
        };
    }
    private preLink(scope: ng.IScope, instanceElement: ng.IAugmentedJQuery, instanceAttributes: ng.IAttributes, dropdownController:DropdownController, transclude: ng.ITranscludeFunction): void {            
    }
    
    private postLink(scope: ng.IScope, instanceElement: ng.IAugmentedJQuery, attrs: ng.IAttributes, dropdownController: DropdownController, transclude: ng.ITranscludeFunction): void {
        if (!dropdownController) {
            throw 'Dropdown controller not found!';
        }           
        let render: () => void = () => {
            // let currentValue: string = dropdownController.getViewValue();
            // let checked: boolean = instanceElement.attr('value') === currentValue;
            // 
            // console.log("CHECKED: " + checked + "VALUE:" + currentValue + "INSTANCEVALUE: " + instanceElement.attr('value'));
        };
        dropdownController.add(render);
        attrs.$observe('value', render);
        instanceElement
            .on('click', (ev: JQueryEventObject) => {                    
                scope.$apply(() => {         
                    console.log("CLICK");           
                    var option = instanceElement.find('option');    
                    dropdownController.setViewValue(option.val(), attrs['value'], ev);
                });
            })
            .on('$destroy', () => {
                dropdownController.remove(render);
            });            
    }
}

export class DropdownController {
    public static $inject: string[] = ['$element'];
    private cfRenderFns: (() => void)[] = [];
    private ngModelCtrl: ng.INgModelController;
    private scope: any;
    public constructor(public $element: JQuery) {}

    public init(ngModelCtrl: ng.INgModelController, element: ng.IAugmentedJQuery, scope: any): void {
        this.scope = scope;
        this.ngModelCtrl = ngModelCtrl;
        if (ngModelCtrl != null) {
            this.ngModelCtrl.$render = () => angular.bind(this, this.render);
        }
        
        this.$element.bind('click', function() {               
            if (!element.hasClass('is-disabled')) {                   
                element.toggleClass('is-open');
                

//                     /** First, let's close any open dropdowns on this page. */
//                     this.$dropdownWrapper.find('.is-open').removeClass('is-open');
// 
//                     /** Stop the click event from propagating, which would just close the dropdown immediately. */
//                     evt.stopPropagation();
// 
//                     /** Before opening, size the items list to match the dropdown. */
//                     var dropdownWidth = $(this).parents(".ms-Dropdown").width();
//                     $(this).next(".ms-Dropdown-items").css('width', dropdownWidth + 'px');
// 
//                     /** Go ahead and open that dropdown. */
//                     this.$dropdownWrapper.toggleClass('is-open');
// 
//                     /** Temporarily bind an event to the document that will close this dropdown when clicking anywhere. */
//                     $(document).bind("click.dropdown", event => {
//                         this.$dropdownWrapper.removeClass('is-open');
//                         $(document).unbind('click.dropdown');
//                     });
            }

        });
        
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

    public setViewValue(title: string, value: string, eventType: any): void {
        this.scope["selectedTitle"] = title;
        this.ngModelCtrl.$setViewValue(value, eventType);
        // update the other radio buttons as well
        this.render();
    }
    public getViewValue(): string {
        if (typeof this.ngModelCtrl !== "undefined") {
            return  this.ngModelCtrl.$viewValue;
        }
    }    
}

export class DropdownDirective implements ng.IDirective {

    public template: string = '<div ng-click="dropdownClick" ng-class="{\'ms-Dropdown\' : true, \'is-disabled\' : isDisabled}" tabindex="0" id="dropdown-{{uniqueId}}">' +
     '<i class="ms-Dropdown-caretDown ms-Icon ms-Icon--caretDown"></i>' +
     '<span class="ms-Dropdown-title">{{selectedTitle}}</span><select ng-transclude/></div>'   ;
    constructor() {
    }
    public restrict: string = "E";
    public transclude: boolean = true;
    public require: string[] = ['uifDropdown', '?ngModel'];
    
    controller = DropdownController;
    public compile (templateElement: ng.IAugmentedJQuery, templateAttributes: ng.IAttributes, transclude: ng.ITranscludeFunction): ng.IDirectivePrePost {
        
             return {
                pre: this.preLink,
                post: this.postLink
            };
    }
    
    private preLink(scope: ng.IScope, instanceElement: ng.IAugmentedJQuery, instanceAttributes: ng.IAttributes, ctrls:{}): void {
            
        
    }
    
    private postLink(scope: ng.IScope, instanceElement: ng.IAugmentedJQuery, attrs: ng.IAttributes, ctrls: {}): void {
        let dropdownController: DropdownController = ctrls[0];
        let modelController: ng.INgModelController = ctrls[1];
        dropdownController.init(modelController, instanceElement, scope);
        
        
        //ul.replaceWith("<select>" 
        
        // var options = ul.contents();
        // var select = angular.element("select");
        // select.append(options);
        // ul.append(select);
        
        // ul.parent().append(options);
        // ul.parent().remove(ul);
    }
        
    static factory(): ng.IDirectiveFactory {
        const directive = () => new DropdownDirective();

        return directive;
    }
}

/**
 * @ngdoc module
 * @name officeuifabric.components.dropdown
 * 
 * @description 
 * Textfield
 * 
 */
export var module: ng.IModule = ng.module('officeuifabric.components.dropdown', [
    'officeuifabric.components'
  ])
  .directive("uifOption", DropdownOptionDirective.factory())
  .directive("uifDropdown", DropdownDirective.factory());