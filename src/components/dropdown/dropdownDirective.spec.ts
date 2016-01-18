describe('dropdownDirective: <uif-dropdown />', () => {
    beforeEach(() => {
        angular.mock.module('officeuifabric.components.dropdown');
        jQuery.noConflict();
    });

    it('should render correct html', inject(($compile: Function, $rootScope: ng.IRootScopeService) => {
        let $scope: any = $rootScope.$new();

        let dropdown: JQuery = $compile('<uif-dropdown ng-model="selectedValue">' +
        '<uif-option value="value1">Text 1</uif-option>' +
        '<uif-option value="value2">Text 2</uif-option>' +
        '<uif-option value="value3">Text 3</uif-option>' +
        '<uif-option value="value4">Text 4</uif-option>' +
        '</uif-dropdown>')($scope);
        $scope.$digest();
        let container: JQuery = dropdown.find('div.ms-Dropdown');

        expect(container.length).toBe(1, 'Container should be present');
        let items: JQuery = dropdown.find('li');
        expect(items.length).toBe(4, 'There should be 4 options');
    }));

    it('should be able to set options', inject(($compile: Function, $rootScope: ng.IRootScopeService) => {
        let $scope: any = $rootScope.$new();
        $scope.options = [
            { text: 'Option 1', value: 'Option1'},
            { text: 'Option 2', value: 'Option2'},
            { text: 'Option 3', value: 'Option3'},
            { text: 'Option 4', value: 'Option4'}
        ];
        $scope.selectedValue = 'Option1';
        let dropdown: JQuery = $compile('<uif-dropdown ng-model="selectedValue">' +
            '<uif-option ng-repeat="o in options" value="{{o.value}}">{{o.text}}</uif-option></uif-dropdown>')($scope);

        $scope.$digest();
        let items: JQuery = dropdown.find('li');
        expect(items.length).toBe(4);
        expect(items[2].innerText).toBe('Option 3');
    }));
    it('should be able to click the dropdown', inject(($compile: Function, $rootScope: ng.IRootScopeService) => {
        let $scope: any = $rootScope.$new();
        let dropdown: JQuery = $compile('<uif-dropdown></uif-dropdown>')($scope);
        $scope.$digest();

        dropdown.click();
        let div: JQuery = dropdown.find('div.ms-Dropdown');

        expect(div.hasClass('is-open')).toBe(true, 'Should have class is-open after click');

        dropdown.click();
        expect(div.hasClass('is-open')).toBe(false, 'Should not have class is-open after click');
    }));
    it('should be able to select an option', inject(($compile: Function, $rootScope: ng.IRootScopeService) => {
        let $scope: any = $rootScope.$new();
        $scope.options = [
            { text: 'Option 1', value: 'Option1'},
            { text: 'Option 2', value: 'Option2'},
            { text: 'Option 3', value: 'Option3'},
            { text: 'Option 4', value: 'Option4'}
        ];
        $scope.selectedValue = 'Option1';

        let dropdown: JQuery = $compile('<uif-dropdown ng-model="selectedValue">' +
            '<uif-option ng-repeat="option in options" value="{{option.value}}">{{option.text}}</uif-option></uif-dropdown>')($scope);
        $scope.$digest();
        dropdown.appendTo(document.body);
        let option3: JQuery = jQuery(dropdown.find('li')[2]);

        option3.click();
        let title: JQuery = dropdown.find('span.ms-Dropdown-title');
        expect(title.text()).toBe('Option 3', 'Displayed text should be Option 3');
        expect($scope.selectedValue).toBe('Option3', 'Selected value should be Option3');

        $scope.selectedValue = 'Option2';
        $scope.$apply();
        title = dropdown.find('span.ms-Dropdown-title');
        expect(title.text()).toBe('Option 2', 'Displayed text should be Option 2');
    }));

    it('should be able to disable a select', inject(($compile: Function, $rootScope: ng.IRootScopeService) => {
        let $scope: any = $rootScope.$new();
        $scope.options = [
            { text: 'Option 1', value: 'Option1'},
            { text: 'Option 2', value: 'Option2'},
            { text: 'Option 3', value: 'Option3'},
            { text: 'Option 4', value: 'Option4'}
        ];
        $scope.selectedValue = 'Option1';
        $scope.isDisabled = true;
        let dropdown: JQuery = $compile('<uif-dropdown ng-model="selectedValue" disabled>' +
            '<uif-option ng-repeat="option in options" value="{{option.value}}">{{option.text}}</uif-option></uif-dropdown>')($scope);
        $scope.$digest();

        let div: JQuery = dropdown.find('div.ms-Dropdown');
        expect(div.hasClass('is-open')).toBe(false, 'Should be closed, always, as the dropdown is disabled');
        dropdown.click();

        expect(div.hasClass('is-open')).toBe(false, 'Should be closed, always, as the dropdown is disabled');

        dropdown.click();
        expect(div.hasClass('is-open')).toBe(false, 'Should be closed, always, as the dropdown is disabled');
    }));
});

