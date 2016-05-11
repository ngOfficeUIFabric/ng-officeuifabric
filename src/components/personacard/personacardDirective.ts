'use strict';

import * as ng from 'angular';
import {PersonaSize} from './sizeEnum';
import {PlaceholderEnum} from './placeholderEnum';
import {PersonaStyleEnum} from '../../core/personaStyleEnum';
import {PresenceEnum} from '../../core/personaPresenceEnum';

/**
 * @ngdoc directive
 * @name uifPersonaCard
 * @module officeuifabric.components.personacard
 *
 * @restrict E
 *
 * @description
 * `<uif-persona-card>` is the personacard directive.
 *
 * @see {link http://dev.office.com/fabric/components/personacard}
 *
 * @usage
 *
 * <uif-persona-card uif-style="square" uif-size="small" uif-presence="dnd">
 *  <uif-persona-card-primary-text>Alton Lafferty</uif-persona-card-primary-text>
 *  <uif-persona-card-secondary-text>Interior Designer, Contoso</uif-persona-card-secondary-text>
 *  <uif-persona-card-tertiary-text>Office: 7/1234</uif-persona-card-tertiary-text>
 *  <uif-persona-card-optional-text>Available - Video capable</uif-persona-card-optional-text>
 *  <uif-persona-card-action uif-icon="video" uif-placeholder="regular">
 *    <uif-persona-card-detail-line>
 *      <uif-persona-card-detail-label>Personal:</uif-persona-card-detail-label> 555.206.2443
 *    </uif-persona-card-detail-line>
 *    <uif-persona-card-detail-line>
 *      <uif-persona-card-detail-label>Work:</uif-persona-card-detail-label> 555.929.8240
 *    </uif-persona-card-detail-line>
 *  </uif-persona-card-action>
 *  <uif-persona-card-action uif-icon="org" uif-placeholder="overflow">View profile</uif-persona-card-action>
 *  </uif-persona-card>
 *
 */
export class PersonaCardDirective implements ng.IDirective {
  public restrict: string = 'E';
  public transclude: boolean = true;
  public replace: boolean = true;
  public require: string[] = ['uifPersonaCard'];
  public controller: any = PersonaCardController;

  public scope: {} = {
    'uifPresence': '@',
    'uifSize': '@',
    'uifImageUrl': '@'
  };

  public template: string = '<div class="ms-PersonaCard" ng-class="getPersonaCardClasses()">' +
  '<div class="ms-PersonaCard-persona">' +
  '<div class="ms-Persona" ng-class="getPersonaClasses()">' +
  '<div class="ms-Persona-imageArea">' +
  '<uif-icon uif-type="person"></uif-icon>' +
  '<img class="ms-Persona-image" ng-src="{{uifImageUrl}}" ng-if="uifImageUrl">' +
  '</div>' +
  '<div class="ms-Persona-presence"></div>' +
  '<div class="ms-Persona-details"></div>' +
  '</div>' +
  '</div>' +
  '<ul class="ms-PersonaCard-actions">' +
  '<li ng-repeat="action in personaCardActions" ng-class="getActionClasses(action)" ng-click="selectAction($event, action)">' +
  '<uif-icon uif-type={{action.icon}} ng-if="action.placeholder != \'overflow\'"></uif-icon>' +
  '</li>' +
  '</ul>' +
  '<div class="ms-PersonaCard-actionDetailBox">' +
  '<ul ng-class="detailClass"></ul>' +
  '</div>' +
  '</div>';

  public static factory(): ng.IDirectiveFactory {
    const directive: ng.IDirectiveFactory = () => new PersonaCardDirective();
    return directive;
  }

  public link: ng.IDirectiveLinkFn = (scope: IPersonaCardScope,
    element: ng.IAugmentedJQuery,
    attrs: IPersonaCardAttributes,
    controllers: any,
    transclude: ng.ITranscludeFunction): void => {

    let personaCardController: PersonaCardController = controllers[0];

    // add class to icon in image area
    let icon: ng.IAugmentedJQuery = element.find('uif-icon');
    icon.addClass('ms-Persona-placeholder');

    // validate attributes
    if (ng.isDefined(attrs.uifSize) && ng.isUndefined(PersonaSize[attrs.uifSize])) {
      personaCardController.$log.error('Error [ngOfficeUiFabric] officeuifabric.components.personacard - "' +
        attrs.uifSize + '" is not a valid value for uifSize. It should be xsmall, small, medium, large, xlarge.');
      return;
    }

    if (ng.isDefined(attrs.uifStyle) && ng.isUndefined(PersonaStyleEnum[attrs.uifStyle])) {
      personaCardController.$log.error('Error [ngOfficeUiFabric] officeuifabric.components.personacard - "' +
        attrs.uifStyle + '" is not a valid value for uifStyle. It should be round or square.');
      return;
    }

    if (ng.isDefined(attrs.uifPresence) && ng.isUndefined(PresenceEnum[attrs.uifPresence])) {
      personaCardController.$log.error('Error [ngOfficeUiFabric] officeuifabric.components.personacard - "' +
        attrs.uifPresence + '" is not a valid value for uifPresence. It should be available, away, blocked, busy, dnd or offline.');
      return;
    }

    // determine CSS for action elements
    scope.getActionClasses = (action: PersonaCardAction) => {
      let actionClasses: string[] = [];

      let placeholder: number = PlaceholderEnum[action.placeholder];

      switch (placeholder) {
        case PlaceholderEnum.topright:
          actionClasses.push('ms-PersonaCard-action');
          actionClasses.push('ms-PersonaCard-orgChart');
          break;
        case PlaceholderEnum.regular:
          actionClasses.push('ms-PersonaCard-action');
          break;
        default:
          break;
      }

      if (action.isActive) {
        actionClasses.push('is-active');
      }

      return actionClasses.join(' ');
    };

    // determines CSS for main persona component
    scope.getPersonaClasses = () => {
      let personaClasses: string[] = [];

      if (PersonaStyleEnum[attrs.uifStyle] === PersonaStyleEnum.square) {
        personaClasses.push('ms-Persona--square');
      }

      // size CSS
      switch (PersonaSize[attrs.uifSize]) {
        case PersonaSize.xsmall:
          personaClasses.push('ms-Persona--xs');
          break;
        case PersonaSize.small:
          personaClasses.push('ms-Persona--sm');
          break;
        case PersonaSize.large:
          personaClasses.push('ms-Persona--lg');
          break;
        case PersonaSize.xlarge:
          personaClasses.push('ms-Persona--xl');
          break;

        default:
          // no css needed for medium
          break;
      }

      // presence CSS
      switch (PresenceEnum[attrs.uifPresence]) {
        case PresenceEnum.available:
          personaClasses.push('ms-Persona--available');
          break;
        case PresenceEnum.away:
          personaClasses.push('ms-Persona--away');
          break;
        case PresenceEnum.blocked:
          personaClasses.push('ms-Persona--blocked');
          break;
        case PresenceEnum.busy:
          personaClasses.push('ms-Persona--busy');
          break;
        case PresenceEnum.dnd:
          personaClasses.push('ms-Persona--dnd');
          break;
        default:
          personaClasses.push('ms-Persona--offline');
          break;
      }

      return personaClasses.join(' ');
    };

    // get CSS for persona card component
    scope.getPersonaCardClasses = () => {
      return PersonaStyleEnum[attrs.uifStyle] === PersonaStyleEnum.square ? 'ms-PersonaCard--square' : '';
    };

    // move transcluded elements around
    transclude((clone: ng.IAugmentedJQuery) => {

      let detailsWrapper: ng.IAugmentedJQuery = ng.element(element[0].getElementsByClassName('ms-Persona-details'));
      let actionDetailsBoxList: JQuery = ng.element(element[0].getElementsByClassName('ms-PersonaCard-actionDetailBox'))
        .find('ul').eq(0);

      let actionsList: JQuery = ng.element(element[0].getElementsByClassName('ms-PersonaCard-actions'));

      for (let i: number = 0; i < clone.length; i++) {
        let tagName: string = clone[i].tagName;

        switch (tagName) {
          // text directives go to persona details
          case 'UIF-PERSONA-CARD-PRIMARY-TEXT':
          case 'UIF-PERSONA-CARD-SECONDARY-TEXT':
          case 'UIF-PERSONA-CARD-TERTIARY-TEXT':
          case 'UIF-PERSONA-CARD-OPTIONAL-TEXT':
            detailsWrapper.append(clone[i]);
            break;

          // actions go to action lists, depending on the placeholder
          case 'UIF-PERSONA-CARD-ACTION':
            let wrappedAction: ng.IAugmentedJQuery = ng.element(clone[i]);
            let placeholder: string = wrappedAction.attr('uif-placeholder');

            // overflow goes to ms-PersonaCard-actions
            if (PlaceholderEnum[placeholder] === PlaceholderEnum.overflow) {
              actionsList.append(wrappedAction);
            } else {
              actionDetailsBoxList.append(this.processAction(wrappedAction, scope, personaCardController));
            }

            break;

          default:
            break;
        }
      }
    });

  };

  /**
   * Ensures that proper CSS is attached to the action node and registers action in the controller for rendering.
   */
  private processAction(
    clone: ng.IAugmentedJQuery,
    scope: IPersonaCardScope,
    personaCardController: PersonaCardController): ng.IAugmentedJQuery {
    let classToAdd: string = '';
    let placeholder: string = clone.attr('uif-placeholder');
    let icon: string = clone.attr('uif-icon');
    let actionToAdd: PersonaCardAction = new PersonaCardAction(icon, placeholder);

    switch (placeholder) {
      case PlaceholderEnum[PlaceholderEnum.regular]:
        classToAdd = 'detail-' + (++scope.regularActionsCount);
        break;

      case PlaceholderEnum[PlaceholderEnum.topright]:
        classToAdd = 'detail-5';
        break;

      default:
        break;
    }

    // applying classes directly to the list element
    clone.find('li').eq(0).addClass(classToAdd);

    actionToAdd.detailClass = classToAdd;
    personaCardController.addAction(actionToAdd);

    return clone;
  };

}

/**
 * @ngdoc controller
 * @name PersonaCardController
 * @module officeuifabric.components.personacard
 *
 * @description
 * Controller used for the `<uif-persona-card>` directive.
 * Main focus is around handling click events on the directive actions.
 */
export class PersonaCardController {
  public static $inject: string[] = ['$log', '$scope'];

  private detailCss: { [index: number]: string } = {
    1: 'Chat',
    2: 'Phone',
    3: 'Video',
    4: 'Mail',
    5: 'Org'
  };

  constructor(public $log: ng.ILogService, public $scope: IPersonaCardScope) {
    $scope.personaCardActions = new Array<PersonaCardAction>();
    $scope.regularActionsCount = 0;
    $scope.detailClass = 'ms-PersonaCard-detailChat';

    // handle click on the action
    $scope.selectAction = ($event: MouseEvent, action: PersonaCardAction): void => {
      $scope.personaCardActions.forEach((value: PersonaCardAction) => {
        value.isActive = false;
      });
      action.isActive = true;

      let detailNumber: number = +(action.detailClass.charAt(action.detailClass.length - 1));
      $scope.detailClass = 'ms-PersonaCard-detail' + this.detailCss[detailNumber];
    };
  }

  /**
   * Registers the actionin the controller for rendering.
   * Makes sure that first added action is active.
   */
  public addAction(actionToAdd: PersonaCardAction): void {
    // make first action active
    if (this.$scope.personaCardActions.length === 0) {
      actionToAdd.isActive = true;
    }
    this.$scope.personaCardActions.push(actionToAdd);
  }
}

/**
 * @ngdoc interface
 * @name IPersonaCardAttributes
 * @module officeuifabric.components.personacard
 *
 * @description
 * Attributes used by the directive
 *
 * @property {string} uifSize     Determines the size of the component
 * @property {string} uifStyle    Determines round or square size of the component
 * @property {string} uifPresence Indicates presence of the associated user
 */
export interface IPersonaCardAttributes extends ng.IAttributes {
  uifSize: string;
  uifStyle: string;
  uifPresence: string;
}

/**
 * @ngdoc interface
 * @name IPersonaCardScope
 * @module officeuifabric.components.personacard
 *
 * @description
 * Scope used by the persona card directive.
 *
 * @property {string} uifPresence             Indicates presence of the associated user
 * @property {string} uifSize                 Size of the persona card component
 * @property {string} uifImageUrl             User image URL
 * @property {number} regularActionsCount     Number of regular actions on the persona card for generating proper CSS
 * @property {function} getPersonaCardClasses Gets CSS classes for persona card based on type
 * @property {function} getPersonaClasses     Gets CSS classes for persona component based on type, size and presence
 * @property {function} getActionClasses      Gets CSS classes for action elements rendered on the persona card
 * @property {string} detailClass             CSS class name indicating current action being selected
 * @property {function} selectAction          Select proper action when action element is clicked
 * @property {collection} personaCardActions  Actions rendered for regular and topright placeholder
 */
export interface IPersonaCardScope extends ng.IScope {
  uifPresence: string;
  uifSize: string;
  uifImageUrl: string;

  regularActionsCount: number;

  getPersonaCardClasses: () => string;
  getPersonaClasses: () => string;
  getActionClasses: (action: PersonaCardAction) => string;

  detailClass: string;
  selectAction: ($event: MouseEvent, selectedAction: PersonaCardAction) => void;

  personaCardActions: PersonaCardAction[];
}

/**
 * @ngdoc object
 * @name PersonaCardAction
 * @module officeuifabric.components.personacard
 *
 * @description
 * Helper class used for rendering action buttons for regular and topright placeholder.
 *
 * @property {string} icon  Icon used by particular action
 * @property {string} placeholder Placeholder where action belongs to
 * @property {boolean} isActive   True if the action was clicked and is considered current
 * @property {string} detailClass Name of the CSS class that should be applied to list element
 */
class PersonaCardAction {
  public isActive: boolean;
  public detailClass: string;

  constructor(
    public icon: string,
    public placeholder: string) { }

}

/**
 * @ngdoc directive
 * @name uifPersonaCardText
 * @module officeuifabric.components.personacard
 * @restrict E
 *
 * @description
 * `<uif-persona-card-text>` directive is used to render information about associated user.
 * This directive class is used to provide functionality for multiple text directives:
 * - uif-persona-card-text-primary
 * - uif-persona-card-text-secondary
 * - uif-persona-card-text-tertiary
 * - uif-persona-card-text-optional
 * Type of directive is determined by the parameter injected into the factory method:
 *
 * <pre>
 *  .directive('uifPersonaCardTertiaryText', PersonaCardTextDirective.factory('tertiary'))
 *  .directive('uifPersonaCardOptionalText', PersonaCardTextDirective.factory(''));
 * </pre>
 */
export class PersonaCardTextDirective implements ng.IDirective {
  public restrict: string = 'E';
  public transclude: boolean = true;
  public replace: boolean = false;
  public scope: boolean = false;

  private availableClasses: { [directiveType: string]: string } = {
    'primary': 'ms-Persona-primaryText',
    'secondary': 'ms-Persona-secondaryText',
    'tertiary': 'ms-Persona-tertiaryText',
    'optional': 'ms-Persona-optionalText'
  };

  public static factory(type: string): ng.IDirectiveFactory {
    const directive: ng.IDirectiveFactory = () => new PersonaCardTextDirective(type);
    return directive;
  }

  // template based on the passed type
  public template: ng.IComponentTemplateFn = ($element: ng.IAugmentedJQuery, $attrs: any) => {
    let directiveTemplate: string = '<div class="' + this.availableClasses[this.directiveType] + '" ng-transclude></div>';
    return directiveTemplate;
  };

  public constructor(private directiveType: string) {
    if (ng.isUndefined(this.availableClasses[this.directiveType])) {
      this.directiveType = 'optional';
    }
  }
}

/**
 * @ngdoc directive
 * @name uifPersonaCardAction
 * @module officeuifabric.components.personacard
 * @restrict E
 *
 * @description
 * `<uif-persona-card-action>` is used to render the actions for the persona card.
 * Action can define icon that is used to render and placehodler where it should be placed:
 * - in the top-right corner of persona (topright)
 * - in the action bar below persona with icon (regular)
 * - in the right of the action bar below persona (overflow)
 *
 * @usage
 *
 * <uif-persona-card uif-style="square" uif-size="small" uif-presence="dnd">
 *   <uif-persona-card-action uif-icon="video" uif-placeholder="regular">Video capable</uif-persona-card-action>
 *   <uif-persona-card-action uif-icon="org" uif-placeholder="topright">Org chart</uif-persona-card-action>
 *   <uif-persona-card-action uif-placeholder="overflow">View profile</uif-persona-card-action>
 * </uif-persona-card>
 */
export class PersonaCardActionDirective implements ng.IDirective {
  public restrict: string = 'E';
  public transclude: boolean = true;
  public replace: boolean = false;
  public require: string = '^?uifPersonaCard';
  public scope: boolean = false;

  public static factory(): ng.IDirectiveFactory {
    const directive: ng.IDirectiveFactory = ($log: ng.ILogService) => new PersonaCardActionDirective($log);
    directive.$inject = ['$log'];
    return directive;
  }

  constructor(private $log: ng.ILogService) { };

  public template: ng.IComponentTemplateFn = (instanceElement: ng.IAugmentedJQuery, actionAttrs: IPersonaCardActionAttributes) => {
    if (ng.isDefined(actionAttrs.uifPlaceholder) && ng.isUndefined(PlaceholderEnum[actionAttrs.uifPlaceholder])) {
      this.$log.error('Error [ngOfficeUiFabric] officeuifabric.components.personacard - ' +
        '"' + actionAttrs.uifPlaceholder + '" is not a valid value for uifPlaceholder. It should be regular, topright or overflow.');
      return '';
    }

    if (PlaceholderEnum[actionAttrs.uifPlaceholder] === PlaceholderEnum.overflow) {
      return '<li class="ms-PersonaCard-overflow" ng-transclude></li>';
    }

    return '<li class="ms-PersonaCard-actionDetails" ng-transclude></li>';
  };

}

/**
 * @ngdoc interface
 * @name IPersonaCardActionAttributes
 * @module officeuifabric.components.personacard
 *
 * @description
 * Attributes used by `<uif-persona-card-action>`.
 *
 * @property {string} uifIcon Icon to be used for associated action
 * @property {string} uifPlaceholder Indicated where the action should be rendered
 */
export interface IPersonaCardActionAttributes extends ng.IAttributes {
  uifIcon: string;
  uifPlaceholder: string;
}

/**
 * @ngdoc directive
 * @name uifPersonaCardDetailLabel
 * @module officeuifabric.components.personacard
 * @restrict E
 *
 * @description
 * `<uif-persona-card-detail-label>` is intended to render labels within action details
 *
 * @usage
 *
 * <uif-persona-card uif-style="round" uif-size="xlarge" uif-presence="away">
 *   <uif-persona-card-action uif-icon="chat" uif-placeholder="regular">
 *     <uif-persona-card-detail-line>
 *       <uif-persona-card-detail-label>Lync:</uif-persona-card-detail-label> <uif-link ng-href="#">Start Lync call</uif-link>
 *     </uif-persona-card-detail-line>
 *   </uif-persona-card-action>
 * </uif-persona-card>
 */
export class PersonaCardDetailLabelDirective implements ng.IDirective {
  public restrict: string = 'E';
  public transclude: boolean = true;
  public replace: boolean = true;
  public scope: boolean = false;
  public template: string = '<span class="ms-PersonaCard-detailLabel" ng-transclude></span>';

  public static factory(): ng.IDirectiveFactory {
    const directive: ng.IDirectiveFactory = () => new PersonaCardDetailLabelDirective();
    return directive;
  }
}

/**
 * @ngdoc directive
 * @name uifPersonaCardDetailLine
 * @module officeuifabric.components.personacard
 * @restrict E
 *
 * @description
 * `<uif-persona-card-detail-line>` is rendering details of the action within the action container
 *
 * @usage
 *
 * <uif-persona-card uif-style="round" uif-size="xlarge" uif-presence="away">
 *   <uif-persona-card-action uif-icon="chat" uif-placeholder="regular">
 *     <uif-persona-card-detail-line>
 *       <uif-link ng-href="#">Start Lync call</uif-link>
 *     </uif-persona-card-detail-line>
 *   </uif-persona-card-action>
 * </uif-persona-card>
 */
export class PersonaCardDetailLineDirective implements ng.IDirective {
  public restrict: string = 'E';
  public transclude: boolean = true;
  public replace: boolean = true;
  public scope: boolean = false;
  public template: string = '<div class="ms-PersonaCard-detailLine" ng-transclude></div>';

  public static factory(): ng.IDirectiveFactory {
    const directive: ng.IDirectiveFactory = () => new PersonaCardDetailLineDirective();
    return directive;
  }
}

/**
 * @ngdoc module
 * @name officeuifabric.components.personacard
 *
 * @description
 * PersonaCard
 */
export var module: ng.IModule = ng.module('officeuifabric.components.personacard', ['officeuifabric.components'])
  .directive('uifPersonaCard', PersonaCardDirective.factory())
  .directive('uifPersonaCardAction', PersonaCardActionDirective.factory())
  .directive('uifPersonaCardDetailLabel', PersonaCardDetailLabelDirective.factory())
  .directive('uifPersonaCardDetailLine', PersonaCardDetailLineDirective.factory())
  .directive('uifPersonaCardPrimaryText', PersonaCardTextDirective.factory('primary'))
  .directive('uifPersonaCardSecondaryText', PersonaCardTextDirective.factory('secondary'))
  .directive('uifPersonaCardTertiaryText', PersonaCardTextDirective.factory('tertiary'))
  .directive('uifPersonaCardOptionalText', PersonaCardTextDirective.factory(''));
