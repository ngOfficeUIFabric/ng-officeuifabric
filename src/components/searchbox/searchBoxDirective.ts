'use strict';
import * as ng from 'angular';

    
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

        public template = '<div class="ms-SearchBox" ng-class="{\'is-active\':isActive}">' +
        '<input class="ms-SearchBox-field" ng-focus="inputFocus()" ng-blur="inputBlur()" ng-model="uifValue" id="{{\'searchBox_\'+uniqueId}}" />' +
        '<label class="ms-SearchBox-label" for="{{\'searchBox_\'+uniqueId}}" ng-hide="isLabelHidden"><i class="ms-SearchBox-icon ms-Icon ms-Icon--search" ></i>{{uifSearch}}</label>' +
        '<button class="ms-SearchBox-closeButton" ng-mousedown="btnMousedown()" type="button"><i class="ms-Icon ms-Icon--x"></i></button>' +
        '</div>';
        
        public uniqueId = 1;
        public scope:any = {
            uifValue: "=",
            uifSearch: "=",
           // uifClose: "&"
        }

    
        link(scope, elem: ng.IAugmentedJQuery, attrs: ng.IAttributes) {

            if (!this.uniqueId) {
                this.uniqueId = 1;
            }
            scope["isFocus"] = false;
            scope["isCancel"] = false;
            scope["isLabelHidden"] = false;
            scope["isActive"] = false;
            
            scope.uniqueId = this.uniqueId++;

            scope["inputFocus"] = function () {
                scope["isFocus"] = true;
                scope["isLabelHidden"]  =  true;
                scope["isActive"] = true;
            }

            scope["inputBlur"] = function () {
                if (scope.isCancel) {
                    scope.uifValue = "";
                    scope.isLabelHidden = false;
                }
                scope.isActive = false;
                if (scope.uifValue == "") {
                    scope.isLabelHidden = false;
                }

                scope.isFocus = scope.isCancel = false;
            }

            scope["btnMousedown"] = function () {
                scope["isCancel"] = true;
            }

            scope.$watch("uifValue", function (val) {
                if (!scope.isFocus) {
                    if (val && val != "") {
                        scope.isLabelHidden = true;
                    } else {
                        scope.isLabelHidden = false;
                    }
                    scope.uifValue = val;
                }

            });

            scope.$watch("uifSearch", function (search) {
                scope.uifSearch= search;
            });


        }

       public static factory(): ng.IDirectiveFactory {
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
    .directive('uifSearchbox', SearchBoxDirective.factory());

