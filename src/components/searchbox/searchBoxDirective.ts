


class SearchBoxDirective implements ng.IDirective {

    template= '<div class="ms-SearchBox">' +
    '<input class="ms-SearchBox-field" ng-model="value" id="{{\'searchBox_\'+uniqueId}}" >' +
    '<label class="ms-SearchBox-label" for="{{\'searchBox_\'+uniqueId}}"><i class="ms-SearchBox-icon ms-Icon ms-Icon--search" ></i>{{search}}</label>' +
    '<button class="ms-SearchBox-closeButton"  type="button"><i class="ms-Icon ms-Icon--x"></i></button>' +
    '</div>';
    constructor() {
    }
    uniqueId = 1;
    scope = {
        value: "=value",
        search: "=",
        close: "&close"
    }
   
    link(scope, elem: ng.IAugmentedJQuery, attrs: ng.IAttributes) {

        if (!this.uniqueId)
            this.uniqueId = 1;
        scope.uniqueId = this.uniqueId++;
        var cancel = false;
        var focus = false;
        elem.find('.ms-SearchBox-field').on('focus', function () {
            /** Hide the label on focus. */
            $(this).siblings('.ms-SearchBox-label').hide();
            // Show cancel button by adding is-active class
            $(this).parent('.ms-SearchBox').addClass('is-active');
            focus = true;
        });
        elem.find('.ms-SearchBox-closeButton').on('mousedown', function () {
            cancel = true;
        });
        elem.find('.ms-SearchBox-field').on('blur', function () {
            var that = this;
            if (cancel) {
                scope.$apply(function () {

                    scope.value = "";
                });
                $(this).siblings('.ms-SearchBox-label').show();
              

            }
			
			  $(this).parent('.ms-SearchBox').removeClass('is-active');
            if (scope.value.length === 0) {
                $(this).siblings('.ms-SearchBox-label').show();
            }

            cancel = false;
            focus = false;
        });

        scope.$watch("value", function (val) {

            if (!focus) {
                if (val&&val != "") {
                    elem.find('.ms-SearchBox-label').hide();
                }
                else {
                    elem.find('.ms-SearchBox-label').show();
                }
            }
        });



    }

    static factory(): ng.IDirectiveFactory {
        const directive = () => new SearchBoxDirective();

        return directive;
    }
}

angular.module("fabric.ui.components.searchbox", ['fabric.ui.components'])
    .directive("uifSearchbox", SearchBoxDirective.factory()); 

