import * as angular from 'angular';
import { TableRowSelectModeEnum } from './tableRowSelectModeEnum';
import { TableTypeEnum } from './tableTypeEnum';

/**
 * @ngdoc interface
 * @name ITableScope
 * @module officeuifabric.components.table
 *
 * @description
 * Scope used by the table controller.
 *
 * @property {string} orderBy   - Specifies the name of the property used to sort the table. Default null
 * @property {boolean} orderAsc - Specifies whether the data in the table should be sort ascending or descendiangular.
 *                                Default `true` (sorting ascending)
 * @property {string} rowSelectMode - Specifies the row selection mode used by the table
 * @property {ITableRowScope[]} - Contains the data rows (all except the header row) that belong to the table
 */
export interface ITableScope extends angular.IScope {
  orderBy?: string;
  orderAsc: boolean;
  rowSelectMode?: string;
  rows: ITableRowScope[];
  tableType: string;
  tableTypeClass: string;
  selectedItems: any;
}

class TableController {
  public static $inject: string[] = ['$scope', '$log'];

  constructor(public $scope: ITableScope, public $log: angular.ILogService) {
    this.$scope.orderBy = null;
    this.$scope.orderAsc = true;
    this.$scope.rows = [];

    if (!this.$scope.selectedItems) {
      this.$scope.selectedItems = [];
    }
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

  get rowSelectMode(): string {
    return this.$scope.rowSelectMode;
  }
  set rowSelectMode(rowSelectMode: string) {
    if (TableRowSelectModeEnum[rowSelectMode] === undefined) {
      this.$log.error('Error [ngOfficeUiFabric] officeuifabric.components.table. ' +
        '\'' + rowSelectMode + '\' is not a valid option for \'uif-row-select-mode\'. ' +
        'Valid options are none|single|multiple.');
    }

    this.$scope.rowSelectMode = rowSelectMode;
    this.$scope.$digest();
  }

  get rows(): ITableRowScope[] {
    return this.$scope.rows;
  }
  set rows(rows: ITableRowScope[]) {
    this.$scope.rows = rows;
  }

  get selectedItems(): any[] {
    return this.$scope.selectedItems;
  }
}

/**
 * @ngdoc interface
 * @name ITableAttributes
 * @module officeuifabric.components.table
 *
 * @description
 * Attributes used by the table directive.
 *
 * @property {string} uifRowSelectMode   - Specifies whether the table supports selecting rows.
 *                                         Possible values: none - selecting rows is not possible;
 *                                                          single - only one row can be selected;
 *                                                          multiple - multiple rows can be selected;
 * @property {string} uifTableType      - Specifies whether the table is rendered in fluid or fixed mode.
 *                                        Possible values: fixed    - the table is rendered in fixed style.
 *                                                                    Added with Fabric 2.4.
 *                                                         fluid    - the table style is fluid (Default)
 */
export interface ITableAttributes extends angular.IAttributes {
  uifRowSelectMode?: string;
  uifTableType?: string;
  uifSelectedItems?: any;
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
 * <uif-table uif-selected-items="selectedItems">
 *   <uif-table-head>
 *     <uif-table-row>
 *       <uif-table-row-select></uif-table-row-select>
 *       <uif-table-header>File name</uif-table-header>
 *       <uif-table-header>Location</uif-table-header>
 *       <uif-table-header>Modified</uif-table-header>
 *       <uif-table-header>Type</uif-table-header>
 *     </uif-table-row>
 *   </uif-table-head>
 *   <uif-table-body>
 *     <uif-table-row ng-repeat="f in files" uif-selected="{{f.isSelected}}">
 *       <uif-table-row-select></uif-table-row-select>
 *       <uif-table-cell>{{f.fileName}}</uif-table-cell>
 *       <uif-table-cell>{{f.location}}</uif-table-cell>
 *       <uif-table-cell>{{f.modified | date}}</uif-table-cell>
 *       <uif-table-cell>{{f.type}}</uif-table-cell>
 *     </uif-table-row>
 *   </uif-table-body>
 * </uif-table>
 */
export class TableDirective implements angular.IDirective {
  public restrict: string = 'E';
  public transclude: boolean = true;
  public replace: boolean = true;  // required for correct HTML rendering
  public template: string = '<table ng-class="[\'ms-Table\', tableTypeClass]" ng-transclude></table>';
  public controller: any = TableController;
  public controllerAs: string = 'table';

  public static factory(): angular.IDirectiveFactory {
    const directive: angular.IDirectiveFactory = () => new TableDirective();

    return directive;
  }

  public link(scope: ITableScope, instanceElement: angular.IAugmentedJQuery, attrs: ITableAttributes, controller: TableController): void {
    // add support for selected items but due to not able to use isolate scope a workaround is used
    if (attrs.uifSelectedItems !== undefined && attrs.uifSelectedItems !== null) {
      let selectedItems: any = null;
      let currentscope: angular.IScope = scope;

      // get selected items of parent scope the scope value should not be empty before use
      while (currentscope.$parent !== undefined || currentscope.$parent !== null) {
          selectedItems = currentscope.$parent.$eval(attrs.uifSelectedItems);

          if (selectedItems !== undefined && selectedItems !== null) {
            break;
          }

          currentscope = currentscope.$parent;
      }

      // just to make sure it doesn't fail when not used
      if (selectedItems === undefined || selectedItems === null) {
        selectedItems = [];
      }
      scope.selectedItems = selectedItems;
    }

    if (attrs.uifRowSelectMode !== undefined && attrs.uifRowSelectMode !== null) {
      if (TableRowSelectModeEnum[attrs.uifRowSelectMode] === undefined) {
        controller.$log.error('Error [ngOfficeUiFabric] officeuifabric.components.table. ' +
          '\'' + attrs.uifRowSelectMode + '\' is not a valid option for \'uif-row-select-mode\'. ' +
          'Valid options are none|single|multiple.');
      } else {
        scope.rowSelectMode = attrs.uifRowSelectMode;
      }
    }

    if (scope.rowSelectMode === undefined) {
      scope.rowSelectMode = TableRowSelectModeEnum[TableRowSelectModeEnum.none];
    }

    if (attrs.uifTableType !== undefined && attrs.uifTableType !== null) {
      if (TableTypeEnum[attrs.uifTableType] === undefined) {
        controller.$log.error('Error [ngOfficeUiFabric] officeuifabric.components.table. ' +
          '\'' + attrs.uifTableType + '\' is not a valid option for \'uif-table-type\'. ' +
          'Valid options are fixed|fluid.');
      } else {
        scope.tableType = attrs.uifTableType;
      }
    }
    if (scope.tableType === undefined) {
      scope.tableType = TableTypeEnum[TableTypeEnum.fluid];
    }
    if (scope.tableType === TableTypeEnum[TableTypeEnum.fixed]) {
      scope.tableTypeClass = 'ms-Table--fixed';
    }
  }
}

/**
 * @ngdoc interface
 * @name ITableRowScope
 * @module officeuifabric.components.table
 *
 * @description
 * Scope used by the table row controller.
 *
 * @property {any} item                   - Contains data item bound to the table row
 * @property {(ev: any) => void} rowClick - event handler for clicking the row
 * @property {boolean} selected           - Specifies whether the particular row is selected or not
 */
export interface ITableRowScope extends angular.IScope {
  item: any;
  rowClick: (ev: any) => void;
  selected: boolean;
}

class TableRowController {
  public static $inject: string[] = ['$scope', '$log'];

  constructor(public $scope: ITableRowScope, public $log: angular.ILogService) {
  }

  get item(): any {
    return this.$scope.item;
  }
  set item(item: any) {
    this.$scope.item = item;
    this.$scope.$digest();
  }

  get selected(): boolean {
    return this.$scope.selected;
  }
  set selected(selected: boolean) {
    this.$scope.selected = selected;
    this.$scope.$digest();
  }
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
 * @property {any} uifItem          - Data item bound to the row
 */
export interface ITableRowAttributes extends angular.IAttributes {
  uifSelected?: string;
  uifItem?: any;
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
export class TableRowDirective implements angular.IDirective {
  public restrict: string = 'E';
  public transclude: boolean = true;
  public replace: boolean = true;  // required for correct HTML rendering
  public template: string = '<tr ng-transclude></tr>';
  public require: string = '^uifTable';
  public scope: {} = {
    item: '=uifItem'
  };
  public controller: any = TableRowController;

  public static factory(): angular.IDirectiveFactory {
    const directive: angular.IDirectiveFactory = () => new TableRowDirective();

    return directive;
  }

  public link(
    scope: ITableRowScope,
    instanceElement: angular.IAugmentedJQuery,
    attrs: ITableRowAttributes,
    table: TableController): void {
    if (attrs.uifSelected !== undefined &&
      attrs.uifSelected !== null) {
      let selectedString: string = attrs.uifSelected.toLowerCase();

      if (selectedString !== 'true' && selectedString !== 'false') {
        table.$log.error('Error [ngOfficeUiFabric] officeuifabric.components.table. ' +
          '\'' + attrs.uifSelected + '\' is not a valid boolean value. ' +
          'Valid options are true|false.');
      } else {
        if (selectedString === 'true') {
          scope.selected = true;
        }
      }
    }

    // don't treat header row as a table row
    if (scope.item !== undefined) {
      table.rows.push(scope);
    }

    scope.rowClick = (ev: any): void => {
      scope.selected = !scope.selected;
      scope.$apply();
    };

    scope.$watch('selected', (newValue: boolean, oldValue: boolean, tableRowScope: ITableRowScope): void => {
      if (newValue === true) {
        if (table.rowSelectMode === TableRowSelectModeEnum[TableRowSelectModeEnum.single]) {
          // unselect other items
          if (table.rows) {
            for (let i: number = 0; i < table.rows.length; i++) {
              if (table.rows[i] !== tableRowScope) {
                table.rows[i].selected = false;

              }
            }
            table.selectedItems.splice(0, table.selectedItems.length - 1);
            table.selectedItems.push(tableRowScope.item);
          }
        }

        // only add to the list if not yet exists. prevents conflicts
        // with preselected items
        let itemAlreadySelected: boolean = false;
        for (let i: number = 0; i < table.selectedItems.length; i++) {
          if (table.selectedItems[i] === tableRowScope.item) {
            itemAlreadySelected = true;
            break;
          }
        }
        if (!itemAlreadySelected) {
          table.selectedItems.push(tableRowScope.item);
        }

        instanceElement.addClass('is-selected');
      } else {

        for (let i: number = 0; i < table.selectedItems.length; i++) {
          if (table.selectedItems[i] === tableRowScope.item) {
            table.selectedItems.splice(i, 1);
            break;
          }
        }

        instanceElement.removeClass('is-selected');
      }


    });

    if (table.rowSelectMode !== TableRowSelectModeEnum[TableRowSelectModeEnum.none] &&
      scope.item !== undefined) {
      instanceElement.on('click', scope.rowClick);
    }

    if (table.rowSelectMode === TableRowSelectModeEnum[TableRowSelectModeEnum.none]) {
      instanceElement.css('cursor', 'default');
    }
  }
}

/**
 * @ngdoc interface
 * @name ITableRowSelectScope
 * @module officeuifabric.components.table
 *
 * @description
 * Scope used by the table row select directive.
 *
 * @property {(ev: any) => void} rowSelectClick - event handler for clicking the row selector
 */
export interface ITableRowSelectScope extends angular.IScope {
  rowSelectClick: (ev: any) => void;
  tagName: string;
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
export class TableRowSelectDirective implements angular.IDirective {
  public restrict: string = 'E';
  public template: string = '<td class="ms-Table-rowCheck"></td>';
  public replace: boolean = true;  // required for correct HTML rendering
  public require: string[] = ['^uifTable', '?^uifTableHead', '^uifTableRow'];

  public static factory(): angular.IDirectiveFactory {
    const directive: angular.IDirectiveFactory = () => new TableRowSelectDirective();

    return directive;
  }

  public link(
    scope: ITableRowSelectScope,
    instanceElement: angular.IAugmentedJQuery,
    attrs: angular.IAttributes,
    controllers: any[]): void {
    let thead: TableHeadController = controllers[1];
    if (thead) {
      let newElem: angular.IAugmentedJQuery = angular.element('<th class="ms-Table-rowCheck"></th>');
      instanceElement.replaceWith(newElem);
      instanceElement = newElem;
    }

    scope.rowSelectClick = (ev: any): void => {
      let table: TableController = controllers[0];
      let row: TableRowController = controllers[2];

      if (table.rowSelectMode !== TableRowSelectModeEnum[TableRowSelectModeEnum.multiple]) {
        return;
      }

      // clicking on regular rows which have data items bound to them is already
      // handled by row click event
      if (row.item === undefined || row.item === null) {
        // if set to true all rows will be selected. if set to false all rows will be unselected
        let shouldSelectAll: boolean = false;

        for (let i: number = 0; i < table.rows.length; i++) {
          if (table.rows[i].selected !== true) {
            shouldSelectAll = true;
            break;
          }
        }

        for (let i: number = 0; i < table.rows.length; i++) {
          if (table.rows[i].selected !== shouldSelectAll) {
            table.rows[i].selected = shouldSelectAll;
          }
        }
        scope.$apply();
      }
    };

    instanceElement.on('click', scope.rowSelectClick);
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
export class TableCellDirective implements angular.IDirective {
  public restrict: string = 'E';
  public transclude: boolean = true;
  public template: string = '<td ng-transclude></td>';
  public replace: boolean = true;  // required for correct HTML rendering

  public static factory(): angular.IDirectiveFactory {
    const directive: angular.IDirectiveFactory = () => new TableCellDirective();

    return directive;
  }
}

/**
 * @ngdoc interface
 * @name ITableHeaderScope
 * @module officeuifabric.components.table
 *
 * @description
 * Scope used by the table header directive.
 *
 * @property {(ev: any) => void} headerClick - event handler for clicking the header cell
 */
export interface ITableHeaderScope extends angular.IScope {
  headerClick: (ev: any) => void;
}

/**
 * @ngdoc interface
 * @name ITableHeaderAttributes
 * @module officeuifabric.components.table
 *
 * @description
 * Attributes used by the table header directive.
 *
 * @property {string} uifOrderBy   - Specifies name of the property used to sort the table on
 */
export interface ITableHeaderAttributes extends angular.IAttributes {
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
export class TableHeaderDirective implements angular.IDirective {
  public restrict: string = 'E';
  public transclude: boolean = true;
  public replace: boolean = true; // required for correct HTML rendering
  public template: string = '<th ng-transclude></th>';
  public require: string = '^uifTable';

  public static factory(): angular.IDirectiveFactory {
    const directive: angular.IDirectiveFactory = () => new TableHeaderDirective();

    return directive;
  }

  public link(
    scope: ITableHeaderScope,
    instanceElement: angular.IAugmentedJQuery,
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

class TableHeadController {
}

/**
 * @ngdoc directive
 * @name uifTableHead
 * @module officeuifabric.components.table
 *
 * @restrict E
 *
 * @description
 * `<uif-table-head>` is a table head directive that denotes table head rows.
 *
 * @see {link http://dev.office.com/fabric/components/table}
 *
 * @usage
 *
 * <uif-table>
 *   <uif-table-head>
 *     <uif-table-row>...</uif-table-row>
 *   </uif-table-head>
 * </uif-table>
 */
export class TableHeadDirective implements angular.IDirective {
  public restrict: string = 'E';
  public transclude: boolean = true;
  public template: string = '<thead ng-transclude></thead>';
  public replace: boolean = true;  // required for correct HTML rendering
  public controller: any = TableHeadController;

  public static factory(): angular.IDirectiveFactory {
    const directive: angular.IDirectiveFactory = () => new TableHeadDirective();

    return directive;
  }
}

/**
 * @ngdoc directive
 * @name uifTableBody
 * @module officeuifabric.components.table
 *
 * @restrict E
 *
 * @description
 * `<uif-table-body>` is a table body directive that denotes table body rows.
 *
 * @see {link http://dev.office.com/fabric/components/table}
 *
 * @usage
 *
 * <uif-table>
 *   <uif-table-body>
 *     <uif-table-row>...</uif-table-row>
 *   </uif-table-body>
 * </uif-table>
 */
export class TableBodyDirective implements angular.IDirective {
  public restrict: string = 'E';
  public transclude: boolean = true;
  public template: string = '<tbody ng-transclude></tbody>';
  public replace: boolean = true;  // required for correct HTML rendering

  public static factory(): angular.IDirectiveFactory {
    const directive: angular.IDirectiveFactory = () => new TableBodyDirective();

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
export let module: angular.IModule = angular.module('officeuifabric.components.table', ['officeuifabric.components'])
  .directive('uifTable', TableDirective.factory())
  .directive('uifTableRow', TableRowDirective.factory())
  .directive('uifTableRowSelect', TableRowSelectDirective.factory())
  .directive('uifTableCell', TableCellDirective.factory())
  .directive('uifTableHeader', TableHeaderDirective.factory())
  .directive('uifTableHead', TableHeadDirective.factory())
  .directive('uifTableBody', TableBodyDirective.factory());
