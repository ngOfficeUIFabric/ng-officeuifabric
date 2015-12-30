describe('iconDirective', () => {
    beforeEach(() => {
        angular.mock.module('fabric.ui.components.icon');
    });

    it('should be able to set type', inject(($compile: Function, $rootScope: ng.IRootScopeService) => {
        let $scope: any = $rootScope.$new();
        $scope.textBoxValue = 'Test 1';
        let textBox: JQuery = $compile('<input uif-textfield ng-model="textBoxValue"></input>')($scope);
        $scope.$apply();
        expect(textBox.val()).toBe('Test 1');

        $scope.textBoxValue = 'Test 2';
        $scope.$apply();
        expect(textBox.val()).toBe('Test 2');
    }));

    it('should be able to set required', inject(($compile: Function, $rootScope: ng.IRootScopeService) => {
        let $scope: any = $rootScope.$new();
        let textBox: JQuery = $compile('<div><input uif-textfield required></input></div>')($scope);
        $scope.$apply();

        expect(textBox.find('span').html()).toBe('*', 'HTML should end with *');
    }));
});
