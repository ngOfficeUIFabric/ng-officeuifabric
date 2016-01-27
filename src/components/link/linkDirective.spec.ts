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


    it('should render the correct text', () => {

        let aElement: JQuery = element;

        // make sure it has the correct text
        expect(aElement.eq(0)).toHaveText('Link Text');

    });



});
