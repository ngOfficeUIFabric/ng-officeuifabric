'use strict';

import * as ng from 'angular';

describe('overlayDirective: <uif-overlay />', () => {
    let element: ng.IAugmentedJQuery;
    let scope: ng.IScope;

    beforeEach(() => {
        angular.mock.module('officeuifabric.core');
        angular.mock.module('officeuifabric.components.overlay');
    });

    beforeEach(inject(($rootScope: ng.IRootScopeService, $compile: Function) => {
        element = ng.element('<uif-overlay>hello world</uif-overlay>');
        scope = $rootScope;
        $compile(element)(scope);
        scope.$digest();
    }));

    /**
     * Verifies directive generates the correct HTML element.
     */
    it('should render correct HTML', () => {
        // get the rendered overlay element
        let overlayElement: ng.IAugmentedJQuery = element.find('div');

        // make sure found the overlay
        expect(overlayElement.length).toBe(1);
        expect(overlayElement.text()).toBe('hello world');
    });

    /**
     * Verifies directive generates the correct CSS classes.
     */
    it('should render correct Office UI Fabric CSS classes', () => {
        // get the rendered overlay element
        let overlayElement: ng.IAugmentedJQuery = element.find('div');

        // ensure overlay has the correct classes
        expect(overlayElement.eq(0)).toHaveClass('ms-Overlay');
        expect(overlayElement.eq(0)).not.toHaveClass('ms-Overlay--dark');
    });

    /**
     * Verifies directive generates the correct CSS classes with dark theme.
     */
    it('should render correct Office UI Fabric CSS classes with dark theme', inject(($compile: Function) => {
        element = ng.element('<uif-overlay uif-mode="dark">hello world</uif-overlay>');
        $compile(element)(scope);
        scope.$digest();

        // get the rendered overlay element
        let overlayElement: ng.IAugmentedJQuery = element.find('div');

        // ensure overlay has the correct classes
        expect(overlayElement.eq(0)).toHaveClass('ms-Overlay');
        expect(overlayElement.eq(0)).toHaveClass('ms-Overlay--dark');
    }));

    /**
     * Verifies directive defaults to light theme if an invalid mode is passed and returns a console error message.
     */
    it('should render default (light) theme if an invalid mode is passed', inject(($compile: Function) => {
        element = ng.element('<uif-overlay uif-mode="invalid">hello world</uif-overlay>');
        $compile(element)(scope);
        scope.$digest();

        // get the rendered overlay element
        let overlayElement: ng.IAugmentedJQuery = element.find('div');

        // ensure overlay has the correct classes
        expect(overlayElement.eq(0)).toHaveClass('ms-Overlay');
        expect(overlayElement.eq(0)).not.toHaveClass('ms-Overlay--dark');
    }));
});
