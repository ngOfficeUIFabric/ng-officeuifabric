'use strict';

import * as ng from 'angular';
describe('uifDialog: <uif-dialog />', () => {
    let element: JQuery;
    let scope: any;

    beforeEach(() => {
        angular.mock.module('officeuifabric.core');
        angular.mock.module('officeuifabric.components.dialog');
    });

    beforeEach(inject(($rootScope: ng.IRootScopeService, $compile: Function) => {
        scope = $rootScope;
    }));

    it('should set correct Office UI Fabric classes on the Dialog', inject(($compile: Function, $rootScope: ng.IRootScopeService) => {
        element = ng.element('<uif-dialog></uif-dialog>');
        $compile(element)(scope);
        scope.$digest();
        expect(element).toHaveClass('ms-Dialog');
    }));
    
    it('should set correct Office UI Fabric attribute [uif-type] on the Dialog', inject(($compile: Function, $rootScope: ng.IRootScopeService) => {
        element = ng.element('<uif-dialog uif-type="header" ></uif-dialog>');
        $compile(element)(scope);
        scope.$digest();
        expect(element).toHaveClass('ms-Dialog--lgHeader');
        element = ng.element('<uif-dialog uif-type="multiline" ></uif-dialog>');
        $compile(element)(scope);
        scope.$digest();
        expect(element).toHaveClass('ms-Dialog--multiline');
    }));
    
    it('should set correct Office UI Fabric attribute [uif-close] on the Dialog', inject(($compile: Function, $rootScope: ng.IRootScopeService) => {
        element = ng.element('<uif-dialog uif-close="true" ></uif-dialog>');
        $compile(element)(scope);
        scope.$digest();
        expect(element).toHaveClass('ms-Dialog--close');
        
    }));
    
    it('should set correct Office UI Fabric classes on the DialogHeader', inject(($compile: Function, $rootScope: ng.IRootScopeService) => {
        element = ng.element('<uif-dialog><uif-dialog-header></uif-dialog-header></uif-dialog>');
        $compile(element)(scope);
        scope.$digest();
        expect(element.find(".ms-dialog-header").length).toBe(1);
    }));


})