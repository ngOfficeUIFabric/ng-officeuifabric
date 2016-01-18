describe('choicefieldDirective <uif-choicefield />', () => {
    beforeEach(() => {
        angular.mock.module('officeuifabric.components.choicefield');
        jQuery.noConflict();
    });

    it('should render correct html', inject(($compile: Function, $rootScope: ng.IRootScopeService) => {
        let $scope: any = $rootScope.$new();

        let choicefield: JQuery = $compile('<uif-choicefield-group ng-model="selectedValue">' +
        '<uif-choicefield-option uif-type="radio" value="value1">Text 1</uif-choicefield-option>' +
        '<uif-choicefield-option uif-type="radio" value="value2">Text 2</uif-choicefield-option>' +
        '<uif-choicefield-option uif-type="radio" value="value3">Text 3</uif-choicefield-option>' +
        '<uif-choicefield-option uif-type="radio" value="value4">Text 4</uif-choicefield-option>' +
        '</uif-choicefield>')($scope);
        $scope.$digest();
        let container: JQuery = choicefield.find('div.ms-ChoiceFieldGroup');

        expect(container.length).toBe(1, 'Container should be present');

        let items: JQuery = choicefield.find('input');
        expect(items.length).toBe(4, 'There should be 4 inputs');

        let input1: JQuery = jQuery(items[0]);
        expect(input1.attr('type')).toBe('radio', 'Type should be radio');

        let span1: JQuery = container.find('label[for="' + input1.attr('id') + '"] span span.ng-scope');
        expect(span1.html()).toBe('Text 1', 'Label should be Text 1');
    }));

    it('should be able to set options', inject(($compile: Function, $rootScope: ng.IRootScopeService) => {
        let $scope: any = $rootScope.$new();
        $scope.selectedValue = 'value2';
        let choicefield: JQuery = $compile('<uif-choicefield-group ng-model="selectedValue">' +
        '<uif-choicefield-option uif-type="radio" value="value1">Text 1</uif-choicefield-option>' +
        '<uif-choicefield-option uif-type="radio" value="value2">Text 2</uif-choicefield-option>' +
        '<uif-choicefield-option uif-type="radio" value="value3">Text 3</uif-choicefield-option>' +
        '<uif-choicefield-option uif-type="radio" value="value4">Text 4</uif-choicefield-option>' +
        '</uif-choicefield-group>')($scope);
        $scope.$digest();

        let input2: JQuery = choicefield.find('div.ms-ChoiceFieldGroup div.ms-ChoiceField:nth-child(2) input');
        input2 = jQuery(choicefield.find('input')[1]);
        expect(input2.prop('checked')).toBe(true, 'Input 2 (value2) should be checked');

        let input3: JQuery = jQuery(choicefield.find('input')[2]);
        expect(input3.attr('checked')).not.toBe('checked', 'Other inputs should not be checked.');
    }));
    it('should be able to select an option in a group', inject(($compile: Function, $rootScope: ng.IRootScopeService) => {
        let $scope: any = $rootScope.$new();
        $scope.options = [
            { text: 'Option 1', value: 'Option1'},
            { text: 'Option 2', value: 'Option2'},
            { text: 'Option 3', value: 'Option3'},
            { text: 'Option 4', value: 'Option4'}
        ];
        $scope.selectedValue = 'Option1';

        let choicefield: JQuery = $compile('<uif-choicefield-group ng-model="selectedValue">' +
            '<uif-choicefield-option uif-type="radio" ng-repeat="option in options" ' +
            'value="{{option.value}}">{{option.text}}</uif-choicefield-option></uif-choicefield-group>')($scope);
        $scope.$digest();
        choicefield.appendTo(document.body);
        let option1: JQuery = jQuery(choicefield.find('input')[0]);
        let option3: JQuery = jQuery(choicefield.find('input')[2]);

        expect(option1.prop('checked')).toBe(true, 'Option 1 - Checked should be true before click');
        option3.click();
        expect(option3.prop('checked')).toBe(true, 'Option 3 - Checked should be true after click');
        expect(option3.prop('checked')).toBe(true, 'Option 1 - Checked should be false after click');
        expect($scope.selectedValue).toBe('Option3', 'Scope value should be option3 now as it is a radio button group');
    }));
    it('should be able to select a single option', inject(($compile: Function, $rootScope: ng.IRootScopeService) => {
        let $scope: any = $rootScope.$new();
        $scope.selectedValue = '';

        let choicefield: JQuery = $compile('<uif-choicefield-option uif-type="checkbox" value="Option1"' +
            'ng-model="selectedValue" ng-true-value="\'TRUEVALUE\'" ng-false-value="\'FALSEVALUE\'">Option 1</uif-choicefield>')($scope);
        $scope.$digest();

        let input: JQuery = choicefield.find('input');
        input.click();

        expect(input.prop('checked')).toBe(true, 'Input should be checked after click');
        expect($scope.selectedValue).toBe('TRUEVALUE', 'ng model should be "TRUEVALUE"');
    }));

    it('should be validating attributes', inject(($compile: Function, $rootScope: ng.IRootScopeService, $log: ng.ILogService) => {
        let $scope: any = $rootScope.$new();
        $scope.selectedValue = 'Option1';

        expect($log.error.logs.length).toBe(0);
        $compile('<uif-choicefield-option uif-type="invalid" value="Option1"' +
            'ng-model="selectedValue">Option 1</uif-choicefield>')($scope);
        $scope.$digest();

        expect($log.error.logs[0]).toContain('Error [ngOfficeUiFabric] officeuifabric.components.choicefield - ' +
            '"invalid" is not a valid value for uifType. ' +
            'Supported options are listed here: ' +
            'https://github.com/ngOfficeUIFabric/ng-officeuifabric/blob/master/src/components/choicefield/choicefieldTypeEnum.ts');
    }));

    it('should be able to disable an select', inject(($compile: Function, $rootScope: ng.IRootScopeService) => {
        let $scope: any = $rootScope.$new();
        $scope.options = [
            { text: 'Option 1', value: 'Option1'},
            { text: 'Option 2', value: 'Option2'},
            { text: 'Option 3', value: 'Option3'},
            { text: 'Option 4', value: 'Option4'}
        ];
        $scope.selectedValue = 'Option1';

        let choicefield: JQuery = $compile('<uif-choicefield-group ng-model="selectedValue" disabled uif-type="radio">' +
            '<uif-choicefield-option ng-repeat="option in options" ' +
            'value="{{option.value}}">{{option.text}}</uif-choicefield-option></uif-choicefield-group>')($scope);
        $scope.$digest();

        let option1: JQuery = jQuery(choicefield.find('input')[0]);
        let option3: JQuery = jQuery(choicefield.find('input')[2]);
        option3.click();
        expect(option3.prop('checked')).toBe(false, 'Option 3 - Checked should be false after click as element is disabled');
        expect(option1.prop('checked')).toBe(true, 'Option 1 - Checked should still be true after click as element is disabled');
    }));
});

