'use strict';

import * as ng from 'angular';
import {OrgChartPresenceEnum} from './orgChartPresenceEnum';
import {OrgChartStyleEnum} from './orgChartStyleEnum';
import {OrgChartSelectModeEnum} from './orgChartSelectModeEnum';

export interface IOrgChartScope extends ng.IScope {
  selectMode?: OrgChartSelectModeEnum;
  items: IOrgChartPersonaScope[];
  selectedItems: any[];
}

class OrgChartController {

  public static $inject: string[] = ['$scope', '$log'];

  public selectMode: OrgChartSelectModeEnum;

  constructor(public $scope: IOrgChartScope, public $log: ng.ILogService) {
    this.$scope.selectMode = null;
    this.$scope.items = [];
  }

  get items(): IOrgChartPersonaScope[] {
    return this.$scope.items;
  }
  set items(items: IOrgChartPersonaScope[]) {
    this.$scope.items = items;
  }

  get selectedItems(): IOrgChartPersonaScope[] {
    return this.$scope.selectedItems;
  }
  set selectedItems(selectedItems: IOrgChartPersonaScope[]) {
    this.$scope.selectedItems = selectedItems;
  }

}

export interface IOrgChartAttributes extends ng.IAttributes {
  uifSelectMode?: string;
}

/**
 * @ngdoc directive
 * @name uifOrgChart
 * @module officeuifabric.components.orgchart
 *
 * @restrict E
 *
 * @description
 * `<uif-org-chart />` is the main directive of the module. Renders a list of persons
 * grouped by a property of your choice using the uifOrgChartGroupBy-filter. The directive
 * supports a single- and multiple-selectionmode allowing to select and unselect by
 * clicking each person. The selected items can be retrieved by supplying an array in
 * the 'uif-selected-items'-attribute.
 *
 * See <uif-org-chart-persona /> directive to see valid presence values.
 *
 * @see {link http://dev.office.com/fabric/components/orgchart}
 *
 * @usage
 *
 * <uif-org-chart uif-select-mode="single|multiple"
 *                uif-selected-items="selectedItems">
 *     <uif-org-chart-group ng-repeat="group in items | uifOrgChartGroupBy: 'department'">
 *         <uif-org-chart-group-title>{{group}}</uif-org-chart-group-title>
 *         <uif-org-chart-list>
 *             <uif-org-chart-persona uif-style="standarx(default)square"
 *                                    ng-repeat="item in vm.items | filter: {'department': group}"
 *                                    uif-item="item"
 *                                    uif-presence="item.presence"
 *                                    uif-selected="item.selected">
 *                 <uif-org-chart-image  ng-src="item.imageUrl"></uif-org-chart-image>
 *                 <uif-org-chart-presence></uif-org-chart-presence>
 *                 <uif-org-chart-details>
 *                     <uif-org-chart-primary-text>{{item.name}}</uif-org-chart-primary-text>
 *                     <uif-org-chart-secondary-text>{{item.title}}</uif-org-chart-secondary-text>
 *                 </uif-org-chart-details>
 *             </uif-org-chart-persona>
 *         </uif-org-chart-list>
 *     </uif-org-chart-group>
 * </uif-org-chart>
 *
 * About presence: valid presence values are
 *
 */
export class OrgChartDirective implements ng.IDirective {
  public restrict: string = 'E';
  public transclude: boolean = true;
  public replace: boolean = true;
  public template: string = '<div class="ms-OrgChart" ng-transclude ></div>';
  public controller: any = OrgChartController;
  public scope: {} = {
    selectedItems: '=?uifSelectedItems'
  };

  public static factory(): ng.IDirectiveFactory {
    const directive: ng.IDirectiveFactory = () => new OrgChartDirective();
    return directive;
  }

  public link(scope: IOrgChartScope, elem: ng.IAugmentedJQuery, attrs: IOrgChartAttributes, ctrl: OrgChartController): void {

    if (attrs.uifSelectMode) {
      switch (OrgChartSelectModeEnum[attrs.uifSelectMode]) {
        case OrgChartSelectModeEnum.single:
        case OrgChartSelectModeEnum.multiple:
          ctrl.selectMode = OrgChartSelectModeEnum[attrs.uifSelectMode];
          break;
        default:
          ctrl.$log.error('Error [ngOfficeUIFabric] officeuifabric.components.orgchart - Unsupported select-mode: ' +
            'The select-mode (\'' + attrs.uifSelectMode + '\) is not supperted. ' +
            'Supported options are: single, multiple');
          break;
      }
    }

  }

}

/**
 * @ngdoc directive
 * @name uifOrgChartGroup
 * @module officeuifabric.components.orgchart
 *
 * @restrict E
 *
 * @description
 * `<uif-org-chart-group />` is a directive used within <uif-org-chart/> directive
 * even
 *
 * @see {link http://dev.office.com/fabric/components/orgchart}
 *
 * @usage
 *
 * <uif-org-chart-group>
 *   <uif-org-chart-group-title>{{group.title}}</uif-org-chart-group-title>
 *   <uif-org-chart-list>
 *     <uif-org-chart-persona>...</uif-org-chart-persona>
 *     <uif-org-chart-persona>...</uif-org-chart-persona>
 *   </uif-org-chart-list>
 * </uif-org-chart-group >
 *
 */
export class OrgChartGroupDirective implements ng.IDirective {
  public restrict: string = 'E';
  public transclude: boolean = true;
  public replace: boolean = true;
  public template: string = '<div class="ms-OrgChart-group" ng-transclude ></div>';

  public static factory(): ng.IDirectiveFactory {
    const directive: ng.IDirectiveFactory = () => new OrgChartGroupDirective();
    return directive;
  }
}

/**
 * @ngdoc directive
 * @name uifOrgChartGroupTitle
 * @module officeuifabric.components.orgchart
 *
 * @restrict E
 *
 * @description
 * `<uif-org-chart-group-title />` is a directive used within <uif-org-chart-group/> directive
 *
 * @see {link http://dev.office.com/fabric/components/orgchart}
 *
 * @usage
 *
 * <uif-org-chart-group-title>{{group}}</uif-org-chart-group-title>
 *
 */
export class OrgChartGroupTitleDirective implements ng.IDirective {
  public restrict: string = 'E';
  public transclude: boolean = true;
  public replace: boolean = true;
  public template: string = '<div class="ms-OrgChart-groupTitle" ng-transclude ></div>';

  public static factory(): ng.IDirectiveFactory {
    const directive: ng.IDirectiveFactory = () => new OrgChartGroupTitleDirective();
    return directive;
  }
}

/**
 * @ngdoc directive
 * @name uifOrgChartList
 * @module officeuifabric.components.orgchart
 *
 * @restrict E
 *
 * @description
 * `<uif-org-chart-list />` is a directive used within <uif-org-chart-group/> directive
 *
 * @see {link http://dev.office.com/fabric/components/orgchart}
 *
 * @usage
 *
 * <uif-org-chart-list>
 *   <uif-org-chart-persona>...</uif-org-chart-persona>
 *   <uif-org-chart-persona>...</uif-org-chart-persona>
 * </uif-org-chart-list>
 *
 */
export class OrgChartListDirective implements ng.IDirective {
  public restrict: string = 'E';
  public transclude: boolean = true;
  public replace: boolean = true;
  public template: string = '<ul class="ms-OrgChart-list" ng-transclude ></ul>';

  public static factory(): ng.IDirectiveFactory {
    const directive: ng.IDirectiveFactory = () => new OrgChartListDirective();
    return directive;
  }
}

export interface IOrgChartPersonaScope extends ng.IScope {
  item: any;
  personaClick: (event: any) => void;
  selected: boolean;
  presence: string;
}

export interface IOrgChartPersonaAttributes extends ng.IAttributes {
  uifStyle: string;
  uifPresence: string;
}

/**
 * @ngdoc directive
 * @name uifOrgChartPersona
 * @module officeuifabric.components.orgchart
 *
 * @restrict E
 *
 * @description
 * `<uif-org-chart-persona />` is a directive used within `<uif-org-chart-list/>` directive
 *
 * @see {link http://dev.office.com/fabric/components/orgchart}
 *
 * @usage
 *
 * <uif-org-chart-persona uif-style="standard(default)|square"
 *                        uif-item="item"
 *                        uif-presence="item.presence"
 *                        uif-selected="item.selected">
 *   <uif-org-chart-image ng-src="item.imageUrl"></uif-org-chart-image>
 *   <uif-org-chart-presence></uif-org-chart-presence>
 *   <uif-org-chart-details>
 *     <uif-org-chart-primary-text>{{item.name}}</uif-org-chart-primary-text>
 *     <uif-org-chart-secondary-text>{{item.title}}}</uif-org-chart-secondary-text>
 *   </uif-org-chart-details>
 * </uif-org-chart-persona>
 *
 * uif-presence: Valid options are available|busy|away|blocked|dnd|offline
 * uif-selected: A boolean value. Allows to preselect the item
 *
 */
export class OrgChartPersonaDirective implements ng.IDirective {

  public restrict: string = 'E';
  public transclude: boolean = true;
  public replace: boolean = true;
  public template: string = '<li class="ms-OrgChart-listItem"><div class="ms-Persona" ng-transclude ></div></li>';

  public require: string = '^uifOrgChart';

  public scope: {} = {
    item: '=?uifItem',
    presence: '=?uifPresence',
    selected: '=?uifSelected'
  };

  public static factory(): ng.IDirectiveFactory {
    const directive: ng.IDirectiveFactory = ($log: ng.ILogService) => new OrgChartPersonaDirective($log);
    directive.$inject = ['$log'];
    return directive;
  }

  constructor(private $log: ng.ILogService) {
  }

  public compile(
    elem: ng.IAugmentedJQuery,
    attrs: IOrgChartPersonaAttributes,
    transclude: ng.ITranscludeFunction): ng.IDirectivePrePost {
    return {
      post: this.postLink
    };
  }

  private postLink(
    scope: IOrgChartPersonaScope,
    elem: ng.IAugmentedJQuery,
    attrs: IOrgChartPersonaAttributes,
    ctrl: OrgChartController,
    transclude: ng.ITranscludeFunction): void {

    // handle selection
    if (scope.selected === undefined) {
        scope.selected = false;
    }

    // handle status-attribute
    if (scope.presence) {
      switch (OrgChartPresenceEnum[scope.presence]) {
        case OrgChartPresenceEnum.available: elem.children().eq(0).addClass('ms-Persona--available'); break;
        case OrgChartPresenceEnum.busy: elem.children().eq(0).addClass('ms-Persona--busy'); break;
        case OrgChartPresenceEnum.away: elem.children().eq(0).addClass('ms-Persona--away'); break;
        case OrgChartPresenceEnum.blocked: elem.children().eq(0).addClass('ms-Persona--blocked'); break;
        case OrgChartPresenceEnum.dnd: elem.children().eq(0).addClass('ms-Persona--dnd'); break;
        case OrgChartPresenceEnum.offline: elem.children().eq(0).addClass('ms-Persona--offline'); break;
        default:
          ctrl.$log.error('Error [ngOfficeUIFabric] officeuifabric.components.orgchart - Unsupported presence: ' +
            'The presence (\'' + scope.presence + '\') is not supperted by the Office UI Fabric. ' +
            'Supported options are: available, busy, away, blocked, dnd, offline.');
          break;
      }
    }

    // handle style
    if (attrs.uifStyle) {
      switch (OrgChartStyleEnum[attrs.uifStyle]) {
        case OrgChartStyleEnum.square: elem.children().eq(0).addClass('ms-Persona--square'); break;
        case OrgChartStyleEnum.standard: break;
        default:
          ctrl.$log.error('Error [ngOfficeUIFabric] officeuifabric.components.orgchart - Unsupported style: ' +
            'The style (\'' + attrs.uifStyle + '\) is not supperted by the Office UI Fabric. ' +
            'Supported options are: standard(default), square');
          break;
      }
    }

    // handle selectmode (from OrgChart-controller)
    if (ctrl.selectMode !== undefined) {
      elem.children().eq(0).addClass('ms-Persona--selectable');
    }

    // set up watch to change class according to selection
    scope.$watch('selected', (newValue: boolean, oldValue: boolean): void => {

      if (ctrl.selectMode !== undefined) {
        if (newValue === true) {
          elem.children().eq(0).addClass('is-selected');
        } else {

          elem.children().eq(0).removeClass('is-selected');
        }
      }


    });

    // keep track of the scopes
    if (scope.item) {
      ctrl.items.push(scope);
    }

    // initial selection
    if (ctrl.selectMode === OrgChartSelectModeEnum.single || ctrl.selectMode === OrgChartSelectModeEnum.multiple) {


      if (scope.selected) {

        if (ctrl.selectMode === OrgChartSelectModeEnum.single) {

          if (ctrl.selectedItems) {
            ctrl.selectedItems = [];
          }

          for (let i: number = 0; i < ctrl.items.length; i++) {
            if (ctrl.items[i] !== scope) {
              ctrl.items[i].selected = false;
            }
          }
        }

        elem.children().eq(0).addClass('is-selected');
        if (ctrl.selectedItems) {
          ctrl.selectedItems.push(scope.item);
        }

      }

    }

    // handle click on persona LI
    scope.personaClick = (event: any): void => {

      // flip selected
      scope.selected = !scope.selected;

      // if selected
      if (scope.selected) {

        // single
        if (ctrl.selectMode === OrgChartSelectModeEnum.single) {

          if (ctrl.items) {
            for (let i: number = 0; i < ctrl.items.length; i++) {
              if (ctrl.items[i] !== scope) {
                ctrl.items[i].selected = false;
              }
            }

          }

          elem.children().eq(0).addClass('is-selected');
          ctrl.selectedItems = [];
          ctrl.selectedItems.push(scope.item);

        }

        // multiple
        if (ctrl.selectMode === OrgChartSelectModeEnum.multiple) {

          elem.children().eq(0).addClass('is-selected');
          if (ctrl.selectedItems) {
            ctrl.selectedItems.push(scope.item);
          }

        }

      } else {

        elem.children().eq(0).removeClass('is-selected');
        if (ctrl.selectedItems) {
          let index: number = ctrl.selectedItems.indexOf(scope.item);
          if (index > -1) {
            ctrl.selectedItems.splice(index, 1);
          }
        }

      }

      scope.$apply();

    };

    // create event for click on LI element if any selection mode
    if ((ctrl.selectMode === OrgChartSelectModeEnum.single || ctrl.selectMode === OrgChartSelectModeEnum.multiple) && scope.item) {
      elem.children().eq(0).on('click', scope.personaClick);
    }

  }

}

/**
 * @ngdoc directive
 * @name uifOrgChartImage
 * @module officeuifabric.components.orgchart
 *
 * @restrict E
 *
 * @description
 * `<uif-org-chart-image />` is a directive used within <uif-org-chart-persona/> directive
 *
 * @see {link http://dev.office.com/fabric/components/orgchart}
 *
 * @usage
 *
 * <uif-org-chart-image ng-src="item.imageUrl"></uif-org-chart-image>
 *
 */
export class OrgChartImageDirective implements ng.IDirective {

  public restrict: string = 'E';
  public replace: boolean = true;
  public template: string = `
    <div class="ms-Persona-imageArea">
      <i class="ms-Persona-placeholder ms-Icon ms-Icon--person"></i>
      <img class="ms-Persona-image" ng-src="{{ngSrc}}" />
    </div>
    `;

  public scope: {} = {
    ngSrc: '='
  };

  public static factory(): ng.IDirectiveFactory {
    const directive: ng.IDirectiveFactory = () => new OrgChartImageDirective();
    return directive;
  }

}

/**
 * @ngdoc directive
 * @name uifOrgChartPresence
 * @module officeuifabric.components.orgchart
 *
 * @restrict E
 *
 * @description
 * `<uif-org-chart-presence />` is a directive used within <uif-org-chart-persona/> directive
 *
 * @see {link http://dev.office.com/fabric/components/orgchart}
 *
 * @usage
 *
 * <uif-org-chart-presence></uif-org-chart-presence>
 *
 */
export class OrgChartPresenceDirective implements ng.IDirective {

  public restrict: string = 'E';
  public replace: boolean = true;
  public template: string = '<div class="ms-Persona-presence" ></div>';

  public static factory(): ng.IDirectiveFactory {
    const directive: ng.IDirectiveFactory = () => new OrgChartPresenceDirective();
    return directive;
  }

  public link(scope: any, elem: ng.IAugmentedJQuery, attrs: any, ctrl: any): void {

    if (!scope.$parent.presence) {
      elem.css('display', 'none');
    }

  }

}

/**
 * @ngdoc directive
 * @name uifOrgChartDetails
 * @module officeuifabric.components.orgchart
 *
 * @restrict E
 *
 * @description
 * `<uif-org-chart-details />` is a directive used within <uif-org-chart-persona/> directive
 *
 * @see {link http://dev.office.com/fabric/components/orgchart}
 *
 * @usage
 *
 * <uif-org-chart-details>
 *   <uif-org-chart-primary-text>Lorem Ipsum</uif-org-chart-primary-text>
 *   <uif-org-chart-secondary-text>Lorem Ipsum</uif-org-chart-secondary-text>
 * </uif-org-chart-details>
 *
 */
export class OrgChartDetailsDirective implements ng.IDirective {

  public restrict: string = 'E';
  public transclude: boolean = true;
  public replace: boolean = true;
  public template: string = '<div class="ms-Persona-details" ng-transclude ></div>';

  public static factory(): ng.IDirectiveFactory {
    const directive: ng.IDirectiveFactory = () => new OrgChartDetailsDirective();
    return directive;
  }

}

/**
 * @ngdoc directive
 * @name uifOrgChartPrimaryText
 * @module officeuifabric.components.orgchart
 *
 * @restrict E
 *
 * @description
 * `<uif-org-chart-primary-text />` is a directive used within <uif-org-chart-details/> directive
 *
 * @see {link http://dev.office.com/fabric/components/orgchart}
 *
 * @usage
 *
 * <uif-org-chart-primary-text>{{item.name}}</uif-org-chart-primary-text>
 *
 */
export class OrgChartPrimaryTextDirective implements ng.IDirective {

  public restrict: string = 'E';
  public transclude: boolean = true;
  public replace: boolean = true;
  public template: string = '<div class="ms-Persona-primaryText" ng-transclude ></div>';

  public static factory(): ng.IDirectiveFactory {
    const directive: ng.IDirectiveFactory = () => new OrgChartPrimaryTextDirective();
    return directive;
  }

}

/**
 * @ngdoc directive
 * @name uifOrgChartSecondaryText
 * @module officeuifabric.components.orgchart
 *
 * @restrict E
 *
 * @description
 * `<uif-org-chart-secondary-text />` is a directive used within <uif-org-chart-details/> directive
 *
 * @see {link http://dev.office.com/fabric/components/orgchart}
 *
 * @usage
 *
 * <uif-org-chart-secondary-text>item.title</uif-org-chart-secondary-text>
 *
 */
export class OrgChartSecondaryTextDirective implements ng.IDirective {

  public restrict: string = 'E';
  public transclude: boolean = true;
  public replace: boolean = true;
  public template: string = '<div class="ms-Persona-secondaryText" ng-transclude ></div>';

  public static factory(): ng.IDirectiveFactory {
    const directive: ng.IDirectiveFactory = () => new OrgChartSecondaryTextDirective();
    return directive;
  }

}

/**
 * @ngdoc filter
 * @name OrgChartGroupByFilter
 * @module officeuifabric.components.orgchart
 *
 * @description
 * Filter used by the the OrgChartDirective to group items
 *
 * @usage
 *
 *
 *
 *
 */
export class OrgChartGroupByFilter {

  public static factory(): any {

    return function(collection: any[], key: string): any[] {
      let result: any[] = [];
      if (!collection) {
        return;
      }

      for (let i: number = 0; i < collection.length; i++) {
        let value: string = collection[i][key];
        if (result.indexOf(value) === -1) {
          result.push(value);
        }
      }

      return result;

    };
  }
}

/**
 * @ngdoc module
 * @name officeuifabric.components.orgchart
 *
 * @description
 * OrgChart
 */
export let module: ng.IModule = ng.module('officeuifabric.components.orgchart', [
  'officeuifabric.components'
])
  .directive('uifOrgChart', OrgChartDirective.factory())
  .directive('uifOrgChartGroup', OrgChartGroupDirective.factory())
  .directive('uifOrgChartGroupTitle', OrgChartGroupTitleDirective.factory())
  .directive('uifOrgChartList', OrgChartListDirective.factory())
  .directive('uifOrgChartPersona', OrgChartPersonaDirective.factory())
  .directive('uifOrgChartImage', OrgChartImageDirective.factory())
  .directive('uifOrgChartPresence', OrgChartPresenceDirective.factory())
  .directive('uifOrgChartDetails', OrgChartDetailsDirective.factory())
  .directive('uifOrgChartPrimaryText', OrgChartPrimaryTextDirective.factory())
  .directive('uifOrgChartSecondaryText', OrgChartSecondaryTextDirective.factory())
  .filter('uifOrgChartGroupBy', OrgChartGroupByFilter.factory);
