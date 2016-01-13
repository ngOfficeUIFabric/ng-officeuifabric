'use strict';

import * as ng from 'angular';

describe('searchBoxDirective: <uif-searchbox />', () => {
    let element: ng.IAugmentedJQuery;
    let scope: ng.IScope;
    beforeEach(() => {
        angular.mock.module('officeuifabric.core');
        angular.mock.module('officeuifabric.components.searchbox');
    });
    beforeEach(inject(($rootScope: ng.IRootScopeService, $compile: Function) => {
        element = ng.element('<uif-searchbox value="\'value\'" />');
        scope = $rootScope;
        $compile(element)(scope);
        scope.$digest();
    }));

    afterEach(() => {
        // myfunc.reset();
    });
    it('should render correct HTML', () => {
        let elem: ng.IAugmentedJQuery = element.find('input');
        expect(elem.length).toBe(1);
    });

    it('should have unique ids', inject(($compile: Function, $rootScope: ng.IRootScopeService) => {
        let $scope: ng.IScope = $rootScope.$new();
        let textBox1: ng.IAugmentedJQuery = $compile('<uif-searchbox ></uif-searchbox>')($scope);
        $scope.$digest();
        let textField1: JQuery = $(textBox1[0]).find('.ms-SearchBox-field');
        let textBox2: ng.IAugmentedJQuery = $compile('<uif-searchbox ></uif-searchbox>')($scope);
        $scope.$digest();
        let textField2: JQuery = $(textBox2[0]).find('.ms-SearchBox-field');
        expect(textField1[0].id === textField2[0].id).toBe(false);
    }));
    it('should be able to set value', inject(($rootScope: ng.IRootScopeService, $compile: Function) => {
        let $newScope: ng.IScope = $rootScope.$new();
        let tag: ng.IAugmentedJQuery = ng.element("<uif-searchbox value=\"'Value'\" />");
        $compile(tag)($newScope);
        $newScope.$digest();
        expect(tag.find('.ms-SearchBox-field').val()).toBe('Value');
    }));
    it('hide label', inject(($rootScope: ng.IRootScopeService, $compile: Function) => {
        let $newScope: ng.IScope = $rootScope.$new();
        let tag: ng.IAugmentedJQuery = ng.element('<uif-searchbox />');
        $compile(tag)($newScope);
        $newScope.$digest();
        tag.find('input').triggerHandler('focus');
        $newScope.$digest();
        expect(tag.find('.ms-SearchBox-label').hasClass('ng-hide')).toBe(true);
        tag.find('input').triggerHandler('blur');
        $newScope.$digest();
        expect(tag.find('.ms-SearchBox-label').hasClass('ng-hide')).toBe(false);
    }));
});
