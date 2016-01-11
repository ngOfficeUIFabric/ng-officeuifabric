'use strict';

import * as ng from 'angular';

describe('tableDirective: <uif-table />', () => {
    let element: ng.IAugmentedJQuery;
    let scope: any;

    beforeEach(() => {
        angular.mock.module('officeuifabric.core');
        angular.mock.module('officeuifabric.components.table');
    });

    beforeEach(inject(($rootScope: ng.IRootScopeService, $compile: Function) => {
        scope = $rootScope;
    }));

    it('should render table using a div tag', inject(($compile: Function, $rootScope: ng.IRootScopeService) => {
        element = ng.element('<uif-table></uif-table>');
        $compile(element)(scope);
        scope.$digest();
        expect(element.prop('tagName')).toEqual('DIV');
    }));

    it('should set correct Office UI Fabric classes on the table', inject(($compile: Function, $rootScope: ng.IRootScopeService) => {
        element = ng.element('<uif-table></uif-table>');
        $compile(element)(scope);
        scope.$digest();
        expect(element).toHaveClass('ms-Table');
    }));

    it('should render the row using a div tag', inject(($compile: Function, $rootScope: ng.IRootScopeService) => {
        element = ng.element('<uif-table-row></uif-table-row>');
        $compile(element)(scope);
        scope.$digest();
        expect(element.prop('tagName')).toEqual('DIV');
    }));

    it('should set correct Office UI Fabric classes on the row', inject(($compile: Function, $rootScope: ng.IRootScopeService) => {
        element = ng.element('<uif-table-row></uif-table-row>');
        $compile(element)(scope);
        scope.$digest();
        expect(element).toHaveClass('ms-Table-row');
    }));

    it('should set correct Office UI Fabric classes on the selected and unselected rows',
       inject(($compile: Function, $rootScope: ng.IRootScopeService) => {
        element = ng.element('<uif-table><uif-table-row></uif-table-row>\
    <uif-table-row uif-selected="true"></uif-table-row><uif-table-row uif-selected="false"></uif-table-row></uif-table>');
        $compile(element)(scope);
        scope.$digest();

        let rows: JQuery = element.children();
        expect(rows.length).toEqual(3);
        expect(rows.eq(0)).not.toHaveClass('is-selected');
        expect(rows.eq(1)).toHaveClass('is-selected');
        expect(rows.eq(2)).not.toHaveClass('is-selected');
    }));

    it('should render table row select using the span tag', inject(($compile: Function, $rootScope: ng.IRootScopeService) => {
        element = ng.element('<uif-table-row-select></uif-table-row-select>');
        $compile(element)(scope);
        scope.$digest();
        expect(element.prop('tagName')).toEqual('SPAN');
    }));

    it('should set correct Office UI Fabric classes on the table row select',
       inject(($compile: Function, $rootScope: ng.IRootScopeService) => {
        element = ng.element('<uif-table-row-select></uif-table-row-select>');
        $compile(element)(scope);
        scope.$digest();
        expect(element).toHaveClass('ms-Table-rowCheck');
    }));

    it('should render the cell using a span tag', inject(($compile: Function, $rootScope: ng.IRootScopeService) => {
        element = ng.element('<uif-table-cell></uif-table-cell>');
        $compile(element)(scope);
        scope.$digest();
        expect(element.prop('tagName')).toEqual('SPAN');
    }));

    it('should set correct Office UI Fabric classes on the table cell', inject(($compile: Function, $rootScope: ng.IRootScopeService) => {
        element = ng.element('<uif-table-cell></uif-table-cell>');
        $compile(element)(scope);
        scope.$digest();
        expect(element).toHaveClass('ms-Table-cell');
    }));

    it('should render the table header using a span tag', inject(($compile: Function, $rootScope: ng.IRootScopeService) => {
        element = ng.element('<uif-table><uif-table-row><uif-table-header></uif-table-header></uif-table-row></uif-table>');
        $compile(element)(scope);
        scope.$digest();
        expect(element.children().eq(0).children().eq(0).prop('tagName')).toEqual('SPAN');
    }));

    it('should set correct Office UI Fabric classes on the table header', inject(($compile: Function, $rootScope: ng.IRootScopeService) => {
        element = ng.element('<uif-table><uif-table-row><uif-table-header></uif-table-header></uif-table-row></uif-table>');
        $compile(element)(scope);
        scope.$digest();
        expect(element.children().eq(0).children().eq(0)).toHaveClass('ms-Table-cell');
    }));
    
    it('should trigger sorting only on enabled header cells', inject(($compile: Function, $rootScope: ng.IRootScopeService) => {
        element = ng.element('<uif-table><uif-table-row><uif-table-header></uif-table-header><uif-table-header uif-order-by="fileName"></uif-table-header></uif-table-row></uif-table>');
        $compile(element)(scope);
        scope.$digest();
        
        let headerCells: JQuery = element.children().eq(0).children();
        
        headerCells.eq(0).click(); // sorting disabled for this column; do nothing
        expect(scope.orderBy).toBeNull();
        
        headerCells.eq(1).click(); // sort fileName:asc
        expect(scope.orderBy).toEqual('fileName');
    }));
    
    it('should render the data in its originally declared order by default',
       inject(($compile: Function, $rootScope: ng.IRootScopeService) => {
        element = ng.element('<uif-table><uif-table-row><uif-table-header></uif-table-header><uif-table-header uif-order-by="fileName"></uif-table-header></uif-table-row></uif-table>');
        $compile(element)(scope);
        scope.$digest();
        
        expect(scope.orderBy).toBeNull();
        expect(scope.orderAsc).toBeTruthy();
    }));
    
    it('should correctly indicate column used for sorting', inject(($compile: Function, $rootScope: ng.IRootScopeService) => {
        element = ng.element('<uif-table><uif-table-row><uif-table-header></uif-table-header><uif-table-header uif-order-by="fileName"></uif-table-header></uif-table-row></uif-table>');
        $compile(element)(scope);
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
    
    it('should correctly indicate reversed sorting order', inject(($compile: Function, $rootScope: ng.IRootScopeService) => {
        element = ng.element('<uif-table><uif-table-row><uif-table-header>ID</uif-table-header><uif-table-header uif-order-by="fileName">File name</uif-table-header></uif-table-row></uif-table>');
        $compile(element)(scope);
        scope.$digest();
        
        let fileNameHeader: JQuery = element.children().eq(0).children().eq(1);
        fileNameHeader.click();
        fileNameHeader.click();
        let sortingIndicatorWrapper: JQuery = fileNameHeader.children().eq(1);
        let sortingIndicator: JQuery = sortingIndicatorWrapper.children().eq(0);
        expect(sortingIndicator).toHaveClass('ms-Icon--caretUp');
    }));
    
    it('should sort data ascending after selecting a column for sorting', inject(($compile: Function, $rootScope: ng.IRootScopeService) => {
        element = ng.element('<uif-table><uif-table-row><uif-table-header></uif-table-header><uif-table-header uif-order-by="fileName"></uif-table-header></uif-table-row></uif-table>');
        $compile(element)(scope);
        scope.$digest();
        
        let fileNameHeader: JQuery = element.children().eq(0).children().eq(1);
        fileNameHeader.click();
        expect(scope.orderAsc).toBeTruthy();
    }));
    
    it('should reverse the sorting order when selecting the same column for sorting', inject(($compile: Function, $rootScope: ng.IRootScopeService) => {
        element = ng.element('<uif-table><uif-table-row><uif-table-header></uif-table-header><uif-table-header uif-order-by="fileName"></uif-table-header></uif-table-row></uif-table>');
        $compile(element)(scope);
        scope.$digest();
        
        let fileNameHeader: JQuery = element.children().eq(0).children().eq(1);
        fileNameHeader.click();
        expect(scope.orderAsc).toBeTruthy();
        fileNameHeader.click();
        expect(scope.orderAsc).toBeFalsy();
        fileNameHeader.click();
        expect(scope.orderAsc).toBeTruthy();
    }));
    
    it('should clear the sorting indicator after selecting another column for sorting', inject(($compile: Function, $rootScope: ng.IRootScopeService) => {
        element = ng.element('<uif-table><uif-table-row><uif-table-header uif-order-by="id">ID</uif-table-header><uif-table-header uif-order-by="fileName">File name</uif-table-header></uif-table-row></uif-table>');
        $compile(element)(scope);
        scope.$digest();
        
        let idHeader: JQuery = element.children().eq(0).children().eq(0);
        let fileNameHeader: JQuery = element.children().eq(0).children().eq(1);
        idHeader.click(); // sort id:asc
        fileNameHeader.click(); // sort fileName:asc
        expect(idHeader.children().length).toEqual(1, 'Sorting indicator not removed from column previously used for sorting');
        expect(fileNameHeader.children().length).toEqual(2, 'Sorting indicator not added to the column used for sorting');
    }));
    
    it('should change the sorting order to ascending after selecting another column for sorting', inject(($compile: Function, $rootScope: ng.IRootScopeService) => {
        element = ng.element('<uif-table><uif-table-row><uif-table-header uif-order-by="id"></uif-table-header><uif-table-header uif-order-by="fileName"></uif-table-header></uif-table-row></uif-table>');
        $compile(element)(scope);
        scope.$digest();
        
        let idHeader: JQuery = element.children().eq(0).children().eq(0);
        let fileNameHeader: JQuery = element.children().eq(0).children().eq(1);
        idHeader.click(); // sort id:asc
        idHeader.click(); // sort id:desc
        fileNameHeader.click(); // sort fileName:asc
        expect(scope.orderAsc).toBeTruthy();
    }));
    
    it('should keep the sorting data intact after selecting another column for which sorting hasn\'t been enabled', inject(($compile: Function, $rootScope: ng.IRootScopeService) => {
        element = ng.element('<uif-table><uif-table-row><uif-table-header></uif-table-header><uif-table-header uif-order-by="fileName"></uif-table-header></uif-table-row></uif-table>');
        $compile(element)(scope);
        scope.$digest();
        
        let firstHeader: JQuery = element.children().eq(0).children().eq(0);
        let fileNameHeader: JQuery = element.children().eq(0).children().eq(1);
        fileNameHeader.click(); // sort fileName:asc
        firstHeader.click(); // sorting disabled; do nothing
        expect(scope.orderBy).toEqual('fileName');
        expect(scope.orderAsc).toBeTruthy();
    }));
});
