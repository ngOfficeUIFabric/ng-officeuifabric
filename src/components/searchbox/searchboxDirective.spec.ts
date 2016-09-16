'use strict';

import * as ng from 'angular';

describe('searchBoxDirective: <uif-searchbox />', () => {
    let element: JQuery;
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
        element = jQuery(element[0]);
    }));

    afterEach(() => {
        // myfunc.reset();
    });
    it('should render correct HTML', () => {
        let elem: JQuery = element.find('input');
        expect(elem.length).toBe(1);
    });

    it('should have unique ids', inject(($compile: Function, $rootScope: ng.IRootScopeService) => {
        let $scope: ng.IScope = $rootScope.$new();
        let textBox1: JQuery = $compile('<uif-searchbox ></uif-searchbox>')($scope);
        textBox1 = jQuery(textBox1[0]);
        $scope.$digest();
        let textField1: JQuery = textBox1.find('.ms-SearchBox-field');
        let textBox2: JQuery = $compile('<uif-searchbox ></uif-searchbox>')($scope);
        textBox2 = jQuery(textBox2[0]);
        $scope.$digest();
        let textField2: JQuery = textBox2.find('.ms-SearchBox-field');
        expect(textField1[0].id === textField2[0].id).toBe(false);
    }));
    it('should be able to set value', inject(($rootScope: ng.IRootScopeService, $compile: Function) => {
        let $newScope: any = $rootScope.$new();
        $newScope.value = 'Value';
        let tag: JQuery = ng.element('<uif-searchbox ng-model="value" />');
        $compile(tag)($newScope);
        $newScope.$digest();
        tag = jQuery(tag[0]);
        expect(tag.find('.ms-SearchBox-field').val()).toBe('Value');
    }));
    it('hide label', inject(($rootScope: ng.IRootScopeService, $compile: Function) => {
        let $newScope: ng.IScope = $rootScope.$new();
        let jqlTag: JQuery = ng.element('<uif-searchbox />'); // jqlite
        $compile(jqlTag)($newScope);
        $newScope.$digest();
        let jqTag: JQuery = jQuery(jqlTag[0]); // jquery

        // trigger events on jqLite element
        jqlTag.find('input').triggerHandler('focus');
        $newScope.$digest();
        expect(jqTag.find('.ms-SearchBox-label').hasClass('ng-hide')).toBe(true);
        jqlTag.find('input').triggerHandler('blur');
        $newScope.$digest();
        expect(jqTag.find('.ms-SearchBox-label').hasClass('ng-hide')).toBe(false);
    }));

    it('should toggle disable', inject(($rootScope: ng.IRootScopeService, $compile: Function) => {
        let $newScope: any = $rootScope.$new();
        $newScope.disabled = false;

        let jqlTag: JQuery = ng.element('<uif-searchbox ng-disabled="disabled"/>'); // jqlite
        $compile(jqlTag)($newScope);
        $newScope.$digest();

        let jqTag: JQuery = jQuery(jqlTag[0]); // jquery

        let div: JQuery = jqTag.find('.ms-SearchBox');
        let input: JQuery = jqTag.find('.ms-SearchBox-field');

        expect(input.attr('disabled')).toBe(undefined, 'Input should not be disabled.');
        expect(div).not.toHaveClass('is-disabled');

        // toggle disabled
        $newScope.disabled = true;
        $newScope.$digest();

        expect(input.attr('disabled')).toBe('disabled', 'Input should be disabled.');
        expect(div).toHaveClass('is-disabled');
    }));

    it('should be initially disabled', inject(($rootScope: ng.IRootScopeService, $compile: Function) => {
        let $newScope: any = $rootScope.$new();
        $newScope.disabled = false;

        let jqlTag: JQuery = ng.element('<uif-searchbox disabled="disabled"/>'); // jqlite
        $compile(jqlTag)($newScope);
        $newScope.$digest();

        let jqTag: JQuery = jQuery(jqlTag[0]); // jquery

        let input: JQuery = jqTag.find('.ms-SearchBox-field');
        let div: JQuery = jqTag.find('.ms-SearchBox');

        expect(input.attr('disabled')).toBe('disabled', 'Input should be disabled.');
        expect(div).toHaveClass('is-disabled');
    }));

    it('should set $dirty value changed', inject(($rootScope: ng.IRootScopeService, $compile: Function) => {
        let $newScope: any = $rootScope.$new();
        $newScope.value = 'Value';

        let tag: JQuery = ng.element('<uif-searchbox ng-model="value" />');
        $compile(tag)($newScope);
        $newScope.$digest();
        tag = jQuery(tag[0]);

        let ngModel: ng.INgModelController = angular.element(tag).controller('ngModel');
        expect(ngModel.$dirty).toBe(false);

        let input: JQuery = tag.find('.ms-SearchBox-field');

        input.val('Value changed');
        angular.element(input).triggerHandler('input');

        $newScope.$digest();

        expect(ngModel.$dirty).toBe(true);
    }));

    it('should set $touched on blur', inject(($rootScope: ng.IRootScopeService, $compile: Function) => {
        let $newScope: any = $rootScope.$new();
        $newScope.value = 'Value';

        let tag: JQuery = ng.element('<uif-searchbox ng-model="value" />');
        $compile(tag)($newScope);
        $newScope.$digest();
        tag = jQuery(tag[0]);

        let ngModel: ng.INgModelController = angular.element(tag).controller('ngModel');
        expect(ngModel.$touched).toBe(false);

        let input: JQuery = tag.find('.ms-SearchBox-field');
        angular.element(input).triggerHandler('blur');

        $newScope.$digest();

        expect(ngModel.$touched).toBe(true);
    }));

    it('when cleared, $dirty should be set', inject(($rootScope: ng.IRootScopeService, $compile: Function) => {
        let $newScope: any = $rootScope.$new();
        $newScope.value = 'Value';

        let tag: JQuery = ng.element('<uif-searchbox ng-model="value" />');
        $compile(tag)($newScope);
        $newScope.$digest();
        tag = jQuery(tag[0]);

        let ngModel: ng.INgModelController = angular.element(tag).controller('ngModel');
        expect(ngModel.$dirty).toBe(false);

        let input: JQuery = tag.find('.ms-SearchBox-field');
        let button: JQuery = tag.find('.ms-SearchBox-closeButton');

        angular.element(button).triggerHandler('mousedown');
        angular.element(input).triggerHandler('blur');

        $newScope.$digest();

        expect($newScope.value).toBe('');
        expect(ngModel.$dirty).toBe(true);
    }));
});
