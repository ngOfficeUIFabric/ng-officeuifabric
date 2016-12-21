import * as angular from 'angular';
import { CalloutType } from './calloutTypeEnum';
import { CalloutArrow } from './calloutArrowEnum';


/**
 * @ngdoc class
 * @name CalloutController
 * @module officeuifabric.components.callout
 *
 * @restrict E
 *
 * @description
 * CalloutController is the controller for the <uif-callout> directive
 *
 */
export class CalloutController {
  public static $inject: string[] = ['$scope', '$log'];
  constructor(public $scope: ICalloutScope, public $log: angular.ILogService) { }
}

/**
 * @ngdoc directive
 * @name uifCalloutHeader
 * @module officeuifabric.components.callout
 *
 * @restrict E
 *
 * @description
 * `<uif-callout-header>` is an directive for rendering callout header
 *
 * @usage
 *
 * <uif-callout>
 *   <uif-callout-header>All of your favorite people</uif-callout-header>
 * </uif-callout>
 */
export class CalloutHeaderDirective implements angular.IDirective {
  public restrict: string = 'E';
  public transclude: boolean = true;
  public replace: boolean = false;
  public scope: boolean = false;
  public template: string = '<div class="ms-Callout-header"><p class="ms-Callout-title" ng-transclude></p></div>';

  public static factory(): angular.IDirectiveFactory {
    const directive: angular.IDirectiveFactory = () => new CalloutHeaderDirective();
    return directive;
  }

  public link(scope: any, instanceElement: angular.IAugmentedJQuery, attrs: any, ctrls: any[]): void {

    let mainWrapper: JQuery = instanceElement.parent().parent();

    if (!angular.isUndefined(mainWrapper) && mainWrapper.hasClass('ms-Callout-main')) {
      let detachedHeader: JQuery = instanceElement.detach();
      mainWrapper.prepend(detachedHeader);
    }
  }
}

/**
 * @ngdoc directive
 * @name uifCalloutContent
 * @module officeuifabric.components.callout
 *
 * @restrict E
 *
 * @description
 * `<uif-callout-content>` is an directive for rendering callout content
 *
 * @usage
 *
 * <uif-callout>
 *   <uif-callout-content>Consider adding a link to learn more at the bottom.</uif-callout-content>
 * </uif-callout>
 */
export class CalloutContentDirective implements angular.IDirective {
  public restrict: string = 'E';
  public transclude: boolean = true;
  public replace: boolean = false;
  public scope: boolean = false;
  public template: string = '<div class="ms-Callout-content"><p class="ms-Callout-subText" ng-transclude></p></div>';

  public static factory(): angular.IDirectiveFactory {
    const directive: angular.IDirectiveFactory = () => new CalloutContentDirective();
    return directive;
  }

}


/**
 * @ngdoc directive
 * @name uifCalloutActions
 * @module officeuifabric.components.callout
 *
 * @restrict E
 *
 * @description
 * `<uif-callout-actions>` is an directive for rendering callout actions
 *
 * @usage
 *
 * <uif-callout>
 *   <uif-callout-actions>
 *       <a href="#" class="ms-Callout-link ms-Link ms-Link--hero">Learn more</a>
 *   </uif-callout-actions>
 * </uif-callout>
 */
export class CalloutActionsDirective implements angular.IDirective {
  public restrict: string = 'E';
  public transclude: boolean = true;
  public replace: boolean = false;
  public scope: boolean = false;
  public template: string = '<div class="ms-Callout-actions" ng-transclude></div>';
  public require: string = '^?uifCallout';

  public static factory(): angular.IDirectiveFactory {
    const directive: angular.IDirectiveFactory = () => new CalloutActionsDirective();
    return directive;
  }

  public link(scope: ICalloutScope, instanceElement: angular.IAugmentedJQuery, attrs: any, calloutController: CalloutController): void {

    if (angular.isObject(calloutController)) {
      calloutController.$scope.$watch('hasSeparator', (hasSeparator: boolean) => {
        if (hasSeparator) {
          let actionChildren: JQuery = instanceElement.children().eq(0).children();

          for (let buttonIndex: number = 0; buttonIndex < actionChildren.length; buttonIndex++) {
            let action: JQuery = actionChildren.eq(buttonIndex);
            // handle CSS on button
            action.addClass('ms-Callout-action');

            // take care of span inside buttons
            let actionSpans: JQuery = action.find('span');

            // add only to spans that are either button label or icon
            for (let spanIndex: number = 0; spanIndex < actionSpans.length; spanIndex++) {
              let actionSpan: JQuery = actionSpans.eq(spanIndex);
              if (actionSpan.hasClass('ms-Button-label') || actionSpan.hasClass('ms-Button-icon')) {
                actionSpan.addClass('ms-Callout-actionText');
              }
            }
          }
        }
      });
    }
  }
}

/**
 * @ngdoc interface
 * @name ICalloutAttributes
 * @module officeuifabric.components.callout
 *
 * @description
 * Those are the attributes that can be used on callout directive.
 *
 *
 * @property {string} uifSeparator - Renders a separating line between content and actions
 * @property {string} uifActiontext - Render a separating line between content and actions. Same as `uifSeparator`
 * @property {CalloutArrow} uifArrow - Direction of the arrow
 * @property {boolean} uifClose - Renders close button
 */
interface ICalloutAttributes extends angular.IAttributes {
  uifSeparator: string;
  uifActionText: string;
  uifArrow: string;
  uifClose: boolean;
}

/**
 * @ngdoc interface
 * @name ICalloutScope
 * @module officeuifabric.components.callout
 *
 * @description
 * This is the scope used by the directive.
 *
 * @property {CalloutType} uifType - Type of callout to render
 * @property {boolean} ngShow - Callout visible or not.
 */
interface ICalloutScope extends angular.IScope {
  arrowDirection: string;
  hasSeparator: boolean;
  uifType: string;
  ngShow: boolean;
  closeButton: boolean;
  isMouseOver: boolean;
  closeButtonClicked: boolean;
}

/**
 * @ngdoc directive
 * @name uifCallout
 * @module officeuifabric.components.callout
 *
 * @restrict E
 *
 * @description
 * `<uif-callout>` is an directive for rendering callout component.
 * @see https://github.com/OfficeDev/Office-UI-Fabric/tree/master/src/components/Callout
 *
 * @usage
 *
 * <uif-callout>
 *   <uif-callout-content>Consider adding a link to learn more at the bottom.</uif-callout-content>
 * </uif-callout>
 */
export class CalloutDirective implements angular.IDirective {
  public restrict: string = 'E';
  public transclude: boolean = true;
  public replace: boolean = false;
  public template: string =
  '<div class="ms-Callout ms-Callout--arrow{{arrowDirection}}" ' +
  'ng-class="{\'ms-Callout--actionText\': hasSeparator, \'ms-Callout--OOBE\': uifType==\'oobe\',' +
  ' \'ms-Callout--Peek\': uifType==\'peek\', \'ms-Callout--close\': closeButton}">' +
  '<div class="ms-Callout-main"><div class="ms-Callout-inner" ng-transclude></div></div></div>';

  public require: string[] = ['uifCallout'];

  public scope: any = {
    ngShow: '=?',
    uifType: '@'
  };

  public controller: typeof CalloutController = CalloutController;

  public static factory(): angular.IDirectiveFactory {
    const directive: angular.IDirectiveFactory = () => new CalloutDirective();
    return directive;
  }

  public link(scope: ICalloutScope, instanceElement: angular.IAugmentedJQuery, attrs: ICalloutAttributes, ctrls: any[]): void {

    let calloutController: CalloutController = ctrls[0];

    attrs.$observe('uifType', (calloutType: string) => {
      if (angular.isUndefined(CalloutType[calloutType])) {
        calloutController.$log.error('Error [ngOfficeUiFabric] officeuifabric.components.callout - "' +
          calloutType + '" is not a valid value for uifType. It should be oobe or peek');
      }
    });

    if (!attrs.uifArrow) {
      scope.arrowDirection = 'Left';
    }

    attrs.$observe('uifArrow', (attrArrowDirection: string) => {

      if (angular.isUndefined(CalloutArrow[attrArrowDirection])) {
        calloutController.$log.error('Error [ngOfficeUiFabric] officeuifabric.components.callout - "' +
          attrArrowDirection + '" is not a valid value for uifArrow. It should be left, right, top, bottom.');
        return;
      }

      let capitalizedDirection: string = (attrArrowDirection.charAt(0)).toUpperCase();
      capitalizedDirection += (attrArrowDirection.slice(1)).toLowerCase();

      scope.arrowDirection = capitalizedDirection;

    });

    scope.hasSeparator = (!angular.isUndefined(attrs.uifActionText) || !angular.isUndefined(attrs.uifSeparator));

    if (!angular.isUndefined(attrs.uifClose)) {
      scope.closeButton = true;

      let closeButtonElement: angular.IAugmentedJQuery = angular.element(
        '<button class="ms-Callout-close" type="button">' +
        '<i class="ms-Icon ms-Icon--x"></i>' +
        '</button>');

      let calloutDiv: JQuery = instanceElement.find('div').eq(0);
      calloutDiv.append(closeButtonElement);

      // register close button click
      closeButtonElement.bind('click', (eventObject: JQueryEventObject) => {
        scope.ngShow = false;
        scope.closeButtonClicked = true;
        scope.$apply();
      });
    }

    instanceElement.bind('mouseenter', (eventObject: JQueryEventObject) => {
      scope.isMouseOver = true;
      scope.$apply();
    });

    instanceElement.bind('mouseleave', (eventObject: JQueryEventObject) => {
      scope.isMouseOver = false;
      scope.$apply();
    });


    scope.$watch('ngShow', (newValue: boolean, oldValue: boolean) => {
      // close button closes everytime
      let isClosingByButtonClick: boolean = !newValue && scope.closeButtonClicked;
      if (isClosingByButtonClick) {
        scope.ngShow = scope.closeButtonClicked = false;
        return;
      }

      if (!newValue) {
        scope.ngShow = scope.isMouseOver;
      }
    });

    scope.$watch('isMouseOver', (newVal: boolean, oldVal: boolean) => {
      // mouse was over element and now it's out
      if (!newVal && oldVal) {
        // when there's button, only button can close.
        if (!scope.closeButton) {
          scope.ngShow = false;
        }
      }
    });
  }
}

/**
 * @ngdoc module
 * @name officeuifabric.components.callout
 *
 * @description
 * Callout
 *
 */
export let module: angular.IModule = angular.module('officeuifabric.components.callout', ['officeuifabric.components'])
  .directive('uifCallout', CalloutDirective.factory())
  .directive('uifCalloutHeader', CalloutHeaderDirective.factory())
  .directive('uifCalloutContent', CalloutContentDirective.factory())
  .directive('uifCalloutActions', CalloutActionsDirective.factory());
