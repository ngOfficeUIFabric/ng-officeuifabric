'use strict';

import * as ng from 'angular';

describe("searchBoxDirective: <uif-searchbox />", () => {
    let element: ng.IAugmentedJQuery;
    let scope: ng.IScope;
    beforeEach(() => {
        angular.mock.module('officeuifabric.core');
        angular.mock.module('officeuifabric.components.searchbox');
    });
    beforeEach(inject(($rootScope: ng.IRootScopeService, $compile: Function) => {
        element = ng.element('<uif-searchbox uif-value="\'value\'" />');
        scope = $rootScope;
        $compile(element)(scope);
        scope.$digest();
    }));

    afterEach(() => {
        // myfunc.reset();
    });
    it('should render correct HTML', () => {
        let elem: ng.IAugmentedJQuery = element.find('input');
        console.log(elem.html());
        expect(elem.length).toBe(1);
    });

    it("should have unique ids", inject(($compile, $rootScope) => {
        var $scope = $rootScope.$new();
        var textBox1 = $compile('<uif-Searchbox ></uif-Searchbox>')($scope);
        $scope.$digest();
        var textField1 = $(textBox1[0]).find('.ms-SearchBox-field');

        var textBox2 = $compile('<uif-Searchbox ></uif-Searchbox>')($scope);
        $scope.$digest();
        var textField2 = $(textBox2[0]).find('.ms-SearchBox-field');
        
        expect(textField1[0].id === textField2[0].id).toBe(false);

    }));
    it("should be able to set value", inject(($rootScope: ng.IRootScopeService, $compile: Function) => {
        let $newScope = $rootScope.$new();
        $newScope["Value"] = "Test";
      
        let tag:ng.IAugmentedJQuery = ng.element("<uif-searchbox uif-value=\"'Value'\" />");
        $compile(tag)($newScope);
       
        $newScope.$digest();
       
        expect(tag.find(".ms-SearchBox-field").val()).toBe('Value');

    }));
    it("hide label", inject(($rootScope: ng.IRootScopeService, $compile: Function) => {
        let $newScope = $rootScope.$new();
        

        let tag: ng.IAugmentedJQuery = ng.element("<uif-searchbox />");
        $compile(tag)($newScope);

        $newScope.$digest();
        tag.find('input').triggerHandler('focus');
        $newScope.$digest();
        console.log(tag.find('.ms-SearchBox-label').attr("style"));
        expect(tag.find(".ms-SearchBox-label").hasClass('ng-hide')).toBe(true);
        tag.find('input').triggerHandler('blur');
        $newScope.$digest();

        expect(tag.find(".ms-SearchBox-label").hasClass('ng-hide')).toBe(false);
    }));
   
});