'use strict';

import * as angular from 'angular';

describe('messageBarDirective: <uif-message-bar />', () => {
    let $element: JQuery;
    let $scope: any;

    beforeEach(() => {
        angular.mock.module('officeuifabric.core');
        angular.mock.module('officeuifabric.components.messagebar');
    });

    beforeEach(inject(($rootScope: angular.IRootScopeService, $compile: Function) => {
        $element = angular.element(`
        <uif-message-bar>
            <uif-content>
                {{message}}
            </uif-content>
            <uif-link ng-href="{{link.url}}">{{link.text}}</uif-link>
        </uif-message-bar>
        `);
        $scope = $rootScope;
        $compile($element)($scope);
        $scope.$digest();
        $element = jQuery($element[0]);
    }));

    it('should render HTML', (): void => {
        let divs: JQuery = $element.find('div');
        expect(divs.length).toBe(4, 'There should be 4 divs');

        let icon: JQuery = $element.find('i');
        expect(icon.length).toBe(1, 'There should be one i tag');

        let link: JQuery = $element.find('a');
        expect(link.length).toBe(1, 'There should be one a tag');

    });

    it('should be able to render uif-content message', (): void => {
        $scope.message = 'Lorem ipsum message';
        $scope.$digest();
        let content: JQuery = $element.find('.uif-content>span.ng-scope');
        expect(content.html()).toContain('Lorem ipsum message', 'Message should be placed in uif-content block.');
    });

    it('should be able to render uif-link', inject(
        (
            $compile: Function,
            $rootScope: angular.IRootScopeService,
            $log: angular.ILogService) => {

            let scope: any = $rootScope.$new();
            scope.link = {};
            scope.link.url = 'http://ngofficeuifabric.com';
            scope.link.text = 'Lorem ipsum';

            let element: JQuery = angular.element(`
            <uif-message-bar>
                <uif-content>
                    {{message}}
                </uif-content>
                <uif-link ng-href="{{link.url}}">{{link.text}}</uif-link>
            </uif-message-bar>
            `);
            $compile(element)(scope);
            scope.$digest();

            element = jQuery(element[0]);
            let link: JQuery = element.find('.ms-Link');

            expect(link.attr('href')).toContain(scope.link.url, 'Link url should be set.');
            expect(link.html()).toContain(scope.link.text, 'Link Text should be set.');

        }
    ));

    it('should be validating uif-type attribute', inject(
        (
            $compile: Function,
            $rootScope: angular.IRootScopeService,
            $log: angular.ILogService) => {

            let scope: any = $rootScope.$new();

            expect($log.error.logs.length).toBe(0);

            let element: JQuery = angular.element(`
            <uif-message-bar uif-type="invalid">
                <uif-content>
                    {{message}}
                </uif-content>
                <uif-link ng-href="{{link.url}}">{{link.text}}</uif-link>
            </uif-message-bar>
            `);
            $compile(element)(scope);
            scope.$digest();
            element = jQuery(element[0]);

            expect($log.error.logs[0]).toContain('Error [ngOfficeUiFabric] officeuifabric.components.messagebar - Unsupported type: ' +
                'The type (\'invalid\') is not supported by the Office UI Fabric. ' +
                'Supported options are listed here: ' +
                'https://github.com/ngOfficeUIFabric/ng-officeuifabric/blob/master/src/components/messagebar/' +
                'messageBarTypeEnum.ts');
        })
    );
    it('should be set icons for uif-type attribute', inject(
        (
            $compile: Function,
            $rootScope: angular.IRootScopeService,
            $log: angular.ILogService) => {

            let scope: any = $rootScope.$new();

            let element: JQuery = angular.element(`
            <uif-message-bar uif-type="error">
                <uif-content>
                    {{message}}
                </uif-content>
                <uif-link ng-href="{{link.url}}">{{link.text}}</uif-link>
            </uif-message-bar>
            `);
            $compile(element)(scope);
            scope.$digest();
            element = jQuery(element[0]);

            let icon: JQuery = element.find('.ms-Icon');
            expect(icon.hasClass('ms-Icon--xCircle')).toBe(true, 'icon for type error is set');
        })
    );

    it('should allow to interpolate uif-type value', inject(
        (
            $compile: Function,
            $rootScope: angular.IRootScopeService,
            $log: angular.ILogService) => {

            let scope: any = $rootScope.$new();

            scope.type = 'error';

            let element: JQuery = angular.element(`
            <uif-message-bar uif-type="{{type}}">
                <uif-content>
                    {{message}}
                </uif-content>
                <uif-link ng-href="{{link.url}}">{{link.text}}</uif-link>
            </uif-message-bar>
            `);
            $compile(element)(scope);
            scope.$digest();
            element = jQuery(element[0]);

            let icon: JQuery = element.find('.ms-Icon');
            expect(icon.hasClass('ms-Icon--xCircle')).toBe(true, 'icon for type error is set');
        })
    );
});
