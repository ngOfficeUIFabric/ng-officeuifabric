'use strict';

import * as ng from 'angular';

describe('linkDirective: <uif-link />', () => {
    let element: JQuery;
    let scope: ng.IScope;

    beforeEach(() => {
        angular.mock.module('officeuifabric.core');
        angular.mock.module('officeuifabric.components.link');
    });

    beforeEach(inject(($rootScope: ng.IRootScopeService, $compile: Function) => {
        element = ng.element('<uif-link ng-href="http://ngofficeuifabric.com">Link Text</uif-link>');
        scope = $rootScope;
        $compile(element)(scope);
        scope.$digest();
        element = jQuery(element[0]);
    }));


    it('should render as an <a>', () => {

        let aElement: JQuery = element;

        expect(aElement).toEqual('a');

    });


    it('should have an href attribute', () => {

        let aElement: JQuery = element;

        expect(aElement).toHaveAttr('href');

    });


    it('should render correct Office UI Fabric CSS classes', () => {

        let aElement: JQuery = element;

        // ensure link has the correct classes
        expect(aElement.eq(0)).toHaveClass('ms-Link');

    });

    it('should not render hero CSS if uif-type not present', () => {

    let aElement: JQuery = element;

    // ensure link has the correct classes
    expect(aElement.eq(0)).not.toHaveClass('ms-Link--hero');

    });


    it('should render the correct text', () => {

        let aElement: JQuery = element;

        // make sure it has the correct text
        expect(aElement.eq(0)).toHaveText('Link Text');

    });

    it('should have hero class if uif-type="hero"', inject(($compile: ng.ICompileService) => {
        element = ng.element('<uif-link ng-href="http://ngofficeuifabric.com" uif-type="hero">Link Text</uif-link>');
        $compile(element)(scope);
        scope.$digest();

        let jqElement: JQuery = jQuery(element);
        expect(jqElement).toHaveClass('ms-Link--hero');

    }));

    it('should not have hero class if uif-type="regular"', inject(($compile: ng.ICompileService) => {
    element = ng.element('<uif-link ng-href="http://ngofficeuifabric.com" uif-type="regular">Link Text</uif-link>');
    $compile(element)(scope);
    scope.$digest();

    let jqElement: JQuery = jQuery(element);
    expect(jqElement).not.toHaveClass('ms-Link--hero');

    }));

    it('should log error message on invalid uif-type', inject(($compile: ng.ICompileService, $log: ng.ILogService) => {
      element = ng.element('<uif-link ng-href="http://ngofficeuifabric.com" uif-type="invalid">Link Text</uif-link>');
      $compile(element)(scope);
      scope.$digest();

      expect($log.error.logs.length === 1).toBeTruthy();
      expect($log.error.logs[0]).toContain('Error [ngOfficeUiFabric] officeuifabric.components.link - "' +
      'invalid" is not a valid value for uifType. It should be hero or regular.');
    }));



});
