'use strict';

import * as ng from 'angular';

export class DialogDirective implements ng.IDirective {
    public restrict: string = 'E';
    public replace: boolean = true;
    public transclude: boolean = true;
    public template: string = '<div class="ms-Dialog"' +
    'ng-class="{ \'ms-Dialog--close\': uifClose==\'true\'' +
    ', \'ms-Dialog--lgHeader\': uifType==\'header\'' +
    ', \'ms-Dialog--multiline\': uifType==\'multiline\' }">' +
     '<uif-overlay uif-mode="{{uifOverlay}}"></uif-overlay>' +
    '<div class="ms-Dialog-main" ng-transclude></div>' +
    '</div>';
    public scope: any = {
        uifClose: '@',
        uifOverlay: '@',
        uifType: '@'
    };

    public static factory(): ng.IDirectiveFactory {
        const directive: ng.IDirectiveFactory = () => new DialogDirective();
        return directive;
    }

}

export class DialogHeaderDirective implements ng.IDirective {
    public restrict: string = 'E';
    public replace: boolean = true;
    public transclude: boolean = true;
    public require: string = '^^uifDialog';
    public template: string = '<div class="ms-Dialog-header">' +
    '<button ng-if="$parent.uifClose" class="ms-Dialog-button ms-Dialog-button--close">' +
    '<i class="ms-Icon ms-Icon--x"></i></button>' +
    '<ng-transclude></ng-transclude></div>';
    public static factory(): ng.IDirectiveFactory {
        const directive: ng.IDirectiveFactory = () => new DialogHeaderDirective();
        return directive;
    }

}


export class DialogContentDirective implements ng.IDirective {
    public restrict: string = 'E';
    public replace: boolean = true;
    public transclude: boolean = true;
    // public require: string = '^uifDialog';
    public template: string = '<div class="ms-Dialog-content" ng-transclude></div>';
    public static factory(): ng.IDirectiveFactory {
        const directive: ng.IDirectiveFactory = () => new DialogContentDirective();
        return directive;
    }

}
export class DialogInnerDirective implements ng.IDirective {
    public restrict: string = 'E';
    public replace: boolean = true;
    public transclude: boolean = true;
    // public require: string = '^uifDialog';
    public template: string = '<div class="ms-Dialog-inner" ng-transclude></div>';
    public static factory(): ng.IDirectiveFactory {
        const directive: ng.IDirectiveFactory = () => new DialogInnerDirective();
        return directive;
    }

}

export class DialogSubtextDirective implements ng.IDirective {
    public restrict: string = 'E';
    public replace: boolean = true;
    public transclude: boolean = true;
    // public require: string = '^uifDialog';
    public template: string = '<p class="ms-Dialog-subText" ng-transclude></p>';
    public static factory(): ng.IDirectiveFactory {
        const directive: ng.IDirectiveFactory = () => new DialogSubtextDirective();
        return directive;
    }

}

export class DialogActionsDirective implements ng.IDirective {
    public restrict: string = 'E';
    public replace: boolean = true;
    public transclude: boolean = true;
    // public require: string = '^uifDialog';
    public template: string = '<div class="ms-Dialog-actions"><div ng-class="{ \'ms-Dialog-actionsRight\': uifPosition==\'right\'}">' +
    '<ng-transclude></ng-transclude></div></div>';
    public scope: any = {
        uifPosition: '@'
    }
    public static factory(): ng.IDirectiveFactory {
        const directive: ng.IDirectiveFactory = () => new DialogActionsDirective();
        return directive;
    }
}

export var module: ng.IModule = ng.module('officeuifabric.components.dialog', ['officeuifabric.components'])
    .directive('uifDialog', DialogDirective.factory())
    .directive('uifDialogHeader', DialogHeaderDirective.factory())
    .directive('uifDialogContent', DialogContentDirective.factory())
    .directive('uifDialogInner', DialogInnerDirective.factory())
    .directive('uifDialogSubtext', DialogSubtextDirective.factory())
    .directive('uifDialogActions', DialogActionsDirective.factory());

