'use strict';

import * as ng from 'angular';

/**
 * @ngdoc directive
 * @name uifTable
 * @module officeuifabric.components.table
 * 
 * @restrict E
 * 
 * @description 
 * `<uif-table>` is a table directive.
 * 
 * @see {link http://dev.office.com/fabric/components/table}
 * 
 * @usage
 * 
 * <uif-table>
 *   <uif-table-row>
 *     <uif-table-row-select></uif-table-row-select>
 *     <uif-table-header>File name</uif-table-header>
 *     <uif-table-header>Location</uif-table-header>
 *     <uif-table-header>Modified</uif-table-header>
 *     <uif-table-header>Type</uif-table-header>
 *   </uif-table-row>
 *   <uif-table-row ng-repeat="f in files" uif-selected="{{f.isSelected}}">
 *     <uif-table-row-select></uif-table-row-select>
 *     <uif-table-cell>{{f.fileName}}</uif-table-cell>
 *     <uif-table-cell>{{f.location}}</uif-table-cell>
 *     <uif-table-cell>{{f.modified | date}}</uif-table-cell>
 *     <uif-table-cell>{{f.type}}</uif-table-cell>
 *   </uif-table-row>
 * </uif-table>
 */
export class TableDirective implements ng.IDirective {
    public restrict: string = 'E';
    public transclude: boolean = true;
    public replace: boolean = true;  // required for correct HTML rendering
    public template: string = '<div class="ms-Table" ng-transclude></div>';

    public static factory(): ng.IDirectiveFactory {
        const directive: ng.IDirectiveFactory = () => new TableDirective();

        return directive;
    }
}

/**
 * @ngdoc interface
 * @name ITableRowScope
 * @module officeuifabric.components.table
 * 
 * @description 
 * Scope used by the table row directive. 
 * 
 * @property {boolean} selected   - Specifies whether the particular row is selected or not
 */
export interface ITableRowScope extends ng.IScope {
    selected: boolean;
}

/**
 * @ngdoc interface
 * @name ITableRowAttributes
 * @module officeuifabric.components.table
 * 
 * @description 
 * Attributes used by the table row directive. 
 * 
 * @property {string} uifSelected   - Specifies whether the particular row is selected or not
 */
export interface ITableRowAttributes extends ng.IAttributes {
    uifSelected?: string;
}

/**
 * @ngdoc directive
 * @name uifTableRow
 * @module officeuifabric.components.table
 * 
 * @restrict E
 * 
 * @description 
 * `<uif-table-row>` is a table row directive.
 * 
 * @see {link http://dev.office.com/fabric/components/table}
 * 
 * @usage
 * 
 * <uif-table-row ng-repeat="f in files" uif-selected="{{f.isSelected}}">
 *   <uif-table-row-select></uif-table-row-select>
 *   <uif-table-cell>{{f.fileName}}</uif-table-cell>
 *   <uif-table-cell>{{f.location}}</uif-table-cell>
 *   <uif-table-cell>{{f.modified | date}}</uif-table-cell>
 *   <uif-table-cell>{{f.type}}</uif-table-cell>
 * </uif-table-row>
 */
export class TableRowDirective implements ng.IDirective {
    public restrict: string = 'E';
    public transclude: boolean = true;
    public replace: boolean = true;  // required for correct HTML rendering    
    public template: string = '<div class="ms-Table-row" ng-transclude></div>';

    public static factory(): ng.IDirectiveFactory {
        const directive: ng.IDirectiveFactory = () => new TableRowDirective();

        return directive;
    }

    public link(scope: ITableRowScope, instanceElement: ng.IAugmentedJQuery, attrs: ITableRowAttributes): void {
        if (attrs.uifSelected === 'true') {
            instanceElement.addClass('is-selected');
        }
    }
}

/**
 * @ngdoc directive
 * @name uifTableRowSelect
 * @module officeuifabric.components.table
 * 
 * @restrict E
 * 
 * @description 
 * `<uif-table-row-select>` is a directive for the control used to select table rows.
 * 
 * @see {link http://dev.office.com/fabric/components/table}
 * 
 * @usage
 * 
 * <uif-table-row ng-repeat="f in files" uif-selected="{{f.isSelected}}">
 *   <uif-table-row-select></uif-table-row-select>
 *   <uif-table-cell>{{f.fileName}}</uif-table-cell>
 *   <uif-table-cell>{{f.location}}</uif-table-cell>
 *   <uif-table-cell>{{f.modified | date}}</uif-table-cell>
 *   <uif-table-cell>{{f.type}}</uif-table-cell>
 * </uif-table-row>
 */
export class TableRowSelectDirective implements ng.IDirective {
    public restrict: string = 'E';
    public template: string = '<span class="ms-Table-rowCheck"></span>';
    public replace: boolean = true;  // required for correct HTML rendering

    public static factory(): ng.IDirectiveFactory {
        const directive: ng.IDirectiveFactory = () => new TableRowSelectDirective();

        return directive;
    }
}

/**
 * @ngdoc directive
 * @name uifTableCell
 * @module officeuifabric.components.table
 * 
 * @restrict E
 * 
 * @description 
 * `<uif-table-cell>` is a table cell directive.
 * 
 * @see {link http://dev.office.com/fabric/components/table}
 * 
 * @usage
 * 
 * <uif-table-cell>{{f.fileName}}</uif-table-cell>
 */
export class TableCellDirective implements ng.IDirective {
    public restrict: string = 'E';
    public transclude: boolean = true;
    public template: string = '<span class="ms-Table-cell" ng-transclude></span>';
    public replace: boolean = true;  // required for correct HTML rendering    

    public static factory(): ng.IDirectiveFactory {
        const directive: ng.IDirectiveFactory = () => new TableCellDirective();

        return directive;
    }
}

/**
 * @ngdoc directive
 * @name uifTableHeader
 * @module officeuifabric.components.table
 * 
 * @restrict E
 * 
 * @description 
 * `<uif-table-header>` is a table header cell directive.
 * 
 * @see {link http://dev.office.com/fabric/components/table}
 * 
 * @usage
 * 
 * <uif-table-header>File name</uif-table-header>
 */
export class TableHeaderDirective implements ng.IDirective {
    public restrict: string = 'E';
    public transclude: boolean = true;
    public replace: boolean = true; // required for correct HTML rendering
    public template: string = '<span class="ms-Table-cell" ng-transclude></span>';

    public static factory(): ng.IDirectiveFactory {
        const directive: ng.IDirectiveFactory = () => new TableHeaderDirective();

        return directive;
    }
}

/**
 * @ngdoc module
 * @name officeuifabric.components.table
 * 
 * @description 
 * Table
 */
export var module: ng.IModule = ng.module('officeuifabric.components.table', ['officeuifabric.components'])
    .directive('uifTable', TableDirective.factory())
    .directive('uifTableRow', TableRowDirective.factory())
    .directive('uifTableRowSelect', TableRowSelectDirective.factory())
    .directive('uifTableCell', TableCellDirective.factory())
    .directive('uifTableHeader', TableHeaderDirective.factory());
