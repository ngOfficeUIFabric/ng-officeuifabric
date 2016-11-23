'use strict';

import * as angular from 'angular';
import {PersonaStyleEnum} from '../../core/personaStyleEnum';
import {PresenceEnum} from '../../core/personaPresenceEnum';
import {PersonaInitialsColor} from '../../core/personaInitialsColorEnum';
import {PersonaSize} from './sizeEnum';

/**
 * @ngdoc directive
 * @name uifPersonaText
 * @module officeuifabric.components.persona
 * @restrict E
 *
 * @description
 * `<uif-persona-text>` directive is used to render information about associated user.
 * This directive class is used to provide functionality for multiple text directives:
 * - uif-persona-text-primary
 * - uif-persona-text-secondary
 * - uif-persona-text-tertiary
 * - uif-persona-text-optional
 * Type of directive is determined by the parameter injected into the factory method:
 *
 * <pre>
 *  .directive('uifPersonaTertiaryText', PersonaTextDirective.factory('tertiary'))
 *  .directive('uifPersonaOptionalText', PersonaTextDirective.factory(''));
 * </pre>
 */
export class PersonaTextDirective implements angular.IDirective {
  public restrict: string = 'E';
  public transclude: boolean = true;
  public replace: boolean = false;
  public scope: boolean = false;

  private availableClasses: { [directiveType: string]: string } = {
    'optional': 'ms-Persona-optionalText',
    'primary': 'ms-Persona-primaryText',
    'secondary': 'ms-Persona-secondaryText',
    'tertiary': 'ms-Persona-tertiaryText'
  };

  public static factory(type: string): angular.IDirectiveFactory {
    const directive: angular.IDirectiveFactory = () => new PersonaTextDirective(type);
    return directive;
  }

  // template based on the passed type
  public template: any = ($element: angular.IAugmentedJQuery, $attrs: any) => {
    let directiveTemplate: string = '<div class="' + this.availableClasses[this.directiveType] + '" ng-transclude></div>';
    return directiveTemplate;
  }

  public constructor(private directiveType: string) {
    if (angular.isUndefined(this.availableClasses[this.directiveType])) {
      this.directiveType = 'optional';
    }
  }
}

/**
 * @ngdoc directive
 * @name uifPersonaInitials
 * @module officeuifabric.components.persona
 * @restrict E
 *
 * @description
 * `<uif-persona-initials>` directive is used to render initials of the user when picture is not provided.
 *
 * @usage
 *
 * <uif-persona uif-style="square" uif-size="xlarge" uif-presence="available" uif-image-url="Persona.Person2.png">
 *  <uif-persona-initials>AL</uif-persona-initials>
 * </uif-persona>
 */
export class PersonaInitialsDirective implements angular.IDirective {
  public restrict: string = 'E';
  public transclude: boolean = true;
  public replace: boolean = false;
  public require: string[] = ['^uifPersona'];
  public scope: {} = {
    'uifColor': '@'
  };
  public template: string = '<div class="ms-Persona-initials ms-Persona-initials--{{uifColor}}" ng-transclude></div> ';

  public static factory(): angular.IDirectiveFactory {
    const directive: angular.IDirectiveFactory = () => new PersonaInitialsDirective();
    return directive;
  }

  public link: angular.IDirectiveLinkFn = (
    scope: IPersonaInitialsScope,
    element: angular.IAugmentedJQuery,
    attrs: IPersonaInitialsAttributes,
    ctrls: any) => {

    let personaController: PersonaController = ctrls[0];
    if (angular.isUndefined(attrs.uifColor)) {
      scope.uifColor = PersonaInitialsColor[PersonaInitialsColor.blue];
    }

    scope.$watch('uifColor', (newColor: string) => {

      if (angular.isUndefined(PersonaInitialsColor[newColor])) {
        personaController.$log.error('Error [ngOfficeUiFabric] officeuifabric.components.persona - "' + newColor + '"' +
          ' is not a valid value for uifColor.' +
          ' It should be lightBlue, blue, darkBlue, teal, lightGreen, green,' +
          ' darkGreen, lightPink, pink, magenta, purple, black, orange, red or darkRed.');
      }

    });

  }

}

/**
 * @ngdoc interface
 * @name IPersonaInitialsScope
 * @module officeuifabric.components.persona
 *
 * @description
 * Scope used by the persona directive.
 *
 * @property {string} uifColor Color used for initials
 */

export interface IPersonaInitialsScope extends angular.IScope {
  uifColor: string;
}

/**
 * @ngdoc interface
 * @name IPersonaInitialsAttributes
 * @module officeuifabric.components.persona
 *
 * @description
 * Attributes used by the directive
 *
 * @property {string} uiColor     Determines the color used for initials
 */
export interface IPersonaInitialsAttributes extends angular.IAttributes {
  uifColor: string;
}

/**
 * @ngdoc directive
 * @name uifPersona
 * @module officeuifabric.components.persona
 *
 * @restrict E
 *
 * @description
 * `<uif-persona>` is the persona directive.
 *
 * @see {link http://dev.office.com/fabric/components/persona}
 *
 * @usage
 *
 * <uif-persona uif-style="square" uif-size="xlarge" uif-presence="available" uif-image-url="Persona.Person2.png">
 *  <uif-persona-initials>AL</uif-persona-initials>
 *  <uif-persona-primary-text>Alton Lafferty</uif-persona-primary-text>
 *  <uif-persona-secondary-text>Interior Designer, Contoso</uif-persona-secondary-text>
 *  <uif-persona-tertiary-text>Office: 7/1234</uif-persona-tertiary-text>
 *  <uif-persona-optional-text>Available - Video capable</uif-persona-optional-text>
 * </uif-persona>
 *
 */
export class PersonaDirective implements angular.IDirective {
  public restrict: string = 'E';
  public transclude: boolean = true;
  public replace: boolean = true;
  public require: string[] = ['uifPersona'];
  public controller: any = PersonaController;


  public scope: {} = {
    'uifImageUrl': '@',
    'uifPresence': '@',
    'uifSize': '@'
  };

  public template: string = '<div class="ms-Persona" ng-class="getPersonaClasses()">' +
  '<div class="ms-Persona-imageArea" ng-show="getImageAreaVisibility()">' +
  '<img class="ms-Persona-image" ng-src="{{uifImageUrl}}" ng-if="uifImageUrl">' +
  '</div>' +
  '<div class="ms-Persona-presence"></div>' +
  '<div class="ms-Persona-details"></div>' +
  '</div>';

  // mapping enum to CSS classes for size
  private uifSizeClasses: { [index: number]: string } = {
    [PersonaSize.tiny]: 'ms-Persona--tiny',
    [PersonaSize.xsmall]: 'ms-Persona--xs',
    [PersonaSize.small]: 'ms-Persona--sm',
    [PersonaSize.large]: 'ms-Persona--lg',
    [PersonaSize.xlarge]: 'ms-Persona--xl'
  };

  // mapping enum to CSS classes for presence
  private uifPresenceClasses: { [index: number]: string } = {
    [PresenceEnum.available]: 'ms-Persona--available',
    [PresenceEnum.away]: 'ms-Persona--away',
    [PresenceEnum.blocked]: 'ms-Persona--blocked',
    [PresenceEnum.busy]: 'ms-Persona--busy',
    [PresenceEnum.dnd]: 'ms-Persona--dnd',
    [PresenceEnum.offline]: 'ms-Persona--offline'
  };

  public static factory(): angular.IDirectiveFactory {
    const directive: angular.IDirectiveFactory = () => new PersonaDirective();
    return directive;
  }

  public link: angular.IDirectiveLinkFn = (scope: IPersonaScope,
    element: angular.IAugmentedJQuery,
    attrs: IPersonaAttributes,
    controllers: any,
    transclude: angular.ITranscludeFunction): void => {

    let personaController: PersonaController = controllers[0];

    // validate attributes
    if (angular.isDefined(attrs.uifSize) && angular.isUndefined(PersonaSize[attrs.uifSize])) {
      personaController.$log.error('Error [ngOfficeUiFabric] officeuifabric.components.persona - "' +
        attrs.uifSize + '" is not a valid value for uifSize. It should be tiny, xsmall, small, medium, large, xlarge.');
      return;
    }

    if (angular.isDefined(attrs.uifStyle) && angular.isUndefined(PersonaStyleEnum[attrs.uifStyle])) {
      personaController.$log.error('Error [ngOfficeUiFabric] officeuifabric.components.persona - "' +
        attrs.uifStyle + '" is not a valid value for uifStyle. It should be round or square.');
      return;
    }

    if (angular.isDefined(attrs.uifPresence) && angular.isUndefined(PresenceEnum[attrs.uifPresence])) {
      personaController.$log.error('Error [ngOfficeUiFabric] officeuifabric.components.persona - "' +
        attrs.uifPresence + '" is not a valid value for uifPresence. It should be available, away, blocked, busy, dnd or offline.');
      return;
    }

    scope.getImageAreaVisibility = () => {
      return (PersonaSize[attrs.uifSize] !== PersonaSize.tiny);
    };

    // determines CSS for persona component
    scope.getPersonaClasses = () => {
      let personaClasses: string[] = [];

      let size: number = PersonaSize[attrs.uifSize];
      let presence: number = angular.isDefined(attrs.uifPresence) ? PresenceEnum[attrs.uifPresence] : PresenceEnum.offline;

      if (PersonaStyleEnum[attrs.uifStyle] === PersonaStyleEnum.square) {
        personaClasses.push('ms-Persona--square');
      }

      let sizeClass: string = this.uifSizeClasses[size];
      if (angular.isDefined(sizeClass)) {
        personaClasses.push(sizeClass);
      }

      personaClasses.push(this.uifPresenceClasses[presence]);

      return personaClasses.join(' ');
    };

    transclude((clone: angular.IAugmentedJQuery) => {

      let detailsWrapper: angular.IAugmentedJQuery = angular.element(element[0].getElementsByClassName('ms-Persona-details'));
      let imageArea: angular.IAugmentedJQuery = angular.element(element[0].getElementsByClassName('ms-Persona-imageArea'));

      for (let i: number = 0; i < clone.length; i++) {
        let tagName: string = clone[i].tagName;

        switch (tagName) {
          // text directives go to persona details
          case 'UIF-PERSONA-PRIMARY-TEXT':
          case 'UIF-PERSONA-SECONDARY-TEXT':
          case 'UIF-PERSONA-TERTIARY-TEXT':
          case 'UIF-PERSONA-OPTIONAL-TEXT':
            detailsWrapper.append(clone[i]);
            break;

          // initials go to image area
          case 'UIF-PERSONA-INITIALS':
            imageArea.prepend(clone[i]);
            break;

          default:
            break;
        }
      }
    });
  }
}

/**
 * @ngdoc controller
 * @name PersonaController
 * @module officeuifabric.components.persona
 *
 * @description
 * Controller used for the `<uif-persona>` directive.
 */
export class PersonaController {
  public static $inject: string[] = ['$log'];
  constructor(public $log: angular.ILogService) { }
}

/**
 * @ngdoc interface
 * @name IPersonaAttributes
 * @module officeuifabric.components.persona
 *
 * @description
 * Attributes used by the directive
 *
 * @property {string} uifSize     Determines the size of the component
 * @property {string} uifStyle    Determines round or square size of the component
 * @property {string} uifPresence Indicates presence of the associated user
 */
export interface IPersonaAttributes extends angular.IAttributes {
  uifSize: string;
  uifStyle: string;
  uifPresence: string;
}

/**
 * @ngdoc interface
 * @name IPersonaScope
 * @module officeuifabric.components.persona
 *
 * @description
 * Scope used by the persona directive.
 *
 * @property {string} uifPresence               Indicates presence of the associated user
 * @property {string} uifSize                   Size of the persona card component
 * @property {string} uifImageUrl               User image URL
 * @property {function} getImageAreaVisibility  Determines if the image area should be visible based on component size
 * @property {function} getPersonaClasses       Gets CSS classes for persona component based on type, size and presence
 */
export interface IPersonaScope extends angular.IScope {
  uifPresence: string;
  uifSize: string;
  uifImageUrl: string;

  getImageAreaVisibility: () => boolean;
  getPersonaClasses: () => string;
}

/**
 * @ngdoc module
 * @name officeuifabric.components.persona
 *
 * @description
 * Persona
 */
export let module: angular.IModule = angular.module('officeuifabric.components.persona', ['officeuifabric.components'])
  .directive('uifPersona', PersonaDirective.factory())
  .directive('uifPersonaInitials', PersonaInitialsDirective.factory())
  .directive('uifPersonaPrimaryText', PersonaTextDirective.factory('primary'))
  .directive('uifPersonaSecondaryText', PersonaTextDirective.factory('secondary'))
  .directive('uifPersonaTertiaryText', PersonaTextDirective.factory('tertiary'))
  .directive('uifPersonaOptionalText', PersonaTextDirective.factory(''));
