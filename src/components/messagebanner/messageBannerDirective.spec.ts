'use strict';

import * as ng from 'angular';

describe('messageBannerDirective: <uif-message-banner />', () => {
    let $element: JQuery;
    let $scope: any;

    beforeEach(() => {
        angular.mock.module('officeuifabric.core');
        angular.mock.module('officeuifabric.components.messagebanner');
    });

    beforeEach(inject(($rootScope: ng.IRootScopeService, $compile: Function) => {
        $element = ng.element(`
        <uif-message-banner uif-is-visible="toggle" uif-action-label="{{label}}" 
        uif-action="customFunction()" uif-on-close="customCloseFunction()">
            <uif-content>
                {{message}}
            </uif-content>
        </uif-message-banner>  
        `);
        $scope = $rootScope;
        $compile($element)($scope);
        $scope.$digest();
        $element = jQuery($element[0]);
    }));

    it('should be able to show or hide banner', (): void => {
        $scope.toggle = true;
        $scope.$digest();
        let container: JQuery = $element.find('.ms-MessageBanner');
        expect(container.hasClass('ng-hide')).toBe(false, 'message banner is visible');

        $scope.toggle = false;
        $scope.$digest();
        expect(container.hasClass('ng-hide')).toBe(true, 'message banner is hidden');
    });

    it('should be able to render ui-content message', (): void => {
        $scope.message = 'Lorem ipsum message';
        $scope.$digest();
        let content: JQuery = $element.find('.uif-content>span.ng-scope');
        expect(content.html()).toContain('Lorem ipsum message', 'Message should be placed in uif-content block.');
    });

    it('should be able to render label text', (): void => {
        $scope.label = 'Lorem ipsum button';
        $scope.$digest();
        let button: JQuery = $element.find('.ms-MessageBanner-action');
        expect(button.html()).toContain('Lorem ipsum button', 'Label should be placed in uif-button.');
    });

    it('should be able to be expanded', (): void => {
        let chevronButton: JQuery = jQuery($element.find('.ms-MessageBanner-expand'));
        let chevronDown: JQuery = jQuery(chevronButton.find('uif-icon').eq(0));
        let chevronUp: JQuery = jQuery(chevronButton.find('uif-icon').eq(1));

        let container: JQuery = jQuery($element.find('.ms-MessageBanner'));

        expect(chevronDown.hasClass('ng-hide')).toBe(false, 'Chevron down is visible');
        expect(chevronUp.hasClass('ng-hide')).toBe(true, 'Chevron up is hidden');

        chevronButton.click();

        expect(container.hasClass('is-expanded')).toBe(true, 'Container should be expanded');
        expect(chevronDown.hasClass('ng-hide')).toBe(true, 'Chevron down is hidden');
        expect(chevronUp.hasClass('ng-hide')).toBe(false, 'Chevron up is visible');

        chevronButton.click();

        expect(container.hasClass('is-expanded')).toBe(false, 'Container should not be expanded');
    });

    it('should be able to call action callback', (): void => {
        $scope.customFunction = function (): void {
            return;
        };
        $scope.$digest();

        let button: JQuery = $element.find('.ms-MessageBanner-action button');
        spyOn($scope, 'customFunction');
        button.trigger('click');
        expect($scope.customFunction).toHaveBeenCalled();
    });

    it('should be able to call close callback', (): void => {
        $scope.customCloseFunction = function (): void {
            return;
        };
        $scope.$digest();

        let button: JQuery = $element.find('.ms-MessageBanner-close');
        spyOn($scope, 'customCloseFunction');
        button.trigger('click');
        expect($scope.customCloseFunction).toHaveBeenCalled();
    });

    it('should be able to resize the messageBanner', inject(
        (
            $rootScope: ng.IRootScopeService,
            $compile: Function,
            $window: ng.IWindowService,
            $controller: ng.IControllerService) => {

            let element: JQuery;

            let scope: any = $rootScope.$new();

            element = ng.element(`
        <uif-message-banner uif-is-visible="toggle" uif-action-label="{{label}}" 
        uif-action="customFunction()" uif-on-close="customCloseFunction()">
            <uif-content>
                {{message}}
            </uif-content>
        </uif-message-banner>  
        `);
            $compile(element)(scope);
            scope.message = 'Lorem ipsum message';
            scope.$digest();
            element = jQuery(element[0]);

            let directiveScope: any = ng.element(element).isolateScope();

            // narrow down window
            directiveScope.onResize(470);

            let chevron: JQuery = element.find('.ms-MessageBanner-expand');
            expect(chevron.css('height')).toBe('85px', 'Element height is 85px');

            // back to normal
            directiveScope.onResize(800);

            chevron = element.find('.ms-MessageBanner-expand');
            expect(chevron.css('height')).toBe('52px', 'Element height is 52px');
        }));
});
