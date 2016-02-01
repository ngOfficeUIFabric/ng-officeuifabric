
namespace Fabric.UI.Components.SearchBox {

    export class SearchBoxController {

        public isFocus = false;
        public isCancel = false;
        public isLabelHidden = false;
        public isActive = false;
        public value: string;
        public search: string;

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
                this.value = "";
                this.isLabelHidden = false;
            }
            this.isActive = false;
            if (this.value == "") {
                this.isLabelHidden = false;
            }

            this.isFocus = this.isCancel = false;

        }
    }

    export class SearchBoxDirective implements ng.IDirective {

        public template = '<div class="ms-SearchBox" ng-class="{\'is-active\':controller.isActive}">' +
        '<input class="ms-SearchBox-field" ng-focus="controller.focus()" ng-blur="controller.blur()" ng-model="controller.value" id="{{\'searchBox_\'+uniqueId}}" >' +
        '<label class="ms-SearchBox-label" for="{{\'searchBox_\'+uniqueId}}" ng-hide="controller.isLabelHidden"><i class="ms-SearchBox-icon ms-Icon ms-Icon--search" ></i>{{controller.search}}</label>' +
        '<button class="ms-SearchBox-closeButton" ng-mousedown="controller.mousedown()" type="button"><i class="ms-Icon ms-Icon--x"></i></button>' +
        '</div>';
        constructor() {
        }
        public uniqueId = 1;
        public scope = {
            value: "=value",
            search: "=",
            close: "&close"
        }
        public controller: any = SearchBoxController;
        link(scope, elem: ng.IAugmentedJQuery, attrs: ng.IAttributes, controller: SearchBoxController) {

            if (!this.uniqueId) {
                this.uniqueId = 1;
            }

            scope.uniqueId = this.uniqueId++;

            scope.controller = controller;
            scope.controller.value = scope.value;
            scope.controller.search = scope.search;


            scope.$watch("value", function (val) {
                if (!controller.isFocus) {
                    if (val && val != "") {
                        controller.isLabelHidden = true;
                    } else {
                        controller.isLabelHidden = false;
                    }
                    controller.value = val;
                }

            });

            scope.$watch("search", function (search) {
                controller.search = search;
            });


        }

        static factory(): ng.IDirectiveFactory {
            const directive = () => new SearchBoxDirective();

            return directive;
        }
    }
}
angular.module("fabric.ui.components.searchbox", ['fabric.ui.components'])
    .directive("uifSearchbox", Fabric.UI.Components.SearchBox.SearchBoxDirective.factory()); 

