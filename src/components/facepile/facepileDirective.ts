'use strict';

import * as ng from 'angular';
import {IPerson} from '../../core/person';

/**
 * @ngdoc interface
 * @name IFacepileScope
 * @module officeuifabric.components.facepile
 *
 * @description
 * This is the scope used by the `<uif-facepile>` directive.
 *
 * @property {string} uifFacepileName      - The name which appears in the overflow menu
 * @property {string} uifOverflowLimit     - The number of uifPerson icons to show
 * @property {string} overflowPanelIsOpen  - Indicates whether the members panel is open
 * @property {IPerson} members             - A collection of members of the facepile
 */
export interface IFacepileScope extends ng.IScope {
  uifFacepileName: string;
  uifOverflowLimit: Number;
  overflowPanelIsOpen: boolean;
  members: IPerson[];
}

/**
 * @ngdoc directive
 * @name uifFacecpile
 * @module officeuifabric.components.facepile
 *
 * @restrict E
 *
 * @description
 * `<uif-facepile>` is a facepile directive.
 *
 * @see {link http://dev.office.com/fabric/components/facepile}
 *
 *
 * @usage
 *    <uif-facepile ng-model="PeoplePickerMembers" uif-overflow-limit="5" uif-facepile-name="Members">
 *    </uif-facepile>
 *
 */
export class FacepileDirective implements ng.IDirective {

  public transclude: boolean = true;
  public replace: boolean = true;
  public restrict: string = 'E';

  public template: string = `<div class="ms-Facepile">
                                <ng-transclude></ng-transclude>
                                <div class="ms-Facepile-members">
                                  <div  ng-repeat="member in members track by $index"
                                        role="button"
                                        ng-if ="$index < uifOverflowLimit"
                                        class="ms-Facepile-itemBtn ms-Facepile-itemBtn--member"
                                        title="{{member.primaryText}}" tabindex="0">
                                    <uif-persona uif-style="round" uif-size="xsmall" uif-image-url="{{member.icon}}">
                                      <uif-persona-initials uif-color="{{member.color}}">{{member.initials}}</uif-persona-initials>
                                    </uif-persona>
                                  </div>
                                  <button
                                    ng-show="uifOverflowLimit > 0 && members.length > uifOverflowLimit"
                                    ng-click="overflowPanelIsOpen = true;"
                                    class="ms-Facepile-itemBtn ms-Facepile-itemBtn--overflow js-overflowPanel is-active">
                                    <span class="ms-Facepile-overflowText">+{{members.length - uifOverflowLimit}}</span
                                  </button>
                                </div>
                                <uif-panel
                                  uif-type="medium"
                                  uif-is-open="overflowPanelIsOpen"
                                  uif-show-overlay="true"
                                  uif-show-close="true">
                                  <uif-panel-header>{{members.length}} {{uifFacepileName}}</uif-panel-header>
                                  <uif-content>
                                    <div ng-repeat="member in members track by $index" title="{{member.primaryText}}" tabindex="0">
                                      <uif-persona uif-style="round" uif-size="medium" uif-image-url="{{member.icon}}">
                                        <uif-persona-initials uif-color="{{member.color}}">{{member.initials}}</uif-persona-initials>
                                        <uif-persona-primary-text>{{member.primaryText}}</uif-persona-primary-text>
                                        <uif-persona-secondary-text>{{member.secondaryText}}</uif-persona-secondary-text>
                                      </uif-persona>
                                    </div>
                                  </uif-content>
                                </uif-panel>
                              </div>`;
  public scope: {} = {
    members: '=ngModel',
    uifFacepileName: '@uifFacepileName',
    uifOverflowLimit: '@'
  };

  public static factory(): ng.IDirectiveFactory {
    const directive: ng.IDirectiveFactory = () => new FacepileDirective();
    return directive;
  }

}


/**
 * @ngdoc interface
 * @name IFacepileAddIconScope
 * @module officeuifabric.components.facepile
 *
 * @description
 * This is the scope used by the `<uif-facepile-add-icon>` directive.
 * It allows for the addition and removal of members
 *
 * @property {string} peoplepickerPanelIsOpen    -  Indicates whether the peoplepicker panle is open
 * @property {function} onFacePileSearch         -  The function called to retrieve members from search
 * @property {IFacepileScope} parentScope        -  The parent scope, used to retrieve members
 */
export interface IFacepileAddIconScope extends ng.IScope {
  peoplepickerPanelIsOpen: boolean;
  onFacePileSearch: (query: string) => any[];
  parentScope: IFacepileScope;
}

/**
 * @ngdoc directive
 * @name uifFacecpile
 * @module officeuifabric.components.facepile
 *
 * @restrict E
 *
 * @description
 * `<uif-facepile-add-icon>` allows for the addition and removal of members
 *
 * @see {link http://dev.office.com/fabric/components/facepile}
 *
 * @usage
 *
 * <uif-facepile-add-icon uif-people="onFacePileSearch" placeholder="Add Members..."></uif-facepile-add-icon>
 */
export class FacepileAddIconDirective implements ng.IDirective {

  public transclude: boolean = true;
  public restrict: string = 'E';

  public template: string = `<button
                                class="ms-Facepile-itemBtn ms-Facepile-itemBtn--addPerson js-addPerson"
                                ng-click="peoplepickerPanelIsOpen = true;">
                                  <i class="ms-Facepile-addPersonIcon ms-Icon ms-Icon--personAdd"></i>
                             </button>
                             <uif-panel
                                uif-type="large"
                                uif-is-open="peoplepickerPanelIsOpen"
                                uif-show-overlay="true"
                                uif-show-close="true">
                              <uif-panel-header>{{peoplePickerPlaceholder}}</uif-panel-header>
                              <uif-content>
                               <uif-people-picker
                                uif-people="onFacePileSearch"
                                ng-model="parentScope.members"
                                uif-search-delay="500"
                                uif-type="facePile">
                                 <uif-selected-people-header>
                                  {{selectedFacePilePeople.length}} selected person(s)
                                 </uif-selected-people-header>
                                 <uif-people-search-more>
                                   <uif-primary-text uif-search-for-text="You are searching for: ">
                                    Search organization people
                                  </uif-primary-text>
                                 </uif-people-search-more>
                               </uif-people-picker>
                              </uif-content>
                             </uif-panel>`;
  public scope: {} = {
    onFacePileSearch: '=uifPeople',
    peoplePickerPlaceholder: '@placeholder'
  };

  public static factory(): ng.IDirectiveFactory {
    const directive: ng.IDirectiveFactory = () => new FacepileAddIconDirective();
    return directive;
  }

  public link(scope: IFacepileAddIconScope, elem: ng.IAugmentedJQuery, attrs: ng.IAttributes): void {
  {
    scope.parentScope = <IFacepileScope>scope.$parent.$parent;
  }};

}


/**
 * @ngdoc module
 * @name officeuifabric.components.facepile
 *
 * @description
 * Facepile
 *
 */
export var module: ng.IModule = ng.module('officeuifabric.components.facepile', [
  'officeuifabric.components'
])
.directive('uifFacepile', FacepileDirective.factory())
.directive('uifFacepileAddIcon', FacepileAddIconDirective.factory());
