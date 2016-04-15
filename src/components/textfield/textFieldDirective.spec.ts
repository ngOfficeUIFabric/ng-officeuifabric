function getMainDiv(rootControl: JQuery): JQuery {
    return rootControl.find('div');
}

describe('textFieldDirective: <uif-textfield />', () => {
    beforeEach(() => {
        angular.mock.module('officeuifabric.components.textfield');
    });

    it('should be able to set value', inject(($compile: Function, $rootScope: ng.IRootScopeService) => {
        let $scope: any = $rootScope.$new();
        $scope.textBoxValue = 'Test 1';
        let textBox: JQuery = $compile('<uif-textfield ng-model="textBoxValue"></uif-textfield>')($scope);
        textBox = jQuery(textBox[0]);
        $scope.$apply();
        let mainDiv: JQuery = getMainDiv(textBox);

        let input: JQuery = mainDiv.find('input');
        expect(input.val()).toBe('Test 1');

        $scope.textBoxValue = 'Test 2';
        $scope.$apply();
        expect(input.val()).toBe('Test 2');
    }));

    it('should be able to set label and description', inject(($compile: Function, $rootScope: ng.IRootScopeService) => {
        let $scope: any = $rootScope.$new();
        let textBox: JQuery = $compile('<uif-textfield uif-label="Label contents"' +
                                                     ' uif-description="Description contents"></uif-textfield>')($scope);
        textBox = jQuery(textBox[0]);
        $scope.$apply();

        let label: JQuery = getMainDiv(textBox).find('label.ms-Label');
        expect(label.html()).toBe('Label contents');

        let description: JQuery = textBox.find('span.ms-TextField-description');
        expect(description.html()).toBe('Description contents');
    }));

    it('should be able to set underlined', inject(($compile: Function, $rootScope: ng.IRootScopeService) => {
        let $scope: any = $rootScope.$new();
        let textBox: JQuery = $compile('<uif-textfield uif-underlined></uif-textfield>')($scope);
        textBox = jQuery(textBox[0]);
        // element must be appended to the body, otherwise focus/blur events don't fire
        textBox.appendTo(document.body);

        $scope.$apply();

        let div: JQuery = getMainDiv(textBox);
        expect(div.hasClass('ms-TextField--underlined')).toBe(true, 'textfield should have ms-textfield--underlined');

        let input: JQuery = textBox.find('input');
        let container: JQuery = textBox.find('div');
        input.focus();
        expect(container.hasClass('is-active')).toBe(true, 'Container should have class in-active when focused');

        input.blur();
        expect(container.hasClass('is-active')).toBe(false, 'Container should not have class in-active when not focused');
    }));

    it('should be able to set required', inject(($compile: Function, $rootScope: ng.IRootScopeService) => {
        let $scope: any = $rootScope.$new();
        let textBox: JQuery = $compile('<uif-textfield required></uif-textfield>')($scope);
        textBox = jQuery(textBox[0]);
        // element must be appended to the body, otherwise focus/blur events don't fire
        textBox.appendTo(document.body);

        $scope.$apply();

        let div: JQuery = getMainDiv(textBox);
        expect(div.hasClass('is-required')).toBe(true, 'textfield should have is-required');
    }));

    it('should be able to set disabled', inject(($compile: Function, $rootScope: ng.IRootScopeService) => {
        let $scope: any = $rootScope.$new();
        let textBox: JQuery = $compile('<uif-textfield disabled></uif-textfield>')($scope);
        textBox = jQuery(textBox[0]);
        // element must be appended to the body, otherwise focus/blur events don't fire
        textBox.appendTo(document.body);

        $scope.$apply();

        let div: JQuery = getMainDiv(textBox);
        expect(div.hasClass('is-disabled')).toBe(true, 'textfield should have is-disabled');

        let input: JQuery = textBox.find('input');
        let container: JQuery = textBox.find('div');
        spyOn(input[0], 'focus');
        input.click();
        expect(container.hasClass('is-active')).toBe(false, 'Container should not be able to get in-active class as it is disabled');
        expect(input[0].focus).not.toHaveBeenCalled();

        // ng-disabled
        $scope.isDisabled = true;
        textBox = $compile('<uif-textfield ng-disabled="isDisabled"></uif-textfield>')($scope);
        $scope.$apply();

        textBox = jQuery(textBox[0]);
        textBox.appendTo(document.body);

        div = getMainDiv(textBox);
        input = textBox.find('input');
        spyOn(input[0], 'focus');

        expect(div.hasClass('is-disabled')).toBe(true, 'textfield should have is-disabled');

        input.click();
        expect(div.hasClass('is-active')).toBe(false, 'Container should not be able to get in-active class as it is disabled');
        expect(input[0].focus).not.toHaveBeenCalled();

        $scope.isDisabled = false;
        $scope.$apply();

        expect(div.hasClass('is-disabled')).toBe(false, 'textfield should not be disabled');

        input.focus();
        expect(div.hasClass('is-active')).toBe(true, 'Container should be able to get is-active class as it is not disabled');

        input.blur();
        expect(div.hasClass('is-active')).toBe(false, 'Container should not have class in-active when not focused');

    }));

    it('should be able to set placeholder', inject(($compile: Function, $rootScope: ng.IRootScopeService) => {
        let $scope: any = $rootScope.$new();
        $scope.value = '';
        let textBox: JQuery = $compile('<uif-textfield placeholder="Placeholder contents" ng-model="value"></uif-textfield>')($scope);
        textBox = jQuery(textBox[0]);
        $scope.$apply();

        let label: JQuery = textBox.find('div.ms-TextField--placeholder label.ms-Label');
        expect(label.html()).toBe('Placeholder contents');
        expect(label.hasClass('ng-hide')).toBe(false, 'Label should be visible before click');

        let input: JQuery = textBox.find('input');
        input.click();
        expect(label.hasClass('ng-hide')).toBe(true, 'Label should be hidden after click');

        input.blur();
        expect(label.hasClass('ng-hide')).toBe(false, 'Label should be visible after blur');

        $scope.value = 'Test';
        $scope.$apply();

        expect(label.hasClass('ng-hide')).toBe(true, 'Label should be hidden after setting ng-model');
    }));

});
