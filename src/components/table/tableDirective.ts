'use strict';

import * as ng from 'angular';

/**
 * @ngdoc interface
 * @name ITableScope
 * @module officeuifabric.components.table
 * 
 * @description 
 * Scope used by the table controller. 
 * 
 * @property {string} orderBy   - Specifies the name of the property used to sort the table. Default null
 * @property {boolean} orderAsc - Specifies whether the data in the table should be sort ascending or descending.
 *                                Default `true` (sorting ascending) 
 */
export interface ITableScope extends ng.IScope {
    orderBy?: string;
    orderAsc: boolean;
}

class TableController {
    public static $inject: string[] = ['$scope'];

    constructor(public $scope: ITableScope) {
        this.$scope.orderBy = null;
        this.$scope.orderAsc = true;
    }

    get orderBy(): string {
        return this.$scope.orderBy;
    }
    set orderBy(property: string) {
        this.$scope.orderBy = property;
        this.$scope.$digest();
    }

    get orderAsc(): boolean {
        return this.$scope.orderAsc;
    }
    set orderAsc(orderAsc: boolean) {
        this.$scope.orderAsc = orderAsc;
        this.$scope.$digest();
    }
}

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
    public controller: any = TableController;
    public controllerAs: string = 'table';

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

export interface ITableHeaderScope extends ng.IScope {
    headerClick: (ev: any) => void;
}

export interface ITableHeaderAttributes extends ng.IAttributes {
    uifOrderBy: string;
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
    public require: string = '^uifTable';

    public static factory(): ng.IDirectiveFactory {
        const directive: ng.IDirectiveFactory = () => new TableHeaderDirective();

        return directive;
    }

    public link(scope: ITableHeaderScope,
                instanceElement: ng.IAugmentedJQuery,
                attrs: ITableHeaderAttributes,
                table: TableController): void {
        scope.headerClick = (ev: any): void => {
            if (table.orderBy === attrs.uifOrderBy) {
                table.orderAsc = !table.orderAsc;
            } else {
                table.orderBy = attrs.uifOrderBy;
                table.orderAsc = true;
            }
        };

        scope.$watch('table.orderBy', (newOrderBy: string, oldOrderBy: string, tableHeaderScope: ITableHeaderScope): void => {
            if (oldOrderBy !== newOrderBy &&
                newOrderBy === attrs.uifOrderBy) {
                let cells: JQuery = instanceElement.parent().children();
                for (let i: number = 0; i < cells.length; i++) {
                    if (cells.eq(i).children().length === 2) {
                        cells.eq(i).children().eq(1).remove();
                    }
                }

                instanceElement.append('<span class="uif-sort-order">&nbsp;\
                <i class="ms-Icon ms-Icon--caretDown" aria-hidden="true"></i></span>');
            }
        });

        scope.$watch('table.orderAsc', (newOrderAsc: boolean, oldOrderAsc: boolean, tableHeaderScope: ITableHeaderScope): void => {
           if (instanceElement.children().length === 2) {
               let oldCssClass: string = oldOrderAsc ? 'ms-Icon--caretDown' : 'ms-Icon--caretUp';
               let newCssClass: string = newOrderAsc ? 'ms-Icon--caretDown' : 'ms-Icon--caretUp';
               instanceElement.children().eq(1).children().eq(0).removeClass(oldCssClass).addClass(newCssClass);
           }
        });

        if ('uifOrderBy' in attrs) {
            instanceElement.on('click', scope.headerClick);
        }
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
