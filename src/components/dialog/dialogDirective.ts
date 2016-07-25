'use strict';

import * as ng from 'angular';
import {DialogTypeEnum, DialogActionsPositionEnum} from './dialogEnums.ts';

/**
 * @ngdoc interface
 * @name IDialogScope
 * @module officeuifabric.components.dialog
 *
 * @description
 * This is the scope used by the `<uif-dialog>` directive.
 *
 * @property {string} uifClose - Shows the close button.
 * @property {string} uifOverlay - Type of overlay. Possible types are defined in {@link OverlayMode}.
 * @property {string} uifType - Type of dialog. Possible types are defined in {@link DialogTypeEnum}.
 */
export interface IDialogScope extends ng.IScope {
  uifClose: string;
  uifOverlay: string;
  uifType: string;
}

/**
 * @ngdoc interface
 * @name IDialogActionsPositionScope
 *
 * @description
 * This scope is used by `<uif-dialog-actions>' element
 */
export interface IDialogActionsPositionScope extends ng.IScope {
  uifPosition: string;
}

/**
 * @controller
 * @module officeuifabric.components.dialog
 * @private
 * @description
 * Used to more easily inject the Angular $log service into the directive.
 */
export class DialogController {
  public static $inject: string[] = ['$log'];
  constructor(public $log: ng.ILogService) {
  }
}

/**
 * @ngdoc directive
 * @name uifDialog
 * @module officeuifabric.components.dialog
 *
 * @restrict E
 *
 * @description
 * `<uif-dialog>` is an dialog directive.
 *
 * @see {link http://dev.office.com/fabric/components/dialog}
 *
 * @usage
 *
 * <uif-dialog uif-type="multiline"></uif-dialog>
 */
export class DialogDirective implements ng.IDirective {
  public restrict: string = 'E';
  public controller: any = DialogController;
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

  public link(scope: IDialogScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes, controller: DialogController): void {
    scope.$watch('uifType', (newValue: string, oldValue: string) => {
      if (typeof (newValue) !== 'undefined') {
        if (DialogTypeEnum[newValue] === undefined) {
          controller.$log.error('Error [ngOfficeUiFabric] officeuifabric.components.dialog - Unsupported type:' +
            'The type (\'' + scope.uifType + '\') is not supported by the Office UI Fabric.' +
            'Supported options are listed here: ' +
            'https://github.com/ngOfficeUIFabric/ng-officeuifabric/blob/master/src/components/dialog/dialogEnums.ts'
          );

        }
      }

    });
  }

}

/**
 * @directive
 * @name uifDialogHeader
 * @module officeuifabric.components.dialog
 *
 * @restrict E
 * @description
 * '<uif-dialog-header>' Renders header of the dialog
 *
 * @usage
 * <uif-dialog><uif-dialog-header></uif-dialog-header></uif-dialog>
 *
 */
export class DialogHeaderDirective implements ng.IDirective {
  public restrict: string = 'E';
  public replace: boolean = true;
  public transclude: boolean = true;
  public require: string = '^^uifDialog';
  public template: string = '<div class="ms-Dialog-header">' +
  '<button type="button" ng-if="$parent.uifClose" class="ms-Dialog-button ms-Dialog-button--close">' +
  '<i class="ms-Icon ms-Icon--x"></i></button>' +
  '<ng-transclude></ng-transclude></div>';
  public static factory(): ng.IDirectiveFactory {
    const directive: ng.IDirectiveFactory = () => new DialogHeaderDirective();
    return directive;
  }

}

/**
 * @directive
 * @name uifDialogContent
 * @module officeuifabric.components.dialog
 *
 * @restrict E
 * @description
 * '<uif-dialog-content>' Renders content of the dialog
 *
 * @usage
 * <uif-dialog><uif-dialog-content></uif-dialog-content></uif-dialog>
 *
 */
export class DialogContentDirective implements ng.IDirective {
  public restrict: string = 'E';
  public replace: boolean = true;
  public transclude: boolean = true;
  public template: string = '<div class="ms-Dialog-content" ng-transclude></div>';
  public static factory(): ng.IDirectiveFactory {
    const directive: ng.IDirectiveFactory = () => new DialogContentDirective();
    return directive;
  }

}

/**
 * @directive
 * @name uifDialogInner
 * @module officeuifabric.components.dialog
 *
 * @restrict E
 * @description
 * '<uif-dialog-inner>' Renders content and actions of the dialog
 *
 * @usage
 * <uif-dialog><uif-dialog-inner></uif-dialog-inner></uif-dialog>
 *
 */
export class DialogInnerDirective implements ng.IDirective {
  public restrict: string = 'E';
  public replace: boolean = true;
  public transclude: boolean = true;
  public template: string = '<div class="ms-Dialog-inner" ng-transclude></div>';
  public static factory(): ng.IDirectiveFactory {
    const directive: ng.IDirectiveFactory = () => new DialogInnerDirective();
    return directive;
  }

}

/**
 * @directive
 * @name uifDialogSubtext
 * @module officeuifabric.components.dialog
 *
 * @restrict E
 * @description
 * '<uif-dialog-subtext>' Renders text within the content
 *
 * @usage
 * <uif-dialog><uif-dialog-content><uif-dialog-subtext> text here </uif-dialog-subtext></uif-dialog-content></uif-dialog>
 *
 */
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

/**
 * @controller
 * @module officeuifabric.components.dialog
 * @private
 * @description
 * Used to more easily inject the Angular $log service into the directive.
 */
export class DialogActionsController {
  public static $inject: string[] = ['$log'];
  constructor(public $log: ng.ILogService) {
  }
}


/**
 * @directive
 * @name uifDialogActions
 * @module officeuifabric.components.dialog
 *
 * @restrict E
 * @description
 * '<uif-dialog-subtext>' Renders text within the content
 *
 * @usage
 * <uif-dialog><uif-dialog-content><uif-dialog-subtext> text here </uif-dialog-subtext></uif-dialog-content></uif-dialog>
 *
 */
export class DialogActionsDirective implements ng.IDirective {
  public restrict: string = 'E';
  public replace: boolean = true;
  public transclude: boolean = true;
  public controller: any = DialogActionsController;
  // public require: string = '^uifDialog';
  public template: string = '<div class="ms-Dialog-actions"><div ng-class="{ \'ms-Dialog-actionsRight\': uifPosition==\'right\'}">' +
  '<ng-transclude></ng-transclude></div></div>';
  public scope: any = {
    uifPosition: '@'
  };

  public static factory(): ng.IDirectiveFactory {
    const directive: ng.IDirectiveFactory = () => new DialogActionsDirective();
    return directive;
  }
  public link(scope: IDialogActionsPositionScope,
              element: ng.IAugmentedJQuery,
              attrs: ng.IAttributes,
              controller: DialogActionsController): void {
              scope.$watch('uifPosition', (newValue: string, oldValue: string) => {
                if (typeof (newValue) !== 'undefined') {
                  if (DialogActionsPositionEnum[newValue] === undefined) {
                    controller.$log.error('Error [ngOfficeUiFabric] officeuifabric.components.dialog - Unsupported type:' +
                      'The type (\'' + scope.uifPosition + '\') is not supported by the Office UI Fabric.' +
                      'Supported options are listed here: ' +
                      'https://github.com/ngOfficeUIFabric/ng-officeuifabric/blob/master/src/components/dialog/dialogEnums.ts'
                    );

                  }
                }
    });
  }
}

export var module: ng.IModule = ng.module('officeuifabric.components.dialog', ['officeuifabric.components'])
  .directive('uifDialog', DialogDirective.factory())
  .directive('uifDialogHeader', DialogHeaderDirective.factory())
  .directive('uifDialogContent', DialogContentDirective.factory())
  .directive('uifDialogInner', DialogInnerDirective.factory())
  .directive('uifDialogSubtext', DialogSubtextDirective.factory())
  .directive('uifDialogActions', DialogActionsDirective.factory());
