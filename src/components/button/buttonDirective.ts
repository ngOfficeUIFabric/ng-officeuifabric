'use strict';

import * as angular from 'angular';
import {ButtonTypeEnum} from './buttonTypeEnum';
import {ButtonTemplateType} from './buttonTemplateType';

export interface IButtonScope extends angular.IScope {
  disabled: boolean;
  uifType: string;
}
export interface IButtonAttributes extends angular.IAttributes {
  uifType: string;
  ngHref: string;
  disabled: string;
}

/**
 * @controller
 * @name ButtonController
 * @private
 * @description
 * Used to more easily inject the Angular $log service into the directive.
 */
class ButtonController {
  public static $inject: string[] = ['$log'];
  constructor(public $log: angular.ILogService) { }
}

/**
 * @ngdoc directive
 * @name uifButton
 * @module officeuifabric.components.button
 *
 * @restrict E
 *
 * @description
 * `<uif-button>` is a button directive. This direcive implements multiple types
 * of buttons including action, primary, command, compound and hero buttons. Each type
 * may also support inclusion of icons using the `<uif-icon>` directive. Buttons are
 * rendered as a `<button>` or `<a>` element depending in an `ng-href` attribute is
 * specified. All buttons can be disabled by adding the `disabled` attribute
 *
 * @see {link http://dev.office.com/fabric/components/button}
 *
 * @usage
 *
 * Regular buttons:
 * <uif-button>Lorem Ipsum</uif-button>
 *
 * Primary buttons:
 * <uif-button uif-type="primary">Lorem Ipsum</uif-button>
 *
 * Disabled buttons:
 * <uif-button disabled="disabled">Lorem Ipsum</uif-button>
 * or
 * <uif-button ng-disabled="true">Lorem Ipsum</uif-button>
 *
 * Command buttons:
 * <uif-button uif-type="command">Lorem Ipsum</uif-button>
 * <uif-button uif-type="command">
 *   <uif-icon uif-type="plus"></uif-icon>Lorem Ipsum
 * </uif-button>
 *
 * Compound buttons:
 * <uif-button uif-type="Compound">Lorem Ipsum</uif-button>
 * <uif-button uif-type="Compound">
 *   Lorem Ipsum
 *   <uif-button-description>Lorem Ipsum Description</uif-button-description>
 * </uif-button>
 *
 * Hero buttons:
 * <uif-button uif-type="Hero">Lorem Ipsum</uif-button>
 * <uif-button uif-type="Hero">
 *   <uif-icon uif-type="plus"></uif-icon>
 *   Lorem Ipsum
 * </uif-button>
 */
export class ButtonDirective implements angular.IDirective {

  public restrict: string = 'E';
  public transclude: boolean = true;
  public replace: boolean = true;
  public scope: {} = {};
  public controller: any = ButtonController;
  public controllerAs: string = 'button';

  // array of all the possibilities for a button
  private templateOptions: { [buttonTemplateType: number]: string } = {};

  public static factory(): angular.IDirectiveFactory {
    const directive: angular.IDirectiveFactory = ($log: angular.ILogService) => new ButtonDirective($log);
    directive.$inject = ['$log'];
    return directive;
  }

  constructor(private $log: angular.ILogService) {
    this._populateHtmlTemplates();
  }

  public template: any = ($element: angular.IAugmentedJQuery, $attrs: IButtonAttributes) => {
    // verify button type is supported
    if (!angular.isUndefined($attrs.uifType) && angular.isUndefined(ButtonTypeEnum[$attrs.uifType])) {
      this.$log.error('Error [ngOfficeUiFabric] officeuifabric.components.button - Unsupported button: ' +
        'The button (\'' + $attrs.uifType + '\') is not supported by the Office UI Fabric. ' +
        'Supported options are listed here: ' +
        'https://github.com/ngOfficeUIFabric/ng-officeuifabric/blob/master/src/components/button/buttonTypeEnum.ts');
    }

    // determine template
    switch ($attrs.uifType) {
      // if hero, return button | link
      case ButtonTypeEnum[ButtonTypeEnum.primary]:
        return angular.isUndefined($attrs.ngHref)
          ? this.templateOptions[ButtonTemplateType.primaryButton]
          : this.templateOptions[ButtonTemplateType.primaryLink];
      // if command, return button | link
      case ButtonTypeEnum[ButtonTypeEnum.command]:
        return angular.isUndefined($attrs.ngHref)
          ? this.templateOptions[ButtonTemplateType.commandButton]
          : this.templateOptions[ButtonTemplateType.commandLink];
      // if compound, return button | link
      case ButtonTypeEnum[ButtonTypeEnum.compound]:
        return angular.isUndefined($attrs.ngHref)
          ? this.templateOptions[ButtonTemplateType.compoundButton]
          : this.templateOptions[ButtonTemplateType.compoundLink];
      // if hero, return button | link
      case ButtonTypeEnum[ButtonTypeEnum.hero]:
        return angular.isUndefined($attrs.ngHref)
          ? this.templateOptions[ButtonTemplateType.heroButton]
          : this.templateOptions[ButtonTemplateType.heroLink];
      // else no type specified, so it's an action button
      default:
        return angular.isUndefined($attrs.ngHref)
          ? this.templateOptions[ButtonTemplateType.actionButton]
          : this.templateOptions[ButtonTemplateType.actionLink];
    }
  }

  public compile(element: angular.IAugmentedJQuery,
                 attrs: IButtonAttributes,
                 transclude: angular.ITranscludeFunction): angular.IDirectivePrePost {
    return {
      post: this.postLink,
      pre: this.preLink
    };
  }

  /**
   * Update the scope before linking everything up.
   */
  private preLink(scope: IButtonScope,
                  element: angular.IAugmentedJQuery,
                  attrs: IButtonAttributes,
                  controllers: any,
                  transclude: angular.ITranscludeFunction): void {

    attrs.$observe('disabled', (isDisabled) => {
      scope.disabled = !!isDisabled;
    });

    // if disabled prevent click action
    element.on('click', (e: Event) => {
      if (scope.disabled) {
        e.preventDefault();
      }
    });
  }

  /**
   * Check the rendered HTML for anything that is invalid.
   */
  private postLink(scope: IButtonScope,
                   element: angular.IAugmentedJQuery,
                   attrs: IButtonAttributes,
                   controllers: any,
                   transclude: angular.ITranscludeFunction): void {

    // if an icon was added to the button's contents for specific button types
    //  that don't support icons, remove the icon
    if (angular.isUndefined(attrs.uifType) ||
        attrs.uifType === ButtonTypeEnum[ButtonTypeEnum.primary] ||
        attrs.uifType === ButtonTypeEnum[ButtonTypeEnum.compound]) {
      let iconElement: JQuery = element.find('uif-icon');
      if (iconElement.length !== 0) {
        iconElement.remove();
        controllers.$log.error('Error [ngOfficeUiFabric] officeuifabric.components.button - ' +
          'Icon not allowed in primary or compound buttons: ' +
          'The primary & compound button does not support including icons in the body. ' +
          'The icon has been removed but may cause rendering errors. Consider buttons that support icons such as command or hero.');
      }
    }

    // create necessary wrappers around inner content in button depending on button type
    transclude((clone: angular.IAugmentedJQuery) => {
      let wrapper: angular.IAugmentedJQuery;

      switch (attrs.uifType) {
        // if type === command
        case ButtonTypeEnum[ButtonTypeEnum.command]:
          for (let i: number = 0; i < clone.length; i++) {
            // wrap the button label
            if (clone[i].tagName === 'SPAN') {
              wrapper = angular.element('<span></span>');
              wrapper.addClass('ms-Button-label').append(clone[i]);
              element.append(wrapper);
            }
            // wrap the button's icon
            if (clone[i].tagName === 'UIF-ICON') {
              wrapper = angular.element('<span></span>');
              wrapper.addClass('ms-Button-icon').append(clone[i]);
              element.append(wrapper);
            }
          }
          break;
        // if type === compound
        case ButtonTypeEnum[ButtonTypeEnum.compound]:
          for (let i: number = 0; i < clone.length; i++) {
            // if not a span, stop checkiangular...
            if (clone[i].tagName !== 'SPAN') {
              continue;
            }

            // wrap the button label
            if (clone[i].classList[0] === 'ng-scope' &&
                clone[i].classList.length === 1) {
              wrapper = angular.element('<span></span>');
              wrapper.addClass('ms-Button-label').append(clone[i]);
              element.append(wrapper);
            // add the description... just add it to the button
            } else {
              element.append(clone[i]);
            }
          }
          break;
        // if type === hero
        case ButtonTypeEnum[ButtonTypeEnum.hero]:
          for (let i: number = 0; i < clone.length; i++) {
            // wrap the label
            if (clone[i].tagName === 'SPAN') {
              wrapper = angular.element('<span></span>');
              wrapper.addClass('ms-Button-label').append(clone[i]);
              element.append(wrapper);
            }
            // wrap the icon
            if (clone[i].tagName === 'UIF-ICON') {
              wrapper = angular.element('<span></span>');
              wrapper.addClass('ms-Button-icon').append(clone[i]);
              element.append(wrapper);
            }
          }
          break;
        default:
          break;
      }
    });

  }

  private _populateHtmlTemplates(): void {
    // regular / action button
    this.templateOptions[ButtonTemplateType.actionButton] =
      `<button class="ms-Button" ng-class="{\'is-disabled\': disabled}">
         <span class="ms-Button-label" ng-transclude></span>
       </button>`;
    this.templateOptions[ButtonTemplateType.actionLink] =
      `<a class="ms-Button" ng-class="{\'is-disabled\': disabled}">
         <span class="ms-Button-label" ng-transclude></span>
       </a>`;

    // primary button
    this.templateOptions[ButtonTemplateType.primaryButton] =
      `<button class="ms-Button ms-Button--primary" ng-class="{\'is-disabled\': disabled}">
         <span class="ms-Button-label" ng-transclude></span>
       </button>`;
    this.templateOptions[ButtonTemplateType.primaryLink] =
      `<a class="ms-Button ms-Button--primary" ng-class="{\'is-disabled\': disabled}">
         <span class="ms-Button-label" ng-transclude></span>
       </a>`;

    // command button
    this.templateOptions[ButtonTemplateType.commandButton] =
      `<button class="ms-Button ms-Button--command" ng-class="{\'is-disabled\': disabled}"></button>`;
    this.templateOptions[ButtonTemplateType.commandLink] =
      `<a class="ms-Button ms-Button--command" ng-class="{\'is-disabled\': disabled}"></a>`;

    // compound button
    this.templateOptions[ButtonTemplateType.compoundButton] =
      `<button class="ms-Button ms-Button--compound" ng-class="{\'is-disabled\': disabled}"></button>`;
    this.templateOptions[ButtonTemplateType.compoundLink] =
      `<a class="ms-Button ms-Button--compound" ng-class="{\'is-disabled\': disabled}"></a>`;

    // hero button
    this.templateOptions[ButtonTemplateType.heroButton] =
      `<button class="ms-Button ms-Button--hero" ng-class="{\'is-disabled\': disabled}"></button>`;
    this.templateOptions[ButtonTemplateType.heroLink] =
      `<a class="ms-Button ms-Button--hero" ng-class="{\'is-disabled\': disabled}"></a>`;
  }
}


/**
 * @ngdoc directive
 * @name uifDescriptionButton
 * @module officeuifabric.components.button
 *
 * @restrict E
 *
 * @description
 * `<uif-button-description>` is a button description directive.
 *
 * @see {link http://dev.office.com/fabric/components/button}
 *
 * @usage
 *
 * <uif-button-description>Lorem Ipsum</uif-button-description>
 */
export class ButtonDescriptionDirective implements angular.IDirective {

  public restrict: string = 'E';
  public require: string = '^uifButton';
  public transclude: boolean = true;
  public replace: boolean = true;
  public scope: boolean = false;
  public template: string = '<span class="ms-Button-description" ng-transclude></span>';

  public static factory(): angular.IDirectiveFactory {
    const directive: angular.IDirectiveFactory = () => new ButtonDescriptionDirective();
    return directive;
  }

}

/**
 * @ngdoc module
 * @name officeuifabric.components.button
 *
 * @description
 * Button
 *
 */
export let module: angular.IModule = angular.module('officeuifabric.components.button', [
  'officeuifabric.components'
])
  .directive('uifButton', ButtonDirective.factory())
  .directive('uifButtonDescription', ButtonDescriptionDirective.factory());
