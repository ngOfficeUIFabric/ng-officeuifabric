describe('choicefieldDirective', () => {
    beforeEach(() => {
        angular.mock.module('fabric.ui.components.choicefield');
    });

    afterEach(() => {
        // myfunc.reset();
    });

    it('should have unique ids', inject(($compile: Function, $rootScope: ng.IRootScopeService) => {
        let $scope: any = $rootScope.$new();
        $scope.value = 'test';
        let choiceField1: JQuery = $compile(
            '<uif-choicefield-group ng-model="value">' +
            '<uif-choicefield value="Test1"><a href="#">Test 1</a></uif-choicefield>' +
            '<uif-choicefield value="Test2"><a href="#">Test 2</a></uif-choicefield>' +
            '<uif-choicefield value="Test3"><a href="#">Test 3</a></uif-choicefield>' +
            '</uif-choicefield-group>'
        )($scope);
        $scope.$digest();

        let input1: JQuery = $(choiceField1[0]).find('.ms-ChoiceField-input');
        let id1: string = input1[0].id;

        let choiceField2: JQuery = $compile(
            '<uif-choicefield-group ng-model="value">' +
            '<uif-choicefield value="Test1"><a href="#">Test 1</a></uif-choicefield>' +
            '<uif-choicefield value="Test2"><a href="#">Test 2</a></uif-choicefield>' +
            '<uif-choicefield value="Test3"><a href="#">Test 3</a></uif-choicefield>' +
            '</uif-choicefield-group>'
        )($scope);
        $scope.$digest();

        let input2: JQuery = $(choiceField2[0]).find('.ms-ChoiceField-input');
        let id2: string = input2[0].id;

        expect(id1 === id2).toBe(false);

    }));
    it('should be able to set value', inject(($compile: Function, $rootScope: ng.IRootScopeService) => {
        console.log('TEST');
        let $scope: any = $rootScope.$new();
        $scope.value = 'Test1';
        let choiceField: JQuery = $compile(
            '<uif-choicefield-group ng-model="value">' +
            '<uif-choicefield value="Test1"><a href="#">Test 1</a></uif-choicefield>' +
            '<uif-choicefield value="Test2"><a href="#">Test 2</a></uif-choicefield>' +
            '<uif-choicefield value="Test3"><a href="#">Test 3</a></uif-choicefield>' +
            '</uif-choicefield-group>'
        )($scope);
        $scope.$digest();
        let inputs: JQuery = $(choiceField[0]).find('.ms-ChoiceField-input');
        let input: JQuery = $(inputs[0]);
        expect(input.prop('checked')).toBe(true);

        $scope.value = 'Test2';
        $scope.$digest();

        expect(input.prop('checked')).toBe(false);
    }));

    it('should be able to set the group label & required', inject(($compile: Function, $rootScope: ng.IRootScopeService) => {
        let $scope: any = $rootScope.$new();

        let choiceField: JQuery = $compile(
            '<uif-choicefield-group ng-model="value" label="Select something" required>' +
            '<uif-choicefield value="Test1"><a href="#">Test 1</a></uif-choicefield>' +
            '<uif-choicefield value="Test2"><a href="#">Test 2</a></uif-choicefield>' +
            '<uif-choicefield value="Test3"><a href="#">Test 3</a></uif-choicefield>' +
            '</uif-choicefield-group>'
        )($scope);
        $scope.$digest();

        let group: JQuery = $(choiceField[0]).find('.ms-ChoiceFieldGroup');
        let groupLabel: JQuery = group.find('.ms-ChoiceFieldGroup-title label');

        expect(groupLabel.hasClass('is-required')).toBe(true, 'should have is-required');
        expect(groupLabel.html()).toBe('Select something');


        choiceField = $compile(
            '<uif-choicefield-group ng-model="value" label="Now dont do anything">' +
            '<uif-choicefield value="Test1"><a href="#">Test 1</a></uif-choicefield>' +
            '<uif-choicefield value="Test2"><a href="#">Test 2</a></uif-choicefield>' +
            '<uif-choicefield value="Test3"><a href="#">Test 3</a></uif-choicefield>' +
            '</uif-choicefield-group>'
        )($scope);
        $scope.$digest();
        group = $(choiceField[0]).find('.ms-ChoiceFieldGroup');
        groupLabel = group.find('.ms-ChoiceFieldGroup-title label');

        expect(groupLabel.html()).toBe('Now dont do anything');
        expect(groupLabel.hasClass('is-required')).toBe(false);
    }));

    it('should be able to set HTML as the label for a choice', inject(($compile: Function, $rootScope: ng.IRootScopeService) => {
        let $scope: any = $rootScope.$new();
        let choiceField: JQuery = $compile(
            '<uif-choicefield-group ng-model="value">' +
            '<uif-choicefield value="Test1"><a href="#">Test 1</a></uif-choicefield>' +
            '<uif-choicefield value="Test2"><a href="#">Test 2</a></uif-choicefield>' +
            '<uif-choicefield value="Test3"><a href="#">Test 3</a></uif-choicefield>' +
            '</uif-choicefield-group>'
        )($scope);
        $scope.$digest();
        let labels: JQuery = $(choiceField[0]).find('.ms-Label a');
        let label: JQuery = $(labels[2]);
        expect(label.html()).toBe('Test 3');
    }));
});
