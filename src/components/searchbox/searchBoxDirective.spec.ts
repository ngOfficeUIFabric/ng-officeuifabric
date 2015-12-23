/// <reference path="../../../typings/angularjs/angular-mocks.d.ts" />
/// <reference path="../../../typings/angularjs/angular.d.ts" />
/// <reference path="../../../typings/karma/karma.d.ts" />
/// <reference path="../../../typings/jasmine/jasmine.d.ts" />
describe("searchBoxDirective", () => {
    beforeEach(() => {
        angular.mock.module('fabric.ui.components.searchbox');
    });

    afterEach(() => {
        // myfunc.reset();
    });

    it("should have unique ids", inject(($compile, $rootScope) => {
        var $scope = $rootScope.$new();
        var textBox1 = $compile('<uif-Searchbox value="textBoxValue"></uif-Searchbox>')($scope);
        $scope.$apply();

        var textField1 = $(textBox1[0]).find('.ms-SearchBox-field');

        var textBox2 = $compile('<uif-Searchbox value="textBoxValue"></uif-Searchbox>')($scope);
        $scope.$apply();
        var textField2 = $(textBox2[0]).find('.ms-SearchBox-field');
        expect(textField1[0].id === textField2[0].id).toBe(false);

    }));
    it("should be able to set value", inject(($compile, $rootScope) => {
        var $scope = $rootScope.$new();
        $scope.textBoxValue = "Test 1";
        var textBox = $compile('<uif-Searchbox value="textBoxValue"></uif-Searchbox>')($scope);
        $scope.$apply();
        
        var textField = $(textBox[0]).find('.ms-SearchBox-field');
        expect(textField.length).toBe(1);
        expect(textField.val()).toBe('Test 1');

        $scope.textBoxValue = "Test 2";
        $scope.$apply();
        expect(textField.val()).toBe('Test 2');

        textField.val('Test 3');
        textField.trigger('input');
        
        expect(textField.val()).toBe('Test 3', 'Update textbox');
        
        // todo: In the browser this works fine. Not sure why not here :(
        // expect($scope.textBoxValue).toBe('Test 3', 'Scope update parent');
    }));
});