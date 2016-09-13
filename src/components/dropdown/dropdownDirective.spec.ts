describe('dropdownDirective: <uif-dropdown />', () => {
    beforeEach(() => {
        angular.mock.module('officeuifabric.components.dropdown');
    });

    it('should render correct html', inject(($compile: Function, $rootScope: ng.IRootScopeService) => {
        let $scope: any = $rootScope.$new();

        let dropdown: JQuery = $compile('<uif-dropdown ng-model="selectedValue">' +
        '<uif-dropdown-option value="value1">Text 1</uif-dropdown-option>' +
        '<uif-dropdown-option value="value2">Text 2</uif-dropdown-option>' +
        '<uif-dropdown-option value="value3">Text 3</uif-dropdown-option>' +
        '<uif-dropdown-option value="value4">Text 4</uif-dropdown-option>' +
        '</uif-dropdown>')($scope);
        $scope.$digest();
        dropdown = jQuery(dropdown[0]);
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
            '<uif-dropdown-option ng-repeat="o in options" value="{{o.value}}">{{o.text}}</uif-dropdown-option></uif-dropdown>')($scope);

        $scope.$digest();
        dropdown = jQuery(dropdown[0]);
        let items: JQuery = dropdown.find('li');
        expect(items.length).toBe(4);
        expect(items[2].innerText).toBe('Option 3');
    }));
    it('should be able to click the dropdown', inject(($compile: Function, $rootScope: ng.IRootScopeService) => {
        let $scope: any = $rootScope.$new();
        let dropdown: JQuery = $compile('<uif-dropdown></uif-dropdown>')($scope);
        $scope.$digest();
        dropdown = jQuery(dropdown[0]);
        dropdown.appendTo(document.body);

        dropdown.click();
        let div: JQuery = dropdown.find('div.ms-Dropdown');

        expect(div.hasClass('is-open')).toBe(true, 'Should have class is-open after click');

        dropdown.click();
        expect(div.hasClass('is-open')).toBe(false, 'Should not have class is-open after click');

        dropdown.click();
        expect(div.hasClass('is-open')).toBe(true, 'Should have class is-open after click');
        $('html').click();
        expect(div.hasClass('is-open')).toBe(false, 'Should not have class is-open after click on HTML');
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
            '<uif-dropdown-option ng-repeat="option in options" value="{{option.value}}">{{option.text}}</uif-dropdown-option>' +
            '</uif-dropdown>')($scope);
        $scope.$digest();
        dropdown = jQuery(dropdown[0]);
        dropdown.appendTo(document.body);
        let option3: JQuery = jQuery(dropdown.find('li')[2]);

        option3.click();
        let title: JQuery = dropdown.find('span.ms-Dropdown-title');
        expect(title.text()).toBe('Option 3', 'Displayed text should be Option 3');
        expect($scope.selectedValue).toBe('Option3', 'Selected value should be Option3');

        $scope.selectedValue = null;
        $scope.$apply();
        title = dropdown.find('span.ms-Dropdown-title');
        expect(title.text()).toBe('', 'Displayed text should be empty as selectedValue == null');

        $scope.selectedValue = 'Option2';
        $scope.$apply();
        title = dropdown.find('span.ms-Dropdown-title');
        expect(title.text()).toBe('Option 2', 'Displayed text should be Option 2');

        $scope.selectedValue = 'Option300';
        $scope.$apply();
        title = dropdown.find('span.ms-Dropdown-title');
        expect(title.text()).toBe('', 'Displayed text should be empty as selectedValue is an unknown value');
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
            '<uif-dropdown-option ng-repeat="option in options" value="{{option.value}}">{{option.text}}</uif-dropdown-option>' +
            '</uif-dropdown>')($scope);
        $scope.$digest();
        dropdown = jQuery(dropdown[0]);

        let div: JQuery = dropdown.find('div.ms-Dropdown');
        expect(div.hasClass('is-open')).toBe(false, 'Should be closed, always, as the dropdown is disabled');
        dropdown.click();

        expect(div.hasClass('is-open')).toBe(false, 'Should be closed, always, as the dropdown is disabled');

        dropdown.click();
        expect(div.hasClass('is-open')).toBe(false, 'Should be closed, always, as the dropdown is disabled');

        // ng-disabled
        dropdown = $compile('<uif-dropdown ng-model="selectedValue" ng-disabled="isDisabled">' +
            '<uif-dropdown-option ng-repeat="option in options" value="{{option.value}}">{{option.text}}</uif-dropdown-option>' +
            '</uif-dropdown>')($scope);
        $scope.$digest();
        dropdown = jQuery(dropdown[0]);

        div = dropdown.find('div.ms-Dropdown');
        expect(div.hasClass('is-open')).toBe(false, 'Should be closed, always, as the dropdown is disabled');

        $scope.isDisabled = false;
        $scope.$apply();

        dropdown.click();
        expect(div.hasClass('is-open')).toBe(true, 'No longer disabled, should be able to open');

        dropdown.click();
        expect(div.hasClass('is-open')).toBe(false, 'Should be closed after clicking again');

        $scope.isDisabled = true;
        $scope.$apply();

        dropdown.click();
        expect(div.hasClass('is-open')).toBe(false, 'Should be closed as the dropdown is disabled again');
    }));
    it('should be able to pre-select an option', inject(($compile: Function, $rootScope: ng.IRootScopeService) => {
        let $scope: any = $rootScope.$new();
        $scope.options = [
            { text: 'Option 1', value: 'Option1'},
            { text: 'Option 2', value: 'Option2'},
            { text: 'Option 3', value: 'Option3'},
            { text: 'Option 4', value: 'Option4'}
        ];
        $scope.selectedValue = 'Option2';

        let dropdown: JQuery = $compile('<uif-dropdown ng-model="selectedValue">' +
            '<uif-dropdown-option ng-repeat="option in options" value="{{option.value}}"\
              title="{{option.text}}">{{option.text}}</uif-dropdown-option>' +
            '</uif-dropdown>')($scope);
        $scope.$digest();
        dropdown = jQuery(dropdown[0]);
        dropdown.appendTo(document.body);

        let title: JQuery = dropdown.find('span.ms-Dropdown-title');
        expect(title.text()).toBe('Option 2', 'Displayed text should be Option 2');
    }));

    it('should be able to pre-select an integer option', inject(($compile: Function, $rootScope: ng.IRootScopeService) => {
        let $scope: any = $rootScope.$new();
        $scope.options = [
            { text: 'Option 1', value: 1},
            { text: 'Option 2', value: 2},
            { text: 'Option 3', value: 3},
            { text: 'Option 4', value: 4}
        ];
        $scope.selectedValue = 2;

        let dropdown: JQuery = $compile('<uif-dropdown ng-model="selectedValue">' +
            '<uif-dropdown-option ng-repeat="option in options" value="{{option.value}}"\
              title="{{option.text}}">{{option.text}}</uif-dropdown-option>' +
            '</uif-dropdown>')($scope);
        $scope.$digest();
        dropdown = jQuery(dropdown[0]);
        dropdown.appendTo(document.body);

        let title: JQuery = dropdown.find('span.ms-Dropdown-title');
        expect(title.text()).toBe('Option 2', 'Displayed text should be Option 2');
    }));

    it('should set $touched on blur', inject(($compile: Function, $rootScope: ng.IRootScopeService) => {
        let $scope: any = $rootScope.$new();
        $scope.options = [
            { text: 'Option 1', value: 'Option1'},
            { text: 'Option 2', value: 'Option2'},
            { text: 'Option 3', value: 'Option3'},
            { text: 'Option 4', value: 'Option4'}
        ];
        $scope.selectedValue = 'Option2';

        let liteDropdown: ng.IAugmentedJQuery = $compile('<uif-dropdown ng-model="selectedValue">' +
            '<uif-dropdown-option ng-repeat="option in options" value="{{option.value}}"\
              title="{{option.text}}">{{option.text}}</uif-dropdown-option>' +
            '</uif-dropdown>')($scope);
        $scope.$digest();
        let dropdown: JQuery = jQuery(liteDropdown[0]);

        let ngModelCtrl: ng.INgModelController = angular.element(liteDropdown).controller('ngModel');
        expect(ngModelCtrl.$touched).toBe(false);

        dropdown.click();
        $('html').click();

        $scope.$digest();

        expect(ngModelCtrl.$touched).toBe(true);
    }));

    it('should set $dirty on value change', inject(($compile: Function, $rootScope: ng.IRootScopeService) => {
        let $scope: any = $rootScope.$new();
        $scope.options = [
            { text: 'Option 1', value: 'Option1'},
            { text: 'Option 2', value: 'Option2'},
            { text: 'Option 3', value: 'Option3'},
            { text: 'Option 4', value: 'Option4'}
        ];
        $scope.selectedValue = 'Option2';

        let liteDropdown: ng.IAugmentedJQuery = $compile('<uif-dropdown ng-model="selectedValue">' +
            '<uif-dropdown-option ng-repeat="option in options" value="{{option.value}}"\
              title="{{option.text}}">{{option.text}}</uif-dropdown-option>' +
            '</uif-dropdown>')($scope);
        $scope.$digest();
        let dropdown: JQuery = jQuery(liteDropdown[0]);

        let ngModelCtrl: ng.INgModelController = angular.element(liteDropdown).controller('ngModel');
        expect(ngModelCtrl.$dirty).toBe(false);

        let option3: JQuery = jQuery(dropdown.find('li')[2]);
        option3.click();
        expect($scope.selectedValue).toBe('Option3', 'Selected value should be Option3');

        expect(ngModelCtrl.$dirty).toBe(true);
    }));
});
