describe('toggleDirective: <uif-toggle />', () => {
    beforeEach(() => {
        angular.mock.module('officeuifabric.components.toggle');
    });

    it('should have unique ids', inject(($compile: Function, $rootScope: ng.IRootScopeService) => {
        let $scope: any = $rootScope.$new();
        let toggle1: JQuery = $compile('<uif-toggle uif-label-off="No" uif-label-on="Yes" ng-model="toggled">Test</toggle>')($scope);
        toggle1 = jQuery(toggle1[0]);
        $scope.$apply();

        let checkBox1: JQuery = toggle1.find('input.ms-Toggle-input');
        let toggle2: JQuery = $compile('<uif-toggle uif-label-off="No" uif-label-on="Yes" ng-model="toggled">Test</toggle>')($scope);
        toggle2 = jQuery(toggle2[0]);
        $scope.$apply();

        let checkBox2: JQuery = toggle2.find('input.ms-Toggle-input');
        expect(checkBox1[0].id === checkBox2[0].id).toBe(false);
    }));
    it('should be able to set text location', inject(($compile: Function, $rootScope: ng.IRootScopeService) => {
        let $scope: any = $rootScope.$new();
        $scope.toggled = true;

        let toggle: JQuery = $compile('<uif-toggle uif-label-off="No" uif-label-on="Yes" ng-model="toggled" ' +
                                                  'uif-text-location="right">Toggle this, or not</toggle>')($scope);
        toggle = jQuery(toggle[0]);
        $scope.$digest();

        let mainToggle: JQuery = toggle.find('.ms-Toggle');
        expect(mainToggle.hasClass('ms-Toggle--textRight')).toBe(true);
    }));
    it('should be able to set labels', inject(($compile: Function, $rootScope: ng.IRootScopeService) => {
        let $scope: any = $rootScope.$new();
        $scope.toggled = true;

        let toggle: JQuery = $compile('<uif-toggle uif-label-off="No" uif-label-on="Yes" ' +
                                                  'ng-model="toggled">Toggle this, or not</toggle>')($scope);
        toggle = jQuery(toggle[0]);
        $scope.$apply();

        let labelOff: JQuery = toggle.find('.ms-Label--off');
        let labelOn: JQuery = toggle.find('.ms-Label--on');
        let descLabel: JQuery = toggle.find('.ms-Toggle-description span');

        expect(labelOff.html()).toBe('No');
        expect(labelOn.html()).toBe('Yes');
        expect(descLabel.html()).toBe('Toggle this, or not');
    }));

    it('should be able to toggle', inject(($compile: Function, $rootScope: ng.IRootScopeService) => {
        let $scope: any = $rootScope.$new();
        $scope.toggled = true;

        let toggle: JQuery = $compile('<uif-toggle uif-label-off="No" uif-label-on="Yes" ng-model="toggled"></toggle>')($scope);
        toggle = jQuery(toggle[0]);
        $scope.$apply();

        let checkBox: JQuery = toggle.find('input.ms-Toggle-input');

        expect(checkBox.is(':checked')).toBe(true);

        $scope.toggled = false;
        $scope.$apply();

        expect(checkBox.is(':checked')).toBe(false);

        checkBox.click();
        expect(checkBox.is(':checked')).toBe(true);
        expect($scope.toggled).toBe(true);
    }));

    it('should be able to be disabled', inject(($compile: Function, $rootScope: ng.IRootScopeService) => {
        let $scope: any = $rootScope.$new();
        $scope.disabled = true;

        let toggle: JQuery = $compile('<uif-toggle uif-label-off="No" uif-label-on="Yes" ng-model="toggled"'
                                            + 'ng-disabled="disabled"></toggle>')($scope);
        toggle = jQuery(toggle[0]);
        $scope.$apply();

        let mainToggle: JQuery = toggle.find('.ms-Toggle');
        expect(mainToggle.hasClass('is-disabled')).toBe(true, 'Element is disabled');

        $scope.disabled = false;
        $scope.$digest();

        mainToggle = toggle.find('.ms-Toggle');
        expect(mainToggle.hasClass('is-disabled')).toBe(false, 'Element is not disabled');
    }));
});
