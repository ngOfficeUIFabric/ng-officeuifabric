'use strict';

import * as ng from 'angular';

describe('tableDirective: <uif-table />', () => {
    let element: ng.IAugmentedJQuery;
    let scope: ng.IScope;

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
        element = ng.element('<uif-table-header></uif-table-header>');
        $compile(element)(scope);
        scope.$digest();
        expect(element.prop('tagName')).toEqual('SPAN');
    }));

    it('should set correct Office UI Fabric classes on the table header', inject(($compile: Function, $rootScope: ng.IRootScopeService) => {
        element = ng.element('<uif-table-header></uif-table-header>');
        $compile(element)(scope);
        scope.$digest();
        expect(element).toHaveClass('ms-Table-cell');
    }));
});
