import * as angular from 'angular';
import { MessageBarTypeEnum } from './messageBarTypeEnum';

/**
 * @controller
 * @name MessageBarController
 * @private
 * @description
 * Used to more easily inject the Angular $log services into the directive.
 */
export class MessageBarController {
  public static $inject: string[] = ['$scope', '$log'];
  constructor(public $scope: IMessageBarScope, public $log: angular.ILogService) {
  }
}

/**
 * @ngdoc interface
 * @name IMessageBarScope
 * @module officeuifabric.components.MessageBar
 *
 * @description
 * This is the scope used by the `<uif-message-bar />` directive.
 *
 * @property {MessageBarTypeEnum} uifType       - Type of the message bar - Possible types are defined in {@link MessageBarTypeEnum}
 * @property {String} classType                 - Conditional class for adding type specific classes
 * @property {String} iconType                  - Conditional class for adding type specific icons
 *
 */
export interface IMessageBarScope extends angular.IScope {
  uifType: MessageBarTypeEnum;
  classType: string;
  iconType: string;
}

/**
 * @ngdoc interface
 * @name IMessageBarAttributes
 * @module officeuifabric.components.MessageBar
 *
 * @description
 * This is the attribute interface used by the directive.
 *
 * @property {MessageBarTypeEnum} uifType       - Type of the message bar - Possible types are defined in {@link MessageBarTypeEnum}
 *
 */
export interface IMessageBarAttributes extends angular.IAttributes {
  uifType: MessageBarTypeEnum;
}

/**
 * @ngdoc directive
 * @name uifMessageBar
 * @module officeuifabric.components.MessageBar
 *
 * @restrict E
 *
 * @description
 * `<uif-message-bar>` is a message bar directive.
 *
 * @see {link http://dev.office.com/fabric/components/MessageBar}
 *
 * @usage
 * <uif-message-bar uif-type="">
 *  <uif-content>
 *      lorem ipsum dolor sit amet, a elit sem interdum consectetur adipiscing elit
 *  </uif-content>
 *  <uif-link ng-href="http://ngofficeuifabric.com">Link text</uif-link>
 * </uif-message-bar>
 */
export class MessageBarDirective implements angular.IDirective {
  public controller: typeof MessageBarController = MessageBarController;

  public restrict: string = 'E';
  public transclude: boolean = true;
  public replace: boolean = false;
  public require: string = 'uifMessageBar';

  public template: string = '' +
  '<div ng-class="[\'ms-MessageBar\', classType]">' +
  '<div class="ms-MessageBar-content">' +
  '<div class="ms-MessageBar-icon">' +
  '<i ng-class="[\'ms-Icon\', iconType]"></i>' +
  '</div>' +
  '<div class="ms-MessageBar-text" />' +
  '</div>' +
  '</div>';

  public scope: any = {
    uifType: '@'
  };


  public static factory(): angular.IDirectiveFactory {
    const directive: angular.IDirectiveFactory =
      ($log: angular.ILogService, $timeout: angular.ITimeoutService) =>
        new MessageBarDirective($log, $timeout);
    directive.$inject = ['$log', '$timeout'];
    return directive;
  }

  constructor(private $log: angular.ILogService, private $timeout: angular.ITimeoutService) {
  };

  public link: angular.IDirectiveLinkFn = (
    $scope: IMessageBarScope, $element: angular.IAugmentedJQuery,
    $attrs: IMessageBarAttributes, $controller: MessageBarController,
    $transclude: angular.ITranscludeFunction): void => {

    // setting defaults
    $scope.iconType = 'ms-Icon--infoCircle';
    $scope.classType = '';

    $scope.uifType = $attrs.uifType;
    $scope.$watch(
      'uifType',
      (newValue: string, oldValue: string) => {
        if (typeof newValue !== 'undefined') {
          // verify a valid type was passed in
          if (MessageBarTypeEnum[newValue] === undefined) {
            $controller.$log.error('Error [ngOfficeUiFabric] officeuifabric.components.messagebar - Unsupported type: ' +
              'The type (\'' + $scope.uifType + '\') is not supported by the Office UI Fabric. ' +
              'Supported options are listed here: ' +
              'https://github.com/ngOfficeUIFabric/ng-officeuifabric/blob/master/src/components/messagebar/' +
              'messageBarTypeEnum.ts');
          } else {
            let className: string = ' ms-MessageBar--';
            $scope.classType = className + newValue;

            switch (MessageBarTypeEnum[newValue]) {
              case MessageBarTypeEnum.error:
                $scope.iconType = 'ms-Icon--xCircle';
                break;
              case MessageBarTypeEnum.remove:
                $scope.iconType = 'ms-Icon--minus ms-Icon--circle';
                break;
              case MessageBarTypeEnum.severewarning:
                $scope.iconType = 'ms-Icon--alert';
                break;
              case MessageBarTypeEnum.success:
                $scope.iconType = 'ms-Icon--checkboxCheck ms-Icon--circle';
                break;
              default:
                break;
            }
          }
        }
      }
    );

    this.transcludeChilds($scope, $element, $transclude);
  }

  private transcludeChilds(
    $scope: IMessageBarScope,
    $element: angular.IAugmentedJQuery,
    $transclude: angular.ITranscludeFunction): void {

    $transclude((clone: angular.IAugmentedJQuery) => {

      let hasContent: boolean = this.hasItemContent(clone, 'uif-content');

      if (!hasContent) {
        this.$log.error('Error [ngOfficeUiFabric] officeuifabric.components.MessageBar - ' +
          'you need to provide a text for the message bar.\n' +
          'For <uif-message-bar> you need to specify' +
          '<uif-content> as a child directive');
      }

      this.insertItemContent(clone, $scope, $element);
    });
  }

  private insertItemContent(
    clone: angular.IAugmentedJQuery, $scope: IMessageBarScope,
    $element: angular.IAugmentedJQuery): void {

    let contentElement: JQuery = angular.element($element[0].querySelector('.ms-MessageBar-text'));

    if (this.hasItemContent(clone, 'uif-content')) { /* content element provided */
      for (let i: number = 0; i < clone.length; i++) {
        let element: angular.IAugmentedJQuery = angular.element(clone[i]);
        if (element.hasClass('uif-content')) {
          contentElement.append(element);
          break;
        }
      }
    }

    if (this.hasItemContent(clone, 'ms-Link')) { /* link element provided */
      for (let i: number = 0; i < clone.length; i++) {
        let element: angular.IAugmentedJQuery = angular.element(clone[i]);
        if (element.hasClass('ms-Link')) {
          contentElement.append(angular.element('<br />'));
          contentElement.append(element);
          break;
        }
      }
    }
  }

  private hasItemContent(
    clone: angular.IAugmentedJQuery,
    selector: string): boolean {
    for (let i: number = 0; i < clone.length; i++) {
      let element: angular.IAugmentedJQuery = angular.element(clone[i]);
      if (element.hasClass(selector)) {
        return true;
      }
    }
    return false;
  }

}

/**
 * @ngdoc module
 * @name officeuifabric.components.MessageBar
 *
 * @description
 * MessageBar
 *
 * @requires OfficeUiFabric > 2.6.0
 *
 */
export let module: angular.IModule = angular.module('officeuifabric.components.messagebar', ['officeuifabric.components'])
  .directive('uifMessageBar', MessageBarDirective.factory());

