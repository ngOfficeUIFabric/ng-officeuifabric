'use strict';
import * as ng from 'angular';

    export class SearchBoxController {

        public isFocus = false;
        public isCancel = false;
        public isLabelHidden = false;
        public isActive = false;
        public uifValue: string;
        public uifSearch: string;

        public focus(): void {
            console.log("focus called");
            this.isFocus = true;
            this.isLabelHidden = true;
            this.isActive = true;
        }
        public mousedown(): void {
            this.isCancel = true;
        }
        public blur(): void {
            if (this.isCancel) {
                this.uifValue = "";
                this.isLabelHidden = false;
            }
            this.isActive = false;
            if (this.uifValue == "") {
                this.isLabelHidden = false;
            }

            this.isFocus = this.isCancel = false;

        }
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
 * <uif-searchbox uif-value="''" uif-search />
 */
    export class SearchBoxDirective implements ng.IDirective {

        public template = '<div class="ms-SearchBox" ng-class="{\'is-active\':controller.isActive}">' +
        '<input class="ms-SearchBox-field" ng-focus="controller.focus()" ng-blur="controller.blur()" ng-model="controller.value" id="{{\'searchBox_\'+uniqueId}}" >' +
        '<label class="ms-SearchBox-label" for="{{\'searchBox_\'+uniqueId}}" ng-hide="controller.isLabelHidden"><i class="ms-SearchBox-icon ms-Icon ms-Icon--search" ></i>{{controller.search}}</label>' +
        '<button class="ms-SearchBox-closeButton" ng-mousedown="controller.mousedown()" type="button"><i class="ms-Icon ms-Icon--x"></i></button>' +
        '</div>';
        
        public uniqueId = 1;
        public scope: {} = {
            uifValue: "=",
            uifSearch: "=",
           // uifClose: "&"
        }

        constructor() {
        }
        public controller: any = SearchBoxController;
        link(scope, elem: ng.IAugmentedJQuery, attrs: ng.IAttributes, controller: SearchBoxController) {

            if (!this.uniqueId) {
                this.uniqueId = 1;
            }

            scope.uniqueId = this.uniqueId++;

            scope.controller = controller;
            scope.controller.uifValue = scope.uifValue;
            scope.controller.uifSearch = scope.uifSearch;


            scope.$watch("uifValue", function (val) {
                if (!controller.isFocus) {
                    if (val && val != "") {
                        controller.isLabelHidden = true;
                    } else {
                        controller.isLabelHidden = false;
                    }
                    controller.uifValue = val;
                }

            });

            scope.$watch("uifSearch", function (search) {
                controller.uifSearch= search;
            });


        }

        static factory(): ng.IDirectiveFactory {
            const directive = () => new SearchBoxDirective();

            return directive;
        }
    }
/**
 * @ngdoc module
 * @name officeuifabric.components.searchbox
 * 
 * @description 
 * Icon
 * 
 */

export var module: ng.IModule = ng.module('officeuifabric.components.searchbox', ['officeuifabric.components'])
    .directive('uifTextfield', SearchBoxDirective.factory());

