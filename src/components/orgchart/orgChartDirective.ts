'use strict';

import * as ng from 'angular';


/**
 * @ngdoc interface
 * @name IOrgChartScope
 * @module officeuifabric.components.orgchart
 * 
 * @description 
 * Scope used by the orgchart directive
 * 
 * @property {any[]} items              - Contains data to be rendered by the directive
 * @property {string} groupby 
 * @property {string} primarytext
 * @property {string} secondarytext
 * @property {string} image
 * @property {string} presence
 * @property {any[]} selectedItems
 * @property {string} style
 * @property {string} selectMode
 * @property {(groupby: string, group: string => void} getFilter
 * @property {(presence: string) => void} getPresence
 * @property {(style: string): void} getStyle
 * @property {(selectable: string): string} getSelectable
 * @property {(person: any) => void} selectClick
 * @property {} click
 */
export interface IOrgChartScope extends ng.IScope {
    click: (person: any) => void;
    items: any;
    getFilter: (groupby: string, group: string) => void;
    getPresence: (presence: string) => void;
    getSelectable: (selectable: string) => string;
    getStyle: (style: string) => void;
    groupby: string;
    primarytext: string;
    secondarytext: string;
    image: string;
    presence: string;
    selectedItems: any[];
    style: string;
    selectMode: string;
    selectclick: (person: any) => void;
}

class OrgChartController {
    public static $inject: string[] = ['$scope', '$log'];
    constructor(public $scope: IOrgChartScope, public $log: ng.ILogService) {
    }





}

/**
 * @ngdoc directive
 * @name uifOrgChart
 * @module officeuifabric.components.orgchart
 * 
 * @restrict E
 * 
 * @description
 * 
 * 
 * @see {link }
 * 
 * @usage
 * 
 * <uif-org-chart 
 *   uif-items="vm.items"
 *   uif-group="{{vm.groupfield}}"
 *   uif-primary-text="{{vm.namefield}}"
 *   uif-secondary-text="{{vm.titlefield}}"
 *   uif-image="{{vm.imagefield}}"
 *   uif-presence="{{vm.presencefield}}"
 *   uif-style="standerd|square"
 *   uif-select-mode="none|single|multiple"
 *   uif-selected-items="vm.selected"
 *   ></uif-org-chart>
 *  
 */
export class OrgChartDirective implements ng.IDirective {

    public restrict: string = 'E';
    public replace: boolean = true;
    public controller: any = OrgChartController;

    public template: string = '<div class="ms-OrgChart">'
        + '<div class="ms-OrgChart-group" ng-repeat="group in items | uifOrgChartGroupBy: groupby">'
        + '<div class="ms-OrgChart-groupTitle">'
        + '{{group}}'
        + '</div>'
        + '<ul class="ms-OrgChart-list">'
        + '<li class="ms-OrgChart-listItem" ng-repeat="person in items | filter: getFilter(groupby, group)" >'
        + '<uif-org-chart-persona ></uif-org-chart-persona>'
        + '</li>'
        + '</ul>'
        + '</div>'
        + '</div>';

    public scope: {} = {
        click: '&uifMethod',
        groupby: '@uifGroup',
        image: '@uifImage',
        items: '=uifItems',
        presence: '@uifPresence',
        primarytext: '@uifPrimaryText',
        secondarytext: '@uifSecondaryText',
        selectMode: '@uifSelectMode',
        selectedItems: '=uifSelectedItems',
        style: '@uifStyle'
    };

    public static factory(): ng.IDirectiveFactory {
        const directive: ng.IDirectiveFactory = () => new OrgChartDirective();
        return directive;
    }

    public link(scope: IOrgChartScope, elem: ng.IAugmentedJQuery, attrs: any, controller: OrgChartController): void {

        // validate selectmode;
        if (scope.selectMode) {
            if (OrgChartSelectModeEnum[scope.selectMode] === undefined) {
                controller.$log.error('Error [ngOfficeUiFabric] officeuifabric.components.orgchart. '
                    + '\'' + scope.selectMode + '\' is not a valid option for \'uif-select-mode\'. '
                    + 'Valid options are none|single|multiple.');
            }
        } else {
            scope.selectMode = OrgChartSelectModeEnum[OrgChartSelectModeEnum.none];
        }

        // validate stylemode
        if (scope.style) {
            if (OrgChartStyleModeEnum[scope.style] === undefined) {
                controller.$log.error('Error [ngOfficeUiFabric] officeuifabric.components.orgchart. '
                    + '\'' + scope.style + '\' is not a valid option for \'uif-style\'. '
                    + 'Valid options are standard|square.');
            }
        } else {
            scope.style = OrgChartStyleModeEnum[OrgChartStyleModeEnum.standard];
        }

        // filter items according to group
        scope.getFilter = (groupby: string, group: string) => {
            let filter: any = {};
            filter[groupby] = group;
            return filter;
        };

        // resolve class used for presence display
        scope.getPresence = (presence: string) => {
            switch (presence) {
                case 'available': return 'ms-Persona--available';
                case 'busy': return 'ms-Persona--busy';
                case 'away': return 'ms-Persona--away';
                default: return 'ms-Persona--blocked';
            }
        };

        // resolve image style used
        scope.getStyle = (style: string) => {
            switch (style) {
                case OrgChartStyleModeEnum[OrgChartStyleModeEnum.square]: return 'ms-Persona--square';
                default: return '';
            }
        };

        // resolve if items should be displayed as selectable
        scope.getSelectable = (selectMode: string) => {
            switch (selectMode) {
                case OrgChartSelectModeEnum[OrgChartSelectModeEnum.single]:
                    return 'ms-Persona--selectable';
                case OrgChartSelectModeEnum[OrgChartSelectModeEnum.multiple]:
                    return 'ms-Persona--selectable';
                default:
                    return '';
            }
        };
    }
}


/**
 * @ngdoc directive
 * @name uifOrgChartPersona
 * @module officeuifabric.components.orgchart
 *
 * @restrict E
 * 
 * @description
 * `<uif-org-chart-persona>` directive used internally by the OrgChartDirective 
 */
export class OrgChartPersonaDirective implements ng.IDirective {

    public restrict: string = 'E';
    public replace: boolean = true;
    public template: string =
        '<div ng-class="[\'ms-Persona\','
        + 'getPresence(person[presence]),'
        + 'getStyle(style),'
        + 'getSelectable(selectMode),'
        + 'getSelected(person)]" ng-click="selectclick(person)" >'
        + '<div class="ms-Persona-imageArea">'
        + '<i class="ms-Persona-placeholder ms-Icon ms-Icon--person"></i>'
        + '<img class="ms-Persona-image" ng-src="{{person[image]}}">'
        + '</div>'
        + '<div class="ms-Persona-presence" ng-if="presence" ></div>'
        + '<div class="ms-Persona-details">'
        + '<div class="ms-Persona-primaryText">{{person[primarytext]}}</div>'
        + '<div class="ms-Persona-secondaryText">{{person[secondarytext]}}</div>'
        + '</div>' // end details
        + '</div>'; // end persona

    public static factory(): ng.IDirectiveFactory {
        const directive: ng.IDirectiveFactory = () => new OrgChartPersonaDirective();
        return directive;
    }

    public link(scope: IOrgChartScope, elem: ng.IAugmentedJQuery): void {

        scope.selectclick = (person: any) => {

            // if click is assigned
            if (scope.click) {
                scope.click({person: person});
            }

            // handle select person
            if ((scope.selectMode === OrgChartSelectModeEnum[OrgChartSelectModeEnum.single]
                || scope.selectMode === OrgChartSelectModeEnum[OrgChartSelectModeEnum.multiple])
                && scope.selectedItems) {

                if (!elem.hasClass('is-selected')) {

                    if (scope.selectMode === OrgChartSelectModeEnum[OrgChartSelectModeEnum.single]) {
                        scope.selectedItems.splice(0, scope.selectedItems.length);
                        let selectedPersonItems: NodeListOf<Element> =
                            elem[0].parentElement.parentElement.parentElement.parentElement.querySelectorAll('.is-selected');
                        for (let i: number = 0; i < selectedPersonItems.length; i++) {
                            selectedPersonItems[i].classList.remove('is-selected');
                        }
                    }

                    elem.addClass('is-selected');
                    scope.selectedItems.push(person);

                } else {
                    elem.removeClass('is-selected');
                    let index: any = scope.selectedItems.indexOf(person);
                    if (index > -1) {
                        scope.selectedItems.splice(index, 1);
                    }
                }
            }

        };
    }
}

/**
 * @ngdoc filter
 * @name OrgChartGroupByFilter
 * @module officeuifabric.components.orgchart
 * 
 * @description
 * Filter used by the the OrgChartDirective
 */
export class OrgChartGroupByFilter  {

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
 * @ngdoc filter
 * @name OrgChartSelectModeEnum
 * @module officeuifabric.components.orgchart
 * 
 * @description
 * enum used by the OrcChartDirective
 */
export enum OrgChartSelectModeEnum {
    none,
    single,
    multiple
}

/**
 * @ngdoc enum
 * @name OrgChartStyleModeEnum
 * @module officeuifabric.components.orgchart
 *
 * @description
 * enum used by the OrcChartDirective
 */
export enum OrgChartStyleModeEnum {
    standard,
    square
}

/**
 * @ngdoc enum
 * @name OrgChartPresenceModeEnum
 * @module officeuifabric.components.orgchart
 *
 * @description
 * enum used by the OrcChartDirective
 */
export enum OrgChartPresenceModeEnum {
    none,
    available,
    busy,
    away,
    blocked
}


export var module: ng.IModule = ng.module('officeuifabric.components.orgchart', [
    'officeuifabric.components'
  ])
  .directive('uifOrgChart', OrgChartDirective.factory())
  .directive('uifOrgChartPersona', OrgChartPersonaDirective.factory())
  .filter('uifOrgChartGroupBy', OrgChartGroupByFilter.factory);
