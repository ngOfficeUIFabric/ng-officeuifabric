import * as angular from 'angular';

describe('tableDirective: <uif-table />', () => {
  let element: JQuery;
  let scope: any;

  beforeEach(() => {
    angular.mock.module('officeuifabric.core');
    angular.mock.module('officeuifabric.components.table');
  });

  beforeEach(inject(($rootScope: angular.IRootScopeService, $compile: Function) => {
    scope = $rootScope;
  }));

  it('should render table using a table tag', inject(($compile: Function, $rootScope: angular.IRootScopeService) => {
    element = angular.element('<uif-table></uif-table>');
    $compile(element)(scope);
    scope.$digest();
    expect(element.prop('tagName')).toEqual('TABLE');
  }));

  it('should set correct Office UI Fabric classes on the table', inject(($compile: Function, $rootScope: angular.IRootScopeService) => {
    element = angular.element('<uif-table></uif-table>');
    $compile(element)(scope);
    scope.$digest();
    expect(element).toHaveClass('ms-Table');
  }));

  it(
    'should set correct Office UI Fabric fixed class on the table for the \'uif-table-type\' attribute',
    inject(($compile: Function, $rootScope: angular.IRootScopeService) => {
      element = angular.element('<uif-table uif-table-type="fixed"></uif-table>');
      $compile(element)(scope);
      scope.$digest();
      expect(element).toHaveClass('ms-Table--fixed');
    }));

  it(
    'should set correct Office UI Fabric fluid class on the table for the \'uif-table-type\' attribute',
    inject(($compile: Function, $rootScope: angular.IRootScopeService) => {
      element = angular.element('<uif-table uif-table-type="fluid"></uif-table>');
      $compile(element)(scope);
      scope.$digest();
      expect(element).not.toHaveClass('ms-Table--fixed');
    }));

  it(
    'should throw an error on an invalid value for the \'uif-table-type\' attribute',
    inject(($compile: Function, $rootScope: angular.IRootScopeService, $log: angular.ILogService) => {
      element = angular.element('<uif-table uif-table-type="invalid"></uif-table>');
      $compile(element)(scope);
      scope.$digest();

      expect($log.error.logs.length).toEqual(1);
    }));

  it('should render the row using a tr tag', inject(($compile: Function, $rootScope: angular.IRootScopeService) => {
    element = angular.element('<uif-table><uif-table-row></uif-table-row></uif-table>');
    $compile(element)(scope);
    scope.$digest();
    expect(element.children().eq(0).prop('tagName')).toEqual('TR');
  }));

  it('should set no Office UI Fabric classes on the row', inject(($compile: Function, $rootScope: angular.IRootScopeService) => {
    element = angular.element('<uif-table><uif-table-row></uif-table-row></uif-table>');
    $compile(element)(scope);
    scope.$digest();
    expect(element.children().eq(0)).not.toHaveClass('ms-Table-row');
  }));

  it(
    'should set correct Office UI Fabric classes on the selected and unselected rows',
    inject(($compile: Function, $rootScope: angular.IRootScopeService) => {
      element = angular.element('<uif-table><uif-table-row></uif-table-row>\
    <uif-table-row uif-selected="true"></uif-table-row><uif-table-row uif-selected="false"></uif-table-row></uif-table>');
      $compile(element)(scope);
      scope.$digest();

      let rows: JQuery = element.children();
      expect(rows.length).toEqual(3);
      expect(rows.eq(0)).not.toHaveClass('is-selected');
      expect(rows.eq(1)).toHaveClass('is-selected');
      expect(rows.eq(2)).not.toHaveClass('is-selected');
    }));

  it(
    'should throw an error on an invalid value for the \'uif-selected\' attribute',
    inject(($compile: Function, $rootScope: angular.IRootScopeService, $log: angular.ILogService) => {
      element = angular.element('<uif-table><uif-table-row uif-selected="invalid"></uif-table-row></uif-table>');
      $compile(element)(scope);
      scope.$digest();

      expect($log.error.logs.length).toEqual(1);
    }));

  it('should render table row select using the td tag', inject(($compile: Function, $rootScope: angular.IRootScopeService) => {
    element = angular.element('<uif-table><uif-table-row><uif-table-row-select></uif-table-row-select></uif-table-row></uif-table>');
    $compile(element)(scope);
    scope.$digest();
    expect(element.children().eq(0).children().eq(0).prop('tagName')).toEqual('TD');
  }));

  it('should render table row select using the th tag in thead', inject(($compile: Function, $rootScope: angular.IRootScopeService) => {
    element = angular.element('<uif-table>\
        <uif-table-head><uif-table-row><uif-table-row-select></uif-table-row-select></uif-table-row></uif-table-head>\
        <uif-table-body><uif-table-row><uif-table-row-select></uif-table-row-select></uif-table-row></uif-table-body>\
        </uif-table>');
    $compile(element)(scope);
    scope.$digest();
    expect(element.children().eq(0) // thead
      .children().eq(0) // tr
      .children().eq(0) // table-row-select
      .prop('tagName')).toEqual('TH');
  }));

  it('should render table row select using the td tag in tbody', inject(($compile: Function, $rootScope: angular.IRootScopeService) => {
    element = angular.element('<uif-table>\
        <uif-table-head><uif-table-row><uif-table-row-select></uif-table-row-select></uif-table-row></uif-table-head>\
        <uif-table-body><uif-table-row><uif-table-row-select></uif-table-row-select></uif-table-row></uif-table-body>\
        </uif-table>');
    $compile(element)(scope);
    scope.$digest();
    expect(element.children().eq(1) // tbody
      .children().eq(0) // tr
      .children().eq(0) // table-row-select
      .prop('tagName')).toEqual('TD');
  }));

  it(
    'should set correct Office UI Fabric classes on the table row select',
    inject(($compile: Function, $rootScope: angular.IRootScopeService) => {
      element = angular.element('<uif-table><uif-table-row><uif-table-row-select></uif-table-row-select></uif-table-row></uif-table>');
      $compile(element)(scope);
      scope.$digest();
      expect(element.children().eq(0).children().eq(0)).toHaveClass('ms-Table-rowCheck');
    }));

  it('should render the cell using a td tag', inject(($compile: Function, $rootScope: angular.IRootScopeService) => {
    element = angular.element('<uif-table-cell></uif-table-cell>');
    $compile(element)(scope);
    scope.$digest();
    expect(element.prop('tagName')).toEqual('TD');
  }));

  it('should set no Office UI Fabric classes on the table cell', inject(($compile: Function, $rootScope: angular.IRootScopeService) => {
    element = angular.element('<uif-table-cell></uif-table-cell>');
    $compile(element)(scope);
    scope.$digest();
    expect(element).not.toHaveClass('ms-Table-cell');
  }));

  it('should render the table header using a th tag', inject(($compile: Function, $rootScope: angular.IRootScopeService) => {
    element = angular.element('<uif-table><uif-table-row><uif-table-header></uif-table-header></uif-table-row></uif-table>');
    $compile(element)(scope);
    scope.$digest();
    expect(element.children().eq(0).children().eq(0).prop('tagName')).toEqual('TH');
  }));

  it('should set no Office UI Fabric classes on the table header', inject(($compile: Function, $rootScope: angular.IRootScopeService) => {
    element = angular.element('<uif-table><uif-table-row><uif-table-header></uif-table-header></uif-table-row></uif-table>');
    $compile(element)(scope);
    scope.$digest();
    expect(element.children().eq(0).children().eq(0)).not.toHaveClass('ms-Table-cell');
  }));

  it('should trigger sorting only on enabled header cells', inject(($compile: Function, $rootScope: angular.IRootScopeService) => {
    element = angular.element('<uif-table><uif-table-row><uif-table-header></uif-table-header>\
        <uif-table-header uif-order-by="fileName"></uif-table-header></uif-table-row></uif-table>');
    $compile(element)(scope);
    element = jQuery(element[0]);
    scope.$digest();

    let headerCells: JQuery = element.children().eq(0).children();

    headerCells.eq(0).click(); // sorting disabled for this column; do nothing
    expect(scope.orderBy).toBeNull();

    headerCells.eq(1).click(); // sort fileName:asc
    expect(scope.orderBy).toEqual('fileName');
  }));

  it(
    'should render the data in its originally declared order by default',
    inject(($compile: Function, $rootScope: angular.IRootScopeService) => {
      element = angular.element('<uif-table><uif-table-row><uif-table-header></uif-table-header>\
        <uif-table-header uif-order-by="fileName"></uif-table-header></uif-table-row></uif-table>');
      $compile(element)(scope);
      scope.$digest();

      expect(scope.orderBy).toBeNull();
      expect(scope.orderAsc).toBeTruthy();
    }));

  it('should correctly indicate column used for sorting', inject(($compile: Function, $rootScope: angular.IRootScopeService) => {
    element = angular.element('<uif-table><uif-table-row><uif-table-header></uif-table-header>\
        <uif-table-header uif-order-by="fileName"></uif-table-header></uif-table-row></uif-table>');
    $compile(element)(scope);
    element = jQuery(element[0]);
    scope.$digest();

    let fileNameHeader: JQuery = element.children().eq(0).children().eq(1);
    fileNameHeader.click();
    expect(fileNameHeader.children().length).toEqual(1, 'Sorting indicator not added to column');

    let sortingIndicatorWrapper: JQuery = fileNameHeader.children().eq(0);
    expect(sortingIndicatorWrapper.prop('tagName')).toEqual('SPAN');
    expect(sortingIndicatorWrapper).toHaveClass('uif-sort-order');

    let sortingIndicator: JQuery = sortingIndicatorWrapper.children().eq(0);
    expect(sortingIndicator.prop('tagName')).toEqual('I');
    expect(sortingIndicator).toHaveClass('ms-Icon');
    expect(sortingIndicator).toHaveClass('ms-Icon--caretDown');
  }));

  it('should correctly indicate reversed sorting order', inject(($compile: Function, $rootScope: angular.IRootScopeService) => {
    element = angular.element('<uif-table><uif-table-row><uif-table-header>ID</uif-table-header>\
        <uif-table-header uif-order-by="fileName">File name</uif-table-header></uif-table-row></uif-table>');
    $compile(element)(scope);
    element = jQuery(element[0]);
    scope.$digest();

    let fileNameHeader: JQuery = element.children().eq(0).children().eq(1);
    fileNameHeader.click();
    fileNameHeader.click();
    let sortingIndicatorWrapper: JQuery = fileNameHeader.children().eq(1);
    let sortingIndicator: JQuery = sortingIndicatorWrapper.children().eq(0);
    expect(sortingIndicator).toHaveClass('ms-Icon--caretUp');
  }));

  it(
    'should sort data ascending after selecting a column for sorting',
    inject(($compile: Function, $rootScope: angular.IRootScopeService) => {
      element = angular.element('<uif-table><uif-table-row><uif-table-header></uif-table-header>\
        <uif-table-header uif-order-by="fileName"></uif-table-header></uif-table-row></uif-table>');
      $compile(element)(scope);
      element = jQuery(element[0]);
      scope.$digest();

      let fileNameHeader: JQuery = element.children().eq(0).children().eq(1);
      fileNameHeader.click();
      expect(scope.orderAsc).toBeTruthy();
    }));

  it(
    'should reverse the sorting order when selecting the same column for sorting',
    inject(($compile: Function, $rootScope: angular.IRootScopeService) => {
      element = angular.element('<uif-table><uif-table-row><uif-table-header></uif-table-header>\
        <uif-table-header uif-order-by="fileName"></uif-table-header></uif-table-row></uif-table>');
      $compile(element)(scope);
      element = jQuery(element[0]);
      scope.$digest();

      let fileNameHeader: JQuery = element.children().eq(0).children().eq(1);
      fileNameHeader.click();
      expect(scope.orderAsc).toBeTruthy();
      fileNameHeader.click();
      expect(scope.orderAsc).toBeFalsy();
      fileNameHeader.click();
      expect(scope.orderAsc).toBeTruthy();
    }));

  it(
    'should clear the sorting indicator after selecting another column for sorting',
    inject(($compile: Function, $rootScope: angular.IRootScopeService) => {
      element = angular.element('<uif-table><uif-table-row><uif-table-header uif-order-by="id">ID</uif-table-header>\
        <uif-table-header uif-order-by="fileName">File name</uif-table-header></uif-table-row></uif-table>');
      $compile(element)(scope);
      element = jQuery(element[0]);
      scope.$digest();

      let idHeader: JQuery = element.children().eq(0).children().eq(0);
      let fileNameHeader: JQuery = element.children().eq(0).children().eq(1);
      idHeader.click(); // sort id:asc
      fileNameHeader.click(); // sort fileName:asc
      expect(idHeader.children().length).toEqual(1, 'Sorting indicator not removed from column previously used for sorting');
      expect(fileNameHeader.children().length).toEqual(2, 'Sorting indicator not added to the column used for sorting');
    }));

  it(
    'should change the sorting order to ascending after selecting another column for sorting',
    inject(($compile: Function, $rootScope: angular.IRootScopeService) => {
      element = angular.element('<uif-table><uif-table-row><uif-table-header uif-order-by="id"></uif-table-header>\
        <uif-table-header uif-order-by="fileName"></uif-table-header></uif-table-row></uif-table>');
      $compile(element)(scope);
      element = jQuery(element[0]);
      scope.$digest();

      let idHeader: JQuery = element.children().eq(0).children().eq(0);
      let fileNameHeader: JQuery = element.children().eq(0).children().eq(1);
      idHeader.click(); // sort id:asc
      idHeader.click(); // sort id:desc
      fileNameHeader.click(); // sort fileName:asc
      expect(scope.orderAsc).toBeTruthy();
    }));

  it(
    'should keep the sorting data intact after selecting another column for which sorting hasn\'t been enabled',
    inject(($compile: Function, $rootScope: angular.IRootScopeService) => {
      element = angular.element('<uif-table><uif-table-row><uif-table-header></uif-table-header>\
        <uif-table-header uif-order-by="fileName"></uif-table-header></uif-table-row></uif-table>');
      $compile(element)(scope);
      element = jQuery(element[0]);
      scope.$digest();

      let firstHeader: JQuery = element.children().eq(0).children().eq(0);
      let fileNameHeader: JQuery = element.children().eq(0).children().eq(1);
      fileNameHeader.click(); // sort fileName:asc
      firstHeader.click(); // sorting disabled; do nothing
      expect(scope.orderBy).toEqual('fileName');
      expect(scope.orderAsc).toBeTruthy();
    }));

  it('should not allow to select rows by default', inject(($compile: Function, $rootScope: angular.IRootScopeService) => {
    element = angular.element('<uif-table>' +
      '<uif-table-row></uif-table-row>' +
      '<uif-table-row ng-repeat="n in [1, 2, 3]" uif-item="n"></uif-table-row></uif-table>');
    $compile(element)(scope);
    scope.$digest();

    expect(scope.rowSelectMode).toEqual('none');
  }));

  it('should allow to explicitly disable row selecting', inject(($compile: Function, $rootScope: angular.IRootScopeService) => {
    element = angular.element('<uif-table uif-row-select-mode="none">' +
      '<uif-table-row></uif-table-row>' +
      '<uif-table-row ng-repeat="n in [1, 2, 3]" uif-item="n"></uif-table-row></uif-table>');
    $compile(element)(scope);
    scope.$digest();

    expect(scope.rowSelectMode).toEqual('none');
  }));

  it(
    'for row select mode \'single\' should allow to select single row',
    inject(($compile: Function, $rootScope: angular.IRootScopeService) => {
      scope.selectedItems = [];
      element = angular.element('<uif-table uif-row-select-mode="single" uif-selected-items="selectedItems">' +
        '<uif-table-row></uif-table-row>' +
        '<uif-table-row ng-repeat="n in [1, 2, 3]" uif-item="n"></uif-table-row></uif-table>');
      $compile(element)(scope);
      element = jQuery(element[0]);
      scope.$digest();

      expect(scope.rowSelectMode).toEqual('single');

      let firstDataRow: JQuery = element.children().eq(1);
      let secondDataRow: JQuery = element.children().eq(2);
      firstDataRow.click();
      secondDataRow.click();

      let numSelectedItems: number = 0;

      for (let i: number = 0; i < scope.rows.length; i++) {
        if (scope.rows[i].selected === true) {
          numSelectedItems++;
        }
      }

      expect(numSelectedItems).toEqual(1);
      expect(scope.selectedItems.length).toEqual(1);
    }));

  it(
    'for row mode select \'multiple\' should allow to select multiple rows',
    inject(($compile: Function, $rootScope: angular.IRootScopeService) => {
      scope.selectedItems = [];
      element = angular.element('<uif-table uif-row-select-mode="multiple" uif-selected-items="selectedItems">' +
        '<uif-table-row></uif-table-row>' +
        '<uif-table-row ng-repeat="n in [1, 2, 3]" uif-item="n"></uif-table-row></uif-table>');
      $compile(element)(scope);
      element = jQuery(element[0]);
      scope.$digest();

      expect(scope.rowSelectMode).toEqual('multiple');

      let firstDataRow: JQuery = element.children().eq(1);
      let secondDataRow: JQuery = element.children().eq(2);
      firstDataRow.click();
      secondDataRow.click();

      let numSelectedItems: number = 0;

      for (let i: number = 0; i < scope.rows.length; i++) {
        if (scope.rows[i].selected === true) {
          numSelectedItems++;
        }
      }

      expect(numSelectedItems).toEqual(2);
      expect(scope.selectedItems.length).toEqual(2);
    }));

  it(
    'should throw an error on an invalid row select mode',
    inject(($compile: Function, $rootScope: angular.IRootScopeService, $log: angular.ILogService) => {
      element = angular.element('<uif-table uif-row-select-mode="invalid">' +
        '<uif-table-row></uif-table-row>' +
        '<uif-table-row ng-repeat="n in [1, 2, 3]" uif-item="n"></uif-table-row></uif-table>');
      $compile(element)(scope);
      scope.$digest();

      expect($log.error.logs.length).toEqual(1);
    }));

  it('shouldn\'t allow selecting the header row', inject(($compile: Function, $rootScope: angular.IRootScopeService) => {
    scope.selectedItems = [];
    element = angular.element('<uif-table uif-row-select-mode="single" uif-selected-items="selectedItems">' +
      '<uif-table-row></uif-table-row>' +
      '<uif-table-row ng-repeat="n in [1, 2, 3]" uif-item="n"></uif-table-row></uif-table>');
    $compile(element)(scope);
    element = jQuery(element[0]);
    scope.$digest();

    let headerRow: JQuery = element.children().eq(0);
    headerRow.click();
    expect(headerRow).not.toHaveClass('is-selected');

    let numSelectedItems: number = 0;

    for (let i: number = 0; i < scope.rows.length; i++) {
      if (scope.rows[i].selected === true) {
        numSelectedItems++;
      }
    }

    expect(numSelectedItems).toEqual(0);
    expect(scope.selectedItems.length).toEqual(0);
  }));

  it(
    'for row select mode \'none\' should use default mouse cursor',
    inject(($compile: Function, $rootScope: angular.IRootScopeService) => {
      element = angular.element('<uif-table uif-row-select-mode="none">' +
        '<uif-table-row></uif-table-row>' +
        '<uif-table-row ng-repeat="n in [1, 2, 3]" uif-item="n"></uif-table-row></uif-table>');
      $compile(element)(scope);
      scope.$digest();

      let tableRow: JQuery = element.children().eq(1);
      expect(tableRow.css('cursor')).toEqual('default');
    }));

  it(
    'for row select mode \'none\' shouldn\'t select a row on mouse click',
    inject(($compile: Function, $rootScope: angular.IRootScopeService) => {
      scope.selectedItems = [];
      element = angular.element('<uif-table uif-row-select-mode="none" uif-selected-items="selectedItems">' +
        '<uif-table-row></uif-table-row>' +
        '<uif-table-row ng-repeat="n in [1, 2, 3]" uif-item="n"></uif-table-row></uif-table>');
      $compile(element)(scope);
      element = jQuery(element[0]);
      scope.$digest();

      let tableRow: JQuery = element.children().eq(1);
      tableRow.click();
      expect(tableRow).not.toHaveClass('is-selected');
      expect(scope.rows[1].selected).toBeFalsy();
      expect(scope.selectedItems.length).toEqual(0);
    }));

  it(
    'for row select mode \'none\' shouldn\'t select all rows when clicking the table row selector in the header',
    inject(($compile: Function, $rootScope: angular.IRootScopeService) => {
      scope.selectedItems = [];
      element = angular.element('<uif-table uif-row-select-mode="none" uif-selected-items="selectedItems">' +
        '<uif-table-row><uif-table-row-select></uif-table-row-select></uif-table-row>' +
        '<uif-table-row ng-repeat="n in [1, 2, 3]" uif-item="n"><uif-table-row-select></uif-table-row-select></uif-table-row></uif-table>');
      $compile(element)(scope);
      element = jQuery(element[0]);
      scope.$digest();

      let tableRowSelect: JQuery = element.children().eq(0).children().eq(0);
      tableRowSelect.click();

      let numSelectedItems: number = 0;

      for (let i: number = 0; i < scope.rows.length; i++) {
        if (scope.rows[i].selected === true) {
          numSelectedItems++;
        }
      }

      expect(numSelectedItems).toEqual(0);
      expect(scope.selectedItems.length).toEqual(0);
    }));

  it(
    'for row select mode \'single\' should use hand mouse cursor',
    inject(($compile: Function, $rootScope: angular.IRootScopeService) => {
      element = angular.element('<uif-table uif-row-select-mode="single">' +
        '<uif-table-row></uif-table-row>' +
        '<uif-table-row ng-repeat="n in [1, 2, 3]" uif-item="n"></uif-table-row></uif-table>');
      $compile(element)(scope);
      scope.$digest();

      let tableRow: JQuery = element.children().eq(1);
      // already set to hand by Office UI Fabric
      expect(tableRow.css('cursor')).toEqual('');
    }));

  it(
    'for row select mode \'single\' when clicking a row should select that row and deselect other selected row',
    inject(($compile: Function, $rootScope: angular.IRootScopeService) => {
      scope.selectedItems = [];
      element = angular.element('<uif-table uif-row-select-mode="single" uif-selected-items="selectedItems">' +
        '<uif-table-row></uif-table-row>' +
        '<uif-table-row ng-repeat="n in [1, 2, 3]" uif-item="n"></uif-table-row></uif-table>');
      $compile(element)(scope);
      element = jQuery(element[0]);
      scope.$digest();

      let firstDataRow: JQuery = element.children().eq(1);
      let secondDataRow: JQuery = element.children().eq(2);
      firstDataRow.click(); // select first row
      secondDataRow.click(); // select second row

      expect(firstDataRow).not.toHaveClass('is-selected');
      expect(secondDataRow).toHaveClass('is-selected');

      expect(scope.rows[0].selected).toBeFalsy();
      expect(scope.rows[1].selected).toBeTruthy();
      expect(scope.selectedItems.length).toEqual(1);
    }));

  it(
    'for row select mode \'single\' when clicking an already selected row should unselect that row',
    inject(($compile: Function, $rootScope: angular.IRootScopeService) => {
      scope.selectedItems = [];
      element = angular.element('<uif-table uif-row-select-mode="single" uif-selected-items="selectedItems">' +
        '<uif-table-row></uif-table-row>' +
        '<uif-table-row ng-repeat="n in [1, 2, 3]" uif-item="n"></uif-table-row></uif-table>');
      $compile(element)(scope);
      element = jQuery(element[0]);
      scope.$digest();

      let firstDataRow: JQuery = element.children().eq(1);
      firstDataRow.click(); // select first row
      firstDataRow.click(); // unselect first row

      expect(firstDataRow).not.toHaveClass('is-selected');
      expect(scope.rows[0].selected).toBeFalsy();
      expect(scope.selectedItems.length).toEqual(0);
    }));

  it(
    'for row select mode \'single\' when clicking the row selector in the header shouldn\'t do anything',
    inject(($compile: Function, $rootScope: angular.IRootScopeService) => {
      scope.selectedItems = [];
      element = angular.element('<uif-table uif-row-select-mode="single" uif-selected-items="selectedItems">' +
        '<uif-table-row><uif-table-row-select></uif-table-row-select></uif-table-row>' +
        '<uif-table-row ng-repeat="n in [1, 2, 3]" uif-item="n"><uif-table-row-select></uif-table-row-select></uif-table-row></uif-table>');
      $compile(element)(scope);
      element = jQuery(element[0]);
      scope.$digest();

      let tableRowSelectInHeader: JQuery = element.children().eq(0).children().eq(0);
      tableRowSelectInHeader.click();

      let numSelectedItems: number = 0;

      for (let i: number = 0; i < scope.rows.length; i++) {
        if (scope.rows[i].selected === true) {
          numSelectedItems++;
        }
      }

      expect(numSelectedItems).toEqual(0);
      expect(scope.selectedItems.length).toEqual(0);
    }));

  it(
    'for row select mode \'multiple\' should use hand mouse cursor',
    inject(($compile: Function, $rootScope: angular.IRootScopeService) => {
      element = angular.element('<uif-table uif-row-select-mode="multiple">' +
        '<uif-table-row></uif-table-row>' +
        '<uif-table-row ng-repeat="n in [1, 2, 3]" uif-item="n"></uif-table-row></uif-table>');
      $compile(element)(scope);
      scope.$digest();

      let tableRow: JQuery = element.children().eq(1);
      // already set to hand by Office UI Fabric
      expect(tableRow.css('cursor')).toEqual('');
    }));

  it(
    'for row select mode \'multiple\' clicking an unselected row should select that row',
    inject(($compile: Function, $rootScope: angular.IRootScopeService) => {
      scope.selectedItems = [];
      element = angular.element('<uif-table uif-row-select-mode="multiple" uif-selected-items="selectedItems">' +
        '<uif-table-row></uif-table-row>' +
        '<uif-table-row ng-repeat="n in [1, 2, 3]" uif-item="n"></uif-table-row></uif-table>');
      $compile(element)(scope);
      element = jQuery(element[0]);
      scope.$digest();

      let tableRow: JQuery = element.children().eq(1);
      tableRow.click();

      expect(tableRow).toHaveClass('is-selected');
      expect(scope.rows[0].selected).toBeTruthy();
      expect(scope.selectedItems.length).toEqual(1);
    }));

  it(
    'for row select mode \'multiple\' clicking an already selected row should unselect that row',
    inject(($compile: Function, $rootScope: angular.IRootScopeService) => {
      scope.selectedItems = [];
      element = angular.element('<uif-table uif-row-select-mode="multiple" uif-selected-items="selectedItems">' +
        '<uif-table-row></uif-table-row>' +
        '<uif-table-row ng-repeat="n in [1, 2, 3]" uif-item="n"></uif-table-row></uif-table>');
      $compile(element)(scope);
      element = jQuery(element[0]);
      scope.$digest();

      let tableRow: JQuery = element.children().eq(1);
      tableRow.click(); // select row
      tableRow.click(); // unselect row

      expect(tableRow).not.toHaveClass('is-selected');
      expect(scope.rows[0].selected).toBeFalsy();
      expect(scope.selectedItems.length).toEqual(0);
    }));

  it(
    'for row select mode \'multiple\' clicking the row selected in the header should select all rows if not all rows are selected',
    inject(($compile: Function, $rootScope: angular.IRootScopeService) => {
      scope.selectedItems = [];
      element = angular.element('<uif-table uif-row-select-mode="multiple" uif-selected-items="selectedItems">\
        <uif-table-head><uif-table-row><uif-table-row-select></uif-table-row-select></uif-table-row></uif-table-head>\
        <uif-table-body>\
        <uif-table-row ng-repeat="n in [1, 2, 3]" uif-item="n"><uif-table-row-select></uif-table-row-select></uif-table-row>\
        </uif-table-body></uif-table>');
      $compile(element)(scope);
      element = jQuery(element[0]);
      scope.$digest();

      let tableRowSelect: JQuery = element.children().eq(0).children().eq(0).children().eq(0);
      tableRowSelect.click();

      let numSelectedItems: number = 0;

      for (let i: number = 0; i < scope.rows.length; i++) {
        if (scope.rows[i].selected === true) {
          numSelectedItems++;
        }
      }

      expect(numSelectedItems).toEqual(3);
      expect(scope.selectedItems.length).toEqual(3);
    }));

  it(
    'for row select mode \'multiple\' clicking the row selected in the header should unselect all rows if all rows are selected',
    inject(($compile: Function, $rootScope: angular.IRootScopeService) => {
      scope.selectedItems = [];
      element = angular.element('<uif-table uif-row-select-mode="multiple" uif-selected-items="selectedItems">\
        <uif-table-head><uif-table-row><uif-table-row-select></uif-table-row-select></uif-table-row></uif-table-head>\
        <uif-table-body>\
        <uif-table-row ng-repeat="n in [1, 2, 3]" uif-item="n"><uif-table-row-select></uif-table-row-select></uif-table-row>\
        <uif-table-body></uif-table>');
      $compile(element)(scope);
      element = jQuery(element[0]);
      scope.$digest();

      // select all rows
      element.children().eq(1).children().eq(0).click();
      element.children().eq(1).children().eq(1).click();
      element.children().eq(1).children().eq(2).click();

      let tableRowSelect: JQuery = element.children().eq(0).children().eq(0).children().eq(0);
      tableRowSelect.click();

      let numSelectedItems: number = 0;

      for (let i: number = 0; i < scope.rows.length; i++) {
        if (scope.rows[i].selected === true) {
          numSelectedItems++;
        }
      }

      expect(numSelectedItems).toEqual(0);
      expect(scope.selectedItems.length).toEqual(0);
    }));
});
